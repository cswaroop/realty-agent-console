DHTML_modalMessage=function(){var url;var htmlOfModalMessage;var divs_transparentDiv;var divs_content;var iframe;var layoutCss;var width;var height;var top;var left;var bottom;var right;var existingBodyOverFlowStyle;var dynContentObj;var cssClassOfMessageBox;var shadowDivVisible;var shadowOffset;var MSIE;var transparentDivVisible;var resizeTwice;var containerId;this.url="";this.htmlOfModalMessage="";this.layoutCss="modal-message.css";this.height=200;this.width=400;this.cssClassOfMessageBox=false;this.shadowDivVisible=true;this.shadowOffset=5;this.MSIE=false;if(navigator.userAgent.indexOf("MSIE")>=0){this.MSIE=true}this.transparentDivVisible=true;this.top="";this.left="";this.bottom="";this.right="";this.resizeTwice=true;this.containerId="DHTMLSuite_modalBox_contentDiv"};DHTML_modalMessage.prototype={setSource:function(urlOfSource){this.url=urlOfSource},setHtmlContent:function(newHtmlContent){this.htmlOfModalMessage=newHtmlContent},setSize:function(width,height){if(width){this.width=width}if(height){this.height=height}},setCssClassMessageBox:function(newCssClass){this.cssClassOfMessageBox=newCssClass;if(this.divs_content){if(this.cssClassOfMessageBox){this.divs_content.className=this.cssClassOfMessageBox}else{this.divs_content.className="modalDialog_contentDiv"}}},setShadowOffset:function(newShadowOffset){this.shadowOffset=newShadowOffset},display:function(){if(!this.divs_transparentDiv){this.__createDivs()}if(this.transparentDivVisible==true){this.divs_transparentDiv.style.display="block"}else{this.divs_transparentDiv.style.display="none"}this.divs_content.style.display="block";this.divs_shadow.style.display="block";if(this.MSIE){this.iframe.style.display="block"}this.__resizeDivs();if(this.resizeTwice==true){window.refToThisModalBoxObj=this;setTimeout("window.refToThisModalBoxObj.__resizeDivs()",150)}this.__insertContent();this.minimized=false},setShadowDivVisible:function(visible){this.shadowDivVisible=visible},setTransparentDivVisible:function(visible){this.transparentDivVisible=visible},setResizeTwice:function(resize){this.resizeTwice=resize},setContainerId:function(id){this.containerId=id},close:function(){this.divs_transparentDiv.style.display="none";this.divs_content.style.display="none";this.divs_shadow.style.display="none";if(this.MSIE){this.iframe.style.display="none"}},handleMinimizeMaximize:function(minFunctionToExecute,maxFunctionToExecute){if(this.minimized){this.maximize(maxFunctionToExecute)}else{this.minimize(minFunctionToExecute)}},minimize:function(functionToExecute){if($(this.containerId)){if(messageObj.iframe){messageObj.iframe.style.display="none"}this.top=$(this.containerId).style.top;this.left=$(this.containerId).style.left;this.bottom=$(this.containerId).style.bottom;this.right=$(this.containerId).style.right;this.position=$(this.containerId).style.position;$(this.containerId).style.position="fixed";$(this.containerId).style.top="";$(this.containerId).style.left="";$(this.containerId).style.right="0px";$(this.containerId).style.bottom="0px";$(this.containerId).style.height="20px";this.divs_transparentDiv.style.display="none";this.minimized=true;if(functionToExecute){eval(functionToExecute+"();")}}},maximize:function(functionToExecute){if($(this.containerId)){$(this.containerId).style.right="";$(this.containerId).style.bottom="";$(this.containerId).style.position=this.position;$(this.containerId).style.top=this.top;$(this.containerId).style.left=this.left;$(this.containerId).style.bottom=this.bottom;$(this.containerId).style.right=this.right;$(this.containerId).style.height=this.height+"px";if(this.transparentDivVisible){this.divs_transparentDiv.style.display="block"}this.minimized=false;if(functionToExecute){eval(functionToExecute+"();")}}},addEvent:function(whichObject,eventType,functionName,suffix){if(!suffix){suffix=""}if(whichObject.attachEvent){whichObject["e"+eventType+functionName+suffix]=functionName;whichObject[eventType+functionName+suffix]=function(){whichObject["e"+eventType+functionName+suffix](window.event)};whichObject.attachEvent("on"+eventType,whichObject[eventType+functionName+suffix])}else{whichObject.addEventListener(eventType,functionName,false)}},__createDivs:function(){this.divs_transparentDiv=document.createElement("DIV");this.divs_transparentDiv.className="modalDialog_transparentDivs";this.divs_transparentDiv.style.left="0px";this.divs_transparentDiv.style.top="0px";document.body.appendChild(this.divs_transparentDiv);this.divs_content=document.createElement("DIV");this.divs_content.className="modalDialog_contentDiv";this.divs_content.id=this.containerId;this.divs_content.style.zIndex=100000;if(this.MSIE){this.iframe=document.createElement("IFRAME");this.iframe.src="about:blank";this.iframe.frameborder="0";this.iframe.style.zIndex=90000;this.iframe.style.position="absolute";document.body.appendChild(this.iframe)}document.body.appendChild(this.divs_content);this.divs_shadow=document.createElement("DIV");this.divs_shadow.className="modalDialog_contentDiv_shadow";this.divs_shadow.style.zIndex=95000;document.body.appendChild(this.divs_shadow);window.refToModMessage=this;this.addEvent(window,"scroll",function(e){window.refToModMessage.__repositionTransparentDiv()});this.addEvent(window,"resize",function(e){window.refToModMessage.__repositionTransparentDiv()})},__getBrowserSize:function(){var bodyWidth=document.documentElement.clientWidth;var bodyHeight=document.documentElement.clientHeight;var bodyWidth,bodyHeight;if(self.innerHeight){bodyWidth=self.innerWidth;bodyHeight=self.innerHeight}else{if(document.documentElement&&document.documentElement.clientHeight){bodyWidth=document.documentElement.clientWidth;bodyHeight=document.documentElement.clientHeight}else{if(document.body){bodyWidth=document.body.clientWidth;bodyHeight=document.body.clientHeight}}}return[bodyWidth,bodyHeight]},__resizeDivs:function(){var topOffset=Math.max(document.body.scrollTop,document.documentElement.scrollTop);if(this.cssClassOfMessageBox){this.divs_content.className=this.cssClassOfMessageBox}else{this.divs_content.className="modalDialog_contentDiv"}if(!this.divs_transparentDiv){return}var st=Math.max(document.body.scrollTop,document.documentElement.scrollTop);var sl=Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);window.scrollTo(sl,st);setTimeout("window.scrollTo("+sl+","+st+");",10);this.__repositionTransparentDiv();var brSize=this.__getBrowserSize();var bodyWidth=brSize[0];var bodyHeight=brSize[1];this.divs_content.style.width=this.width+"px";this.divs_content.style.height=this.height+"px";var tmpWidth=this.divs_content.offsetWidth;var tmpHeight=this.divs_content.offsetHeight;this.divs_content.style.left=Math.ceil((bodyWidth-tmpWidth)/2)+"px";this.divs_content.style.top=(Math.ceil((bodyHeight-tmpHeight)/2)+topOffset)+"px";if(this.MSIE){this.iframe.style.left=this.divs_content.style.left;this.iframe.style.top=this.divs_content.style.top;this.iframe.style.width=this.divs_content.style.width;this.iframe.style.height=this.divs_content.style.height}this.divs_shadow.style.left=(this.divs_content.style.left.replace("px","")/1+this.shadowOffset)+"px";this.divs_shadow.style.top=(this.divs_content.style.top.replace("px","")/1+this.shadowOffset)+"px";this.divs_shadow.style.height=tmpHeight+"px";this.divs_shadow.style.width=tmpWidth+"px";if(!this.shadowDivVisible){this.divs_shadow.style.display="none"}},__repositionTransparentDiv:function(){this.divs_transparentDiv.style.top=Math.max(document.body.scrollTop,document.documentElement.scrollTop)+"px";this.divs_transparentDiv.style.left=Math.max(document.body.scrollLeft,document.documentElement.scrollLeft)+"px";var brSize=this.__getBrowserSize();var bodyWidth=brSize[0];var bodyHeight=brSize[1];this.divs_transparentDiv.style.width=bodyWidth+"px";this.divs_transparentDiv.style.height=bodyHeight+"px"},__insertContent:function(){if(this.url){ajax_loadContent(this.containerId,this.url)}else{this.divs_content.innerHTML=this.htmlOfModalMessage}}};