function stopRKey(evt){var evt=(evt)?evt:((event)?event:null);var node=(evt.target)?evt.target:((evt.srcElement)?evt.srcElement:null);if((evt.keyCode==13)&&(node.type=="text")){return false}}document.onkeypress=stopRKey;function AutoSuggest(elem,suggestions,multiSel){var me=this;this.elem=elem;this.suggestions=suggestions;this.eligible=new Array();this.inputText=null;this.highlighted=-1;this.div=document.getElementById("autosuggest");this.onMissMarkup="";this.hasPipe=false;this.hiddenValueElementId="";this.isMultipleOptionsEnabled=false;this.isTextNeedOnField=false;this.multipleOptionsDivId="";this.customizedExecOnSelect=false;this.callBack=false;this.functionToBeExecuted="";this.callBackFunctionNames=null;this.callBackBulkUploadPayment=false;this.callBackBulkUploadPaymentFunction="";this.nameWithSubItems=false;this.minCharsNeeded=3;this.delimeters=null;this.showSuggestionsDiv=true;elem.setAttribute("autocomplete","off");if(typeof window.allSelectedValues=="undefined"){window.allSelectedValues={}}if(!elem.id){var id="autosuggest"+idCounter;idCounter++;elem.id=id}Event.observe(this.div,"autosuggest:reset",this.reset.bindAsEventListener(this))}AutoSuggest.prototype.reset=function(){this.eligible=new Array();this.suggestions=new Array();this.div.innerHTML="<ul></ul>"};AutoSuggest.prototype.setKeyEventHandlers=function(){var me=this;var TAB=9;var ESC=27;var KEYUP=38;var KEYDN=40;var RET=13;var COMMA=188;var BKSPC=8;this.elem.onkeydown=function(ev){var key=me.getKeyCode(ev);switch(key){case TAB:me.useSuggestion();break;case RET:me.useSuggestion();break;case ESC:me.hideDiv();break;case KEYUP:if(me.highlighted>0){me.highlighted--}me.changeHighlight(key);break;case KEYDN:if(me.highlighted<(me.eligible.length-1)){me.highlighted++}me.changeHighlight(key);break;case BKSPC:if(8==key&&me.inputText.length<=1){me.hideDiv();$("suggstr").value="";$("autosuggest").fire("autosuggest:reset")}}};this.elem.onkeyup=function(ev){var key=me.getKeyCode(ev);switch(key){case TAB:case ESC:case KEYUP:case KEYDN:case RET:return;case COMMA:if(me.isMultipleOptionsEnabled==true){return}default:if(me.elem.value!=me.inputText&&me.elem.value.length>0){me.inputText=me.elem.value.replace(/\s+/g," ").replace(/^\s|\s$/g,"");if(me.isMultipleOptionsEnabled==true){lastIndexOfcomma=me.inputText.lastIndexOf(",");me.inputText=me.inputText.substr(lastIndexOfcomma+1)}if(me.inputText.length<this.minCharsNeeded){me.hideDiv();return}me.getEligible();me.createDiv();if(me.div.innerHTML){me.positionDiv();me.showDiv()}else{me.hideDiv()}}else{me.hideDiv()}}}};AutoSuggest.prototype.useSuggestion=function(){if(this.highlighted>-1){var suggestion=this.eligible[this.highlighted];suggestion=suggestion.replace(/~.*~/,"");if(this.hasPipe){var info=suggestion.split("|");if(this.isMultipleOptionsEnabled==true){var hiddenTextPresent=document.getElementById(this.hiddenValueElementId).value;var regExp=info[1];var matches=hiddenTextPresent.match(regExp);if(matches==null||this.isTextNeedOnField){this.addOptionToMultipleOptionsDiv(info[0],info[1],"optionDiv");window.allSelectedValues[info[0].trim()]=info[1];if(this.isMultipleOptionsEnabled&&this.isTextNeedOnField){var localities=this.elem.value.split(",");var localitiesCount=localities.length;localities[localitiesCount-1]=info[0]+",";this.elem.value=localities.join(",")}else{this.elem.value=""}document.getElementById(this.hiddenValueElementId).value=hiddenTextPresent+"|"+info[1]}else{alert("You have already added this Option")}if(typeof this.callBackFunctionNames==="function"){this.callBackFunctionNames()}}else{if(this.callBackFunctionNames){var callBackFunctionNames=this.callBackFunctionNames;var functions={};for(var i=0;i<callBackFunctionNames.length;i++){var functionName=callBackFunctionNames[i];functions[functionName]=new Array(info[0],info[1])}this.hideDiv();this.callUserFunctions(functions)}else{this.elem.value=info[0];document.getElementById(this.hiddenValueElementId).value=info[1]}}}else{if(this.isMultipleOptionsEnabled==true){var inputTextPresent=this.elem.value;this.elem.value=inputTextPresent+"|"+suggestion}else{this.elem.value=suggestion}}this.hideDiv();setTimeout("document.getElementById('"+this.elem.id+"').focus()",0)}};AutoSuggest.prototype.showDiv=function(){this.div.style.display="block"};AutoSuggest.prototype.hideDiv=function(){this.div.style.display="none";this.highlighted=-1};AutoSuggest.prototype.addOptionToMultipleOptionsDiv=function(content,id,optionClass){var me=this;multipleOptiondDiv=document.getElementById(this.multipleOptionsDivId);optionDiv=document.createElement("div");optionDiv.id=id;optionDiv.name=id;optionDiv.setAttribute("class",optionClass);optionDiv.setAttribute("className",optionClass);leftDiv=document.createElement("div");leftImage=document.createElement("img");leftDiv.setAttribute("class","optionImgLeft");leftDiv.setAttribute("className","optionImgLeft");leftImage.setAttribute("src","/images/img-left.gif");leftDiv.appendChild(leftImage);middleDiv=document.createElement("div");middleDiv.setAttribute("class","optionContent");middleDiv.setAttribute("className","optionContent");middleDiv.innerHTML=content;rightDiv=document.createElement("div");linkToDelete=document.createElement("a");linkToDelete.setAttribute("href","javascript:void(0)");rightImage=document.createElement("img");rightImage.setAttribute("src","/images/delete_icon.gif");linkToDelete.appendChild(rightImage);rightDiv.setAttribute("class","optionImgRight");rightDiv.setAttribute("className","optionImgRight");var parent=this.parentNode||this.parentElement;if(window.addEventListener){rightDiv.addEventListener("click",function(){document.getElementById(id).parentNode.removeChild(document.getElementById(id));me.removeNotificationId(id)},false)}else{if(window.attachEvent){rightDiv.attachEvent("onclick",function(){document.getElementById(id).style.display="none";me.removeNotificationId(id)})}else{rightDiv.onclick=function(){document.getElementById(id).style.display="none";me.removeNotificationId(id)}}}rightDiv.appendChild(linkToDelete);optionDiv.appendChild(middleDiv);optionDiv.appendChild(rightDiv);multipleOptiondDiv.appendChild(optionDiv)};AutoSuggest.prototype.arrangeMultipleOptionDiv=function(){multipleOptiondDiv=document.getElementById(this.multipleOptionsDivId);inputTextBox=this.elem;multipleOptiondDiv.removeChild(inputTextBox);inputTextBox.innerHTML="";multipleOptiondDiv.appendChild(inputTextBox)};AutoSuggest.prototype.removeNotificationId=function(id){if(id==undefined){return}var hiddenTextPresent=document.getElementById(this.hiddenValueElementId).value;hiddenTextPresent=hiddenTextPresent.replace(id,"");document.getElementById(this.hiddenValueElementId).value=hiddenTextPresent};AutoSuggest.prototype.changeHighlight=function(){var lis=this.div.getElementsByTagName("LI");for(i in lis){var li=lis[i];if(this.highlighted==i){li.className="selected"}else{li.className=""}}};AutoSuggest.prototype.positionDiv=function(){var do_not_position=document.getElementById("do_not_position_autosuggest");if(!do_not_position){var el=this.elem;var x=0;var y=el.offsetHeight;while(el.offsetParent&&el.tagName.toUpperCase()!="BODY"){x+=el.offsetLeft;y+=el.offsetTop;el=el.offsetParent}x+=el.offsetLeft;y+=el.offsetTop;this.div.style.left=x+"px";this.div.style.top=y+"px"}};AutoSuggest.prototype.createDiv=function(fixedPosition){var ul=document.createElement("ul");var me=this;if(this.eligible.length>0){for(var i=0;i<this.eligible.length;i++){var word=this.eligible[i];var li=this.getSuggestionMarkup(word);if(this.highlighted==i){li.className="selected"}ul.appendChild(li)}this.div.innerHTML="<ul></ul>";this.div.replaceChild(ul,this.div.childNodes[0])}else{this.div.style.width="300px";if(this.inputText.length>2&&this.onMissMarkup&&(""!=this.onMissMarkup)){this.div.innerHTML=this.onMissMarkup}else{this.showSuggestionsDiv=false;this.div.style.display="none"}}ul.onmouseover=function(ev){var target=me.getEventSource(ev);while(target.parentNode&&target.tagName.toUpperCase()!="LI"){target=target.parentNode}var lis=me.div.getElementsByTagName("LI");for(i in lis){var li=lis[i];if(li==target){me.highlighted=i;break}}me.changeHighlight()};ul.onclick=function(ev){me.useSuggestion();me.hideDiv();me.cancelEvent(ev);if(me.callBackBulkUploadPayment){window[me.callBackBulkUploadPaymentFunction]()}return false};this.div.className="suggestion_list";if(typeof fixedPosition!="undefined"&&fixedPosition){this.div.style.position="fixed"}else{this.div.style.position="absolute"}};AutoSuggest.prototype.getEligible=function(){this.eligible=new Array();if(this.suggestions.length>0){var input=this.inputText.toLowerCase();var delimeters=this.delimeters;if(delimeters){var tempInput=null;for(var j=0;j<delimeters.size();j++){tempInput=input.substr(input.lastIndexOf(delimeters[j])+1);if(tempInput.length<input.length){input=tempInput;break}}}var absolute_input=input.replace(/[^a-z0-9]/ig,"");for(var i=0;i<this.suggestions.length;i++){if(!this.suggestions[i]){continue}var suggestion=this.getSuggestionWord(this.suggestions[i]);var temp=suggestion.toLowerCase();var absolute_suggestion=temp.replace(/[^a-z0-9]/ig,"");if(absolute_suggestion.indexOf(absolute_input)!=-1){this.eligible[this.eligible.length]=this.suggestions[i]}}}};AutoSuggest.prototype.getKeyCode=function(ev){if(ev){return ev.keyCode}if(window.event){return window.event.keyCode}};AutoSuggest.prototype.getEventSource=function(ev){if(ev){return ev.target}if(window.event){return window.event.srcElement}};AutoSuggest.prototype.cancelEvent=function(ev){if(ev){ev.preventDefault();ev.stopPropagation()}if(window.event){window.event.returnValue=false}};AutoSuggest.prototype.splitParam=function(is_it){this.hasPipe=is_it};AutoSuggest.prototype.processAutoSuggest=function(fixedPosition,multiSel){var me=this;if(this.isMultipleOptionsEnabled){var multiLocality=me.elem.value.split(",");me.inputText=multiLocality[multiLocality.length-1].replace(/\s+/g," ").replace(/^\s|\s$/g,"")}else{me.inputText=me.elem.value.replace(/\s+/g," ").replace(/^\s|\s$/g,"")}if(me.inputText.length<this.minCharsNeeded){return}me.getEligible();if(typeof fixedPosition!="undefined"&&fixedPosition){me.createDiv(true)}else{me.createDiv()}me.positionDiv();if(this.showSuggestionsDiv){me.showDiv()}else{me.hideDiv()}};AutoSuggest.prototype.getSuggestionWord=function(str){if(this.hasPipe){var info=str.split("|");return info[0]}else{return str}};AutoSuggest.prototype.getSuggestionMarkup=function(str){str=str.replace(/~.*~/,"");if(this.hasPipe){var info=str.split("|");var li=$(document.createElement("li"));var a=$(document.createElement("a"));a.href="javascript:void(0)";a.id=info[1];if(this.nameWithSubItems){var parts=info[0].split("@#");info[0]=parts[0]}if(info[1].indexOf("apartment")!=-1){a.addClassName("building_icn")}a.innerHTML=info[0];li.appendChild(a);return li}else{var li=document.createElement("li");var a=document.createElement("a");a.href="javascript:void(0)";a.innerHTML=str;li.appendChild(a);return li}};AutoSuggest.prototype.callUserFunctions=function(callBackFunctions){for(var functionName in callBackFunctions){var parameters=callBackFunctions[functionName];var func=new Function("name","id","return "+functionName+"(name, id);");return func(parameters[0],parameters[1])}};function autosuggest_filterAndGetFinalIds(user_entered_val,pressed_button){var uvals=user_entered_val.split(",");var final_list=[];var allselcopy=Object.clone(window.allSelectedValues);uvals.each(function(v){v=v.trim();if(typeof allselcopy[v]!="undefined"){if(pressed_button=="ProjectSearch"){final_list.push(v+"_"+allselcopy[v])}else{final_list.push(allselcopy[v])}allselcopy[v]=undefined}});return final_list}var idCounter=0;String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};