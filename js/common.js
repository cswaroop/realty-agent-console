var themeInteraction={tempScopeVariable:"",isFromClick:false,init:function(){var me=this;$("#toggle-min").on("click",function(){me.desktopMenuToggle()});$("#mobile-nav-toggle").on("click",function(){me.mobileMenuToggle()});$("#nav").slimScroll({height:"100%"});$("#nav>li>a").on("click",function(){me.isFromClick=true;me.handleSubMenuClick(this)});$("#nav>li.sub-section>ul a").on("click",function(){me.isFromClick=true;var el=$(this);el.closest("ul").children().removeClass("active");el.parent().addClass("active")});$("#content").click(function(){me.hideMobileMenu()})},handleSubMenuClick:function(e){if(!$("body").hasClass("nav-min")){var el=$("#nav>li>a");var subEl=$("#nav>li.sub-section");var p=$(e).closest(".sub-section");var isChildSubItem=p.length>0?true:false;if(!isChildSubItem){p=$(e).parent()}el.parent().not(p).removeClass("active");var activeEl=p.toggleClass("active");subEl.not(p).children("ul").slideUp();if(activeEl.hasClass("sub-section")){activeEl.children("ul").slideToggle().children().removeClass("active")}}},fetchPage:function(url,data,type){var _this=this;if(url){var loading=$(".view-container .loading");var target=$("#content .partial");data+="&r=1";loading.show().css({"min-height":target.height()+"px"});var request=$.ajax({url:url,type:type||"GET",data:data||{},dataType:""});request.done(function(response,status,jqXHR){if(response&&response.indexOf("|")){var status=response.split("|")[0];if(status=="-1"){location.href="/agent/logout";return}}if(jqXHR.getResponseHeader("content-type").indexOf("text/html")>=0&&response.indexOf("<html")==-1){target.html(response);var page=window.location.href.split("#")[1];if(page&&page.indexOf("?")){page=page.split("?")[0];ga("send","pageview","/agent"+page)}}else{location.href="/agent/logout"}});request.fail(function(jqXHR,textStatus){console.log("Request failed: "+textStatus);target.html('<div class="page-err ng-scope"><div class="text-center"><div class="err-status"><h1>'+jqXHR.status+'</h1></div><div class="err-message"><h2>'+jqXHR.statusText+'</h2></div><div class="err-body"></div></div></div>')});request.complete(function(){loading.hide()})}},desktopMenuToggle:function(){var agentConsoleApp=$("#agent-console-app");var $window=$(window);if(agentConsoleApp.hasClass("nav-min")){agentConsoleApp.removeClass("nav-min")}else{agentConsoleApp.addClass("nav-min");$("#nav").find("ul").slideUp().parent("li").removeClass("active")}var updateClass=function(){var width;width=$window.width();768>width?agentConsoleApp.removeClass("nav-min"):""};$window.resize(function(){updateClass()})},mobileMenuToggle:function(){var agentConsoleApp=$("#agent-console-app");agentConsoleApp.hasClass("on-canvas")?(agentConsoleApp.removeClass("on-canvas")):(agentConsoleApp.addClass("on-canvas"))},hideMobileMenu:function(){$("#agent-console-app").removeClass("on-canvas")},postData:function(url,data,cb,eb){if(!url){return}var request=$.ajax({url:url,type:"POST",data:data||{},dataType:""});request.done(function(response,status,jqXHR){if(response&&response.indexOf("|")){var status=response.split("|")[0];if(status=="-1"){location.href="/agent/logout";return}}if(cb){cb(response)}});request.fail(function(jqXHR,textStatus){if(eb){eb(jqXHR)}alert("Some error occured at the server. We are looking into it.")})}};function validateHtmlElements(el){var error=false;var errMsg;el.find("input[data-pattern], select[data-pattern], textarea[data-pattern]").each(function(i){var _this=$(this);var dataPttrn=_this.attr("data-pattern");if(dataPttrn){if(_this.attr("allow-empty")=="true"&&this.value==""){return}var regEx=new RegExp(dataPttrn);_this.removeClass("ptrn-error");if(!regEx.test(this.value)){var l=20;$(this).addClass("ptrn-error");for(var i=0;i<10;i++){_this.animate({"margin-left":"+="+(l=-l)+"px"},50)}error=true;return -1}}});if(error){console.log(errMsg);return -1}}function showNotification(msg,type){if(msg){$(".cf-custom-alert").notify({message:{text:msg},type:(type||"success"),fadeOut:{enabled:true,delay:15000}}).show()}}(function(){var routeActionConfig={dashboard:{url:"/agent/dashboard/index"},mylistings:{url:"/agent/property-listing/my-listings",data:"lst[]=act&asi=sale&plps=10"},"mylistings-detail":{url:"/agent/property-listing/show-listing-details"},"get-leads":{url:"/agent/property-listing/show-property-listings",data:"listings_type=requirement"},"manage-leads":{url:"/agent/agent-report/index?manage_leads=1"},"credits-summary":{url:"/agent/account-credit/get-credit-summary"},"lead-report":{url:"/agent/agent-report/index"},"refund-status":{url:"/agent/account-credit/get-refund-status"},"my-profile":{url:"/agent/profile/index"},"my-team":{url:"/agent/sub-agent/manage"},"my-subscriptions":{url:"/agent/account-credit/get-agent-subscriptions"},faqs:{url:"/agent/help/faqs"}};routeActionConfig.defaultPage="#/dashboard";function handleRouteChange(hashVal,d){var action=hashVal.indexOf("/")==0?hashVal.substring(1):hashVal;var config=routeActionConfig[action];if(!config){window.location.href=routeActionConfig.defaultPage;return}var url=config.url;if(!url){return}var data=d||config.data||"";var type=config.type||"";if(!themeInteraction.isFromClick){themeInteraction.handleSubMenuClick($('#nav a[href="#'+hashVal+'"]'))}themeInteraction.isFromClick=false;themeInteraction.fetchPage(url,data,type)}function routeChanged(){var hashVal=window.location.href.split("#")[1];if(hashVal){var d;var h=hashVal;if(hashVal.indexOf("?")>-1){h=hashVal.split("?")[0];d=hashVal.split("?")[1]}handleRouteChange(h,d)}else{window.location.href=routeActionConfig.defaultPage}}$("document").ready(function(){themeInteraction.init();$(window).on("hashchange",function(){routeChanged()});window.onload=function(){routeChanged()};String.prototype.interpolate=function(o){return this.replace(/{([^{}]*)}/g,function(a,b){var r=o[b];return typeof r==="string"||typeof r==="number"?r:a})}});if($.ui){var bootstrapButton=$.fn.button.noConflict();$.fn.bootstrapBtn=bootstrapButton}})();