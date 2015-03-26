/**
 * @file jquery.cfitrack.js
 */
;
(function ($) {

  /** CF- Inventory Tracker: Object Instance */
  $.cfitrack = function(el, options) {
    var entity = $(el);
    this.entity = entity;
    var hasImpressed=false;

    //This is the variable to check in the scroll event. 
    //Read more in cfitrackPrivateStatic.handleImpressionEvent
    entity.pickedForImpressionCheck = false; 

    entity.presentIn = [];
    
    // making variables public
    entity.vars = $.extend({}, $.cfitrack.defaults, options);
    var valuesToTrack = {};

    var methods = {

      /** This function is called when the plugin is initialized for a particular element. */
      init : function() {
        for(var bindEventIndex = 0; bindEventIndex < entity.vars.bind.length; bindEventIndex++){
          switch (entity.vars.bind[bindEventIndex]) {
            case "click":
                methods.addClickEventListener();
                break;
            case "impression":
                // If the element has already impressed (already in viewport) then
                if(! entity.checkPossibleImpressionAndImpress()) {
                  // fire the impression 
                  methods.addImpressionEventListener();
                }
                break;
          }
        }
        //hasImpressed = false;
      },

      /** This function adds the element into the bucket. The bucket is decided
       * based on its position. It is equivalent to binding the impression event.
       */
      addImpressionEventListener : function() {
        var bucketObj=null,index=-1;
        // if the element is not static and moves regulary, ie, isPositionFixed is false
        if(entity.vars.isPositionFixed == false){
          cfitrackPrivateStatic.dynamicElementsBucket.push(entity);
          bucketObj = cfitrackPrivateStatic.dynamicElementsBucket;
          index = bucketObj.indexOf(entity);
          entity.presentIn.push({"bucket":bucketObj,"index":index});
        }
        else{
          // Finding bucket depending on its position
          var topOffset = entity.offset().top, 
              bottomOffset = topOffset + entity.height();
          if(entity.vars.parent !== null) {
            topOffset = entity.vars.parent.offset().top;
            bottomOffset = topOffset + entity.vars.parent.height();
          }
          var bucketStart = cfitrackPrivateStatic.getBucket(topOffset),
              bucketEnd = cfitrackPrivateStatic.getBucket(bottomOffset);
          for(var bucket = bucketStart; bucket <= bucketEnd; bucket++ ){
            if(cfitrackPrivateStatic.viewportBucket[bucket]){
              cfitrackPrivateStatic.viewportBucket[bucket].push(entity);
            }
            else{
              cfitrackPrivateStatic.viewportBucket[bucket] = [entity];
            }
            bucketObj = cfitrackPrivateStatic.viewportBucket[bucket];
            index = bucketObj.indexOf(entity);
            entity.presentIn.push({"bucket":bucketObj,"index":index});
          }
          
        }
      },

      /** This function binds click events to the element */
      addClickEventListener : function() {
        entity.on('click.cfitrack', methods.handleClickEvent);
      },


      /** This function returns true if the element has come in the view port considering
       * the threshold. The element is in viewport when element bottom is below window top
       * and element top is above window bottom.
       */
      isInViewPort : function() {
        if(entity.vars.parent == null)
          return methods.isElementInViewPort(entity);
        else
          return /*!entity.is(':hidden') && !entity.vars.parent.is(':hidden') &&*/ methods.isElementInViewPort(entity)
                 && methods.isElementVisibleInParent(entity, entity.vars.parent);
      },

      /** This function returns true if an element is in viewport */
      isElementInViewPort : function(elem) {
        //if(elem.is(':hidden')) return false;

        var windowTop = Math.floor($(window).scrollTop()),
            windowBottom = windowTop + Math.floor($(window).height()),
            elementTop = Math.floor(elem.offset().top),
            elementHeight = Math.floor(elem.height()),
            elementBottom = elementTop + elementHeight;

        return elementBottom >= windowTop + entity.vars.viewportThreshold + Math.floor(elementHeight * entity.vars.thersholdPercent)
               && elementTop <= windowBottom - entity.vars.viewportThreshold - Math.floor(elementHeight * entity.vars.thersholdPercent);
      },

      /** This function returns true if elem is visible in its parent div */
      isElementVisibleInParent : function(elem, parent) {
        //if(elem.is(':hidden')) return false;

        var parentTop = Math.floor(parent.offset().top),
            parentBottom = parentTop + Math.floor(parent.height()),
            parentLeft = Math.floor(parent.offset().left),
            parentRight = parentLeft + Math.floor(parent.width()),
            elementTop = Math.floor(elem.offset().top),
            elementBottom = elementTop + Math.floor(elem.height()),
            elementLeft = Math.floor(elem.offset().left),
            elementRight = elementLeft + Math.floor(elem.width());

        return elementBottom <= parentBottom + entity.vars.parentViewportMargin && elementTop >= parentTop - entity.vars.parentViewportMargin &&
               elementRight <= parentRight + entity.vars.parentViewportMargin && elementLeft >= parentLeft - entity.vars.parentViewportMargin;

      },

      /** This function handles an impression event. */
      handleImpressionEvent : function() {
        if(hasImpressed==false){
          valuesToTrack['event'] = 'impression';
          methods.collectTrackDetails();
          methods.trackEvent(valuesToTrack);
          hasImpressed=true;
        }
      },

      /** This method sends an AJAX request to the backend to track an event. */
      trackEvent : function(trackDetails) {
        $.ajax({
          url : entity.vars.trackurl,
          data : trackDetails,
          crossDomain : true,
          dataType: 'jsonp',
          success : function(data) {
            // do nothing
          },
          error : function(data) {
            // do nothing
          }
        });
      },

      /** This function collects the tracking details for the element and populates
       * the global variable valueToTrack. 
       */
      collectTrackDetails : function() {
        valuesToTrack['entity_type'] = entity.attr(entity.vars.namespace + 'entity_type');
        valuesToTrack['entity_subtype'] = entity.attr(entity.vars.namespace + 'entity_subtype');
        valuesToTrack['entity_id'] = entity.attr(entity.vars.namespace + 'entity_id');
        valuesToTrack['position'] = entity.attr(entity.vars.namespace + 'position');
        valuesToTrack['req_id'] = window.cfit;
        if(entity.attr(entity.vars.namespace + 'misc_data') !== undefined)
          valuesToTrack = $.extend({}, valuesToTrack, $.parseJSON(decodeURIComponent(entity.attr(entity.vars.namespace + 'misc_data'))));
        if(entity.vars.commonDataElement !== null && entity.vars.commonDataElement.attr(entity.vars.namespace + 'common_data') !== undefined) {
          valuesToTrack = $.extend({}, valuesToTrack, $.parseJSON(decodeURIComponent(entity.vars.commonDataElement.attr(entity.vars.namespace + 'common_data'))));
        }
      },

      /** This function handles a click event. */
      handleClickEvent : function(event) {
        //call before Click callback
        var retBefore = entity.vars.beforeClick(event);
        if(retBefore == false) {
          return;
        }
        //Check for the custom cfi-click-event attribute of the event.target
        var target = entity;
        if(typeof event !== "undefined"){
          target = event.target;
        }
        var clickEvent = $(target).attr(entity.vars.namespace + "click_event") || "click";
        valuesToTrack["event"] = clickEvent;
        methods.collectTrackDetails();
        methods.trackEvent(valuesToTrack);
      },

      /** This function updates the buckets depending on the current position of entity */
      updateBucket : function() {
        var currentBuckets = entity.presentIn;
        entity.presentIn = [];
        $.each(currentBuckets, function(key, bucketInfo) {
          delete bucketInfo.bucket[bucketInfo.index];
        });

        var topOffset = entity.offset().top,
            bottomOffset = topOffset + entity.height();

        if(entity.vars.parent !== null) {
          topOffset = entity.vars.parent.offset().top;
          bottomOffset = topOffset + entity.vars.parent.height();
        }

        var bucketStart = cfitrackPrivateStatic.getBucket(topOffset),
            bucketEnd = cfitrackPrivateStatic.getBucket(bottomOffset);
        for(var bucket = bucketStart; bucket <= bucketEnd; bucket++ ) {
          if(cfitrackPrivateStatic.viewportBucket[bucket]) {
            cfitrackPrivateStatic.viewportBucket[bucket].push(entity);
          }
          else {
            cfitrackPrivateStatic.viewportBucket[bucket] = [entity];
          }
          bucketObj = cfitrackPrivateStatic.viewportBucket[bucket];
          index = bucketObj.indexOf(entity);
          entity.presentIn.push({'bucket' : bucketObj, 'index' : index});
        }
      }
    };

    entity.impressed = function() {
      methods.handleImpressionEvent();
    };

    entity.isInViewPort = function() {
      return methods.isInViewPort();
    };

    entity.checkPossibleImpressionAndImpress = function() {
      if(entity.vars.visibilityCriteria(entity) && methods.isInViewPort()) { 
        //remove from the bucket if present
        entity.removeFromBucket();
        //fire impression event
        methods.handleImpressionEvent();
        return true;
      }
      return false;
    };

    entity.clicked = function(event) {
      methods.handleClickEvent(event);
    };

    entity.removeFromBucket = function(){
      if(entity.presentIn.length==0){
        return false;
      }
      //remove the entity from the buckets if present
      $.each(entity.presentIn,function(index,bucketInfo){
        delete bucketInfo['bucket'][bucketInfo['index']];
      });
      entity.presentIn = [];
      return true;
    };

    entity.destroy = function() {
      //remove the entity from the bucket if present
      entity.removeFromBucket();
      //unbind click event
      entity.off('click.cfitrack', methods.handleClickEvent);
      //remove the cfitrack data
      $.removeData(el, "cfitrack");
    };

    entity.updateBucket = function() {
      methods.updateBucket();
    };

    methods.init();

    $.data(el, "cfitrack", entity);
  }

  cfitrackPrivateStatic = {
    viewportBucket : {},
    dynamicElementsBucket : [],
    viewportBucketOffset : $(window).height(),
    handleImpressionEvent : function(event){
      var elementsToCheck = [];
      function pushToImpressionHandleSet(currentBucket){
        $.each(currentBucket,function(index,entity){
          if(entity && !entity.pickedForImpressionCheck){
            entity.pickedForImpressionCheck=true;
            elementsToCheck.push(entity);
          }
        });
      }
      //Process the dynamciElementsBucket
      pushToImpressionHandleSet(cfitrackPrivateStatic.dynamicElementsBucket);

      var currentViewPortTop = $(window).scrollTop(),
          currentViewPortBottom = currentViewPortTop + $(window).height();
      var bucketStartRange = cfitrackPrivateStatic.getBucket(currentViewPortTop) - 1,
          bucketEndRange = cfitrackPrivateStatic.getBucket(currentViewPortBottom);
      for(var bucket = bucketStartRange; bucket <= bucketEndRange; bucket++) {
        var curBucketItems = cfitrackPrivateStatic.viewportBucket[bucket];
        if(!curBucketItems) {
          continue;
        }
        pushToImpressionHandleSet(curBucketItems);
      }
      // ask each of the entity to handle impression
      $.each(elementsToCheck, function(index,entity){
        entity.checkPossibleImpressionAndImpress();
        entity.pickedForImpressionCheck = false;
      });
      elementsToCheck=[];
      //TODO : clean up the buckets so that the empty slots are removed
    },
    getBucket : function(scrollTop) {
      return parseInt(scrollTop/cfitrackPrivateStatic.viewportBucketOffset);
    }

  }

  $(window).on("scroll.cfitrack resize.cfitrack lookup.cfitrack", cfitrackPrivateStatic.handleImpressionEvent);

  //CF Inventory Tracking: Default Settings
  $.cfitrack.defaults = {
    namespace: "cfi_",                                    //{NEW} String: 
    thersholdPercent : 0.5,
    viewportThreshold: 0,
    parentViewportMargin: 0, // In pixels
    bind : ["click", "impression"],
    trackurl : getCFITrackURL() , // Tracking server url
    parent : null,
    isPositionFixed : true,
    // Callback API
    beforeClick: function(event){return {"status":true,"event":"click"}},             //Callback: function() - Called just before the click tracking is fired. 
    visibilityCriteria : function(entity) { return true; }, // additional visibility criteria if any
    commonDataElement : null
  }

  //cfitrack: Plugin Function
  $.fn.cfitrack = function(options, event) {
    if (typeof options == "undefined") options = {};

    if (typeof options === "object") {
      return this.each(function() {
        // Check if it is already initialised
        var $entity = $(this).data('cfitrack');
        if(! $entity){
          new $.cfitrack(this, options);
        }
        else{
          console.warn("You are trying to cfitrack an already tracked element ", this);
        }
      });
    } else {
         var ret_value = []
        // Helper strings to quickly perform functions on the cfitrack
        this.each(function() {
          var $entity = $(this).data('cfitrack');
          if(typeof $entity === 'undefined'){
            return;
          }
          switch (options) {
            case "impressed" : $entity.impressed(); break;
            case "checkAndImpress" : ret_value.push($entity.checkPossibleImpressionAndImpress()); break;
            case "isInViewPort" : ret_value.push($entity.isInViewPort()); break;
            case "clicked" : $entity.clicked(event); break;
            case "destroy" : $entity.destroy();break;
            case "updateBucket" : $entity.updateBucket(); break;
          }
        });
        switch(ret_value.length){
          case 0:
              break;
          case 1:
              return ret_value[0];
              break;
          default:
              return ret_value;
        }
      }
    }
})(jQuery);
