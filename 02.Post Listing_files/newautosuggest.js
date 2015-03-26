var oldSuggestions=[];function NewAutoSuggest(inputElemId,inputText,suggestions,options){this.inputElem=document.getElementById(inputElemId);this.suggestions=suggestions;this.options={autosuggestClass:options.autosuggestClass||"",multiSel:options.multiSel||0,pickedSuggestionDivId:options.pickedSuggestionDivId||"sugg_picked_locations",insertMultiValueInInput:options.insertMultiValueInInput||0,inputSeperator:options.inputSeperator||null,suggestionSeperator:options.suggestionSeperator||"|",selCallbackFunction:options.selCallbackFunction||null,deSelCallbackFunction:options.deSelCallbackFunction||null,targetElemName:options.targetElemName,targetElemId:options.targetElemId,markupText:options.markupText||"Could not find any matches for your input",minCharsNeeded:options.minCharsNeeded||3,useDefaultSel:options.useDefaultSel||"1",hiddenFieldDivId:options.hiddenFieldDivId||"selected_seggestions",itemType:options.itemType||"location",subItem:options.subItem||null,subItemSeperator:options.subItemSeperator||"@#",subItemTargetInputId:options.subItemTargetInputId||null,subItemTargetHiddenId:options.subItemTargetHiddenId||null,autosuggestId:options.autosuggestId||"autosuggest",setLoadingImage:options.setLoadingImage||"1",fetchSuggesstion:options.fetchSuggesstion||"1",showSubItemInfo:options.showSubItemInfo||false,aptForAreaId:options.aptForAreaId||null,parentHaveScroll:options.parentHaveScroll||"0",onEnterOrTabStopPropagation:options.onEnterOrTabStopPropagation||0,mobilechrome:options.mobilechrome||false,mobilewindows:options.mobilewindows||(navigator.userAgent.match(/Nexus/i)!=null||(navigator.userAgent.match(/Windows phone/i)!=null&&navigator.userAgent.match(/IEMobile/i)!=null&&navigator.userAgent.match(/Touch/i)!==null)),autosuggestPositiontopElement:options.autosuggestPositiontopElement||null,searchimgurl:options.mobilechrome?"url(/responsive/images/search.png)":"url(/images/search_icon.png)"};oldSuggestions[this.options.itemType]=[];if(this.options.setLoadingImage=="1"){var elem=this.options.autosuggestPositiontopElement==null?this.inputElem:this.options.autosuggestPositiontopElement;elem.style.backgroundImage=this.options.searchimgurl;if(typeof(elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0])!="undefined"){elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0].style.backgroundImage=this.options.searchimgurl}this.inputElem.style.backgroundRepeat="no-repeat";this.inputElem.style.backgroundPosition="99% 50%"}this.inputText=inputText;this.eligibleSugg=[];this.highlightedSugg=-1;this.selectedSuggestions=[];if(this.options.multiSel&&document.getElementById(this.options.pickedSuggestionDivId)==undefined){var ele=document.createElement("div");ele.id=this.options.pickedSuggestionDivId;this.inputElem.parentNode.insertBefore(ele,this.inputElem.nextSibling)}this.div=document.getElementById(this.options.autosuggestId);if(!this.div){this.div=document.createElement("div");this.div.id=this.options.autosuggestId;document.body.appendChild(this.div)}this.div.className=this.options.autosuggestClass+" autosuggestDiv";this.ajaxRequest=null;this.inputElem.setAttribute("autocomplete","off");var _this=this;this.setKeyEventHandlers();this.alreadySelected=false;this.processReqTime=0;document.observe("click",function(event){if(_this.div.style.display!="none"){_this.hideSugg()}});if(this.options.parentHaveScroll!="0"&&document.getElementById(this.options.parentHaveScroll)!=undefined){document.getElementById(this.options.parentHaveScroll).observe("scroll",function(evt){_this.positionDiv()})}}NewAutoSuggest.prototype.reset=function(){this.eligibleSugg=[];this.suggestions=[];this.div.innerHTML="<ul></ul>"};NewAutoSuggest.prototype.setKeyEventHandlers=function(){var TAB=9;var ESC=27;var KEYUP=38;var KEYDN=40;var RET=13;var COMMA=188;var BKSPC=8;var _this=this;this.inputElem.onkeyup=function(event){var key=_this.getKeyCode(event);switch(key){case TAB:case RET:_this.useSuggestion();if(_this.options.onEnterOrTabStopPropagation){_this.cancelEvent(event)}break;case ESC:_this.hideSugg();break;case KEYUP:if(_this.highlightedSugg>0){_this.highlightedSugg--;_this.changeHighlight(1)}break;case KEYDN:if(_this.highlightedSugg<(_this.eligibleSugg.length-1)){_this.highlightedSugg++;_this.changeHighlight(1)}break;case BKSPC:_this.inputElem.onkeypress()}}};NewAutoSuggest.prototype.useSuggestion=function(){this.alreadySelected=false;if(this.highlightedSugg>-1){var suggestion=this.eligibleSugg[this.highlightedSugg];suggestion=suggestion.replace(/~.*~/,"");var suggInfo="";suggInfo=suggestion.split(this.options.suggestionSeperator);if(this.selectSuggestion(suggInfo[0],suggInfo[1])){if(this.options.selCallbackFunction){this.options.selCallbackFunction(suggInfo[0],suggInfo[1],this.inputElem)}}this.hideSugg();this.inputElem.focus()}};NewAutoSuggest.prototype.showSugg=function(){this.div.style.display="block"};NewAutoSuggest.prototype.hideSugg=function(){this.div.style.display="none";this.highlightedSugg=-1};NewAutoSuggest.prototype.changeHighlight=function(scrollTop){var lis=this.div.getElementsByTagName("LI");var sugg=document.getElementsByClassName("autosugg_sel");if(sugg.length>0){for(var i=0;i<sugg.length;i++){sugg[i].className=""}}if(this.highlightedSugg>=0&&lis.length>0){lis[this.highlightedSugg].className="autosugg_sel";var divHeight=this.div.offsetHeight;var liHeight=lis[this.highlightedSugg].offsetTop+lis[this.highlightedSugg].offsetHeight;if(scrollTop==1){if(liHeight>divHeight){this.div.scrollTop=(liHeight-divHeight)}else{this.div.scrollTop=0}}}};NewAutoSuggest.prototype.positionDiv=function(){if(this.div.getStyle("position")=="fixed"){if(this.Browser.IE){var height=((document.body.clientHeight)-this.inputElem.viewportOffset().top-this.inputElem.offsetHeight)}else{var height=((window.innerHeight)-this.inputElem.viewportOffset().top-this.inputElem.offsetHeight)}if(height<270){this.div.style.maxHeight=height+"px"}}if(this.options.mobilechrome){this.div.style.width=this.options.autosuggestPositiontopElement==null?this.inputElem.offsetWidth-50+"px":this.options.autosuggestPositiontopElement.offsetWidth-50+"px"}else{this.div.style.width=this.options.autosuggestPositiontopElement==null?this.inputElem.offsetWidth+"px":this.options.autosuggestPositiontopElement.offsetWidth+"px"}var el=this.options.autosuggestPositiontopElement==null?this.inputElem:this.options.autosuggestPositiontopElement;var x=0;var y=el.offsetHeight;while(el.offsetParent&&el.tagName.toUpperCase()!="BODY"){x+=el.offsetLeft;y+=el.offsetTop;el=el.offsetParent}x+=el.offsetLeft;y+=el.offsetTop;if(this.options.parentHaveScroll!="0"&&document.getElementById(this.options.parentHaveScroll)!=undefined){y-=document.getElementById(this.options.parentHaveScroll).scrollTop}this.div.style.left=1+x+"px";this.div.style.top=y+"px"};NewAutoSuggest.prototype.createDiv=function(){var _this=this;if(this.eligibleSugg.length>0){var ul=document.createElement("ul");var j=0;for(var i=0;i<this.eligibleSugg.length;i++){if(this.eligibleSugg[i]!=undefined){ul.appendChild(this.getSuggestionMarkup(this.eligibleSugg[i],j++))}}this.div.update(ul);ul.onclick=function(ev){if(_this.options.mobilechrome){var target=ev.target||ev.srcElement;if(target.nodeName=="A"){target=target.parentNode}_this.highlightedSugg=target.previousSiblings().size()}_this.useSuggestion();_this.hideSugg();_this.cancelEvent(ev);return false}}else{this.div.update("<span>"+this.options.markupText+"</span>")}if(_this.options.mobilechrome&&!_this.options.mobilewindows){var initCustomScroller=function(){jQuery(_this.div).mCustomScrollbar({set_width:false,set_height:false,horizontalScroll:false,scrollInertia:200,scrollEasing:"easeOutCirc",mouseWheel:"pixels",mouseWheelPixels:100,autoDraggerLength:false,scrollButtons:{enable:false,scrollType:"continuous",scrollSpeed:20,scrollAmount:100},advanced:{updateOnBrowserResize:true,updateOnContentResize:true,autoExpandHorizontalScroll:false,autoScrollOnFocus:true},callbacks:{onScroll:function(){}}})};initCustomScroller()}};NewAutoSuggest.prototype.getEligible=function(){this.eligibleSugg=[];var index=null;if(this.suggestions!=undefined&&this.suggestions.length>0){var input=this.inputText.toLowerCase();input=input.replace(/[^a-z0-9]/ig,"");for(var i=0;i<this.suggestions.length;i++){if(!this.suggestions[i]){continue}var suggestion=this.getSuggestionWord(this.suggestions[i]);suggestion=suggestion.toLowerCase();suggestion=suggestion.replace(/[^a-z0-9]/ig,"");if(suggestion.indexOf(input)!=-1){this.eligibleSugg[this.eligibleSugg.length]=this.suggestions[i]}}}};NewAutoSuggest.prototype.getKeyCode=function(event){if(event){if(this.options.mobilechrome&&event.which===0){var userInput=this.inputElem.value;return userInput.charAt(userInput.length-1).charCodeAt(0)}return event.keyCode||event.which}if(window.event){return window.event.keyCode}};NewAutoSuggest.prototype.getEventSource=function(ev){if(ev){return ev.target}if(window.event){return window.event.srcElement}};NewAutoSuggest.prototype.cancelEvent=function(ev){if(ev){ev.preventDefault();ev.stopPropagation()}if(window.event){window.event.returnValue=false}};NewAutoSuggest.prototype.getSuggestionWord=function(str){if(this.options.suggestionSeperator){var info=str.split(this.options.suggestionSeperator);return info[0]}else{return str}};NewAutoSuggest.prototype.getSuggestionMarkup=function(str,i){str=str.replace(/~.*~/,"");var li=document.createElement("li");var a=document.createElement("a");a.href="javascript:void(0)";if(this.options.suggestionSeperator){var info=str.split(this.options.suggestionSeperator);if(!this.options.subItem){if(info[1].search("apartment")!=-1){a.addClassName("building_icn")}a.innerHTML=info[0]}else{var subItemInfo=info[0].split(this.options.subItemSeperator);a.innerHTML=subItemInfo[0];if(this.options.showSubItemInfo&&this.options.subItem=="area"){a.innerHTML+="<br><i>"+subItemInfo[2]+"</i>"}}}else{a.innerHTML=str}var newName=a.innerHTML.split("#");if(newName.length>1){a.innerHTML=newName[0]+"["+newName[1]+"]"}var _this=this;li.onmouseover=function(event){_this.highlightedSugg=this.previousSiblings().size();_this.changeHighlight(0)};li.appendChild(a);return li};NewAutoSuggest.prototype.processAutoSuggest=function(){this.highlightedSugg=0;this.getEligible();this.positionDiv();this.createDiv();this.showSugg();this.changeHighlight(1)};String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};NewAutoSuggest.prototype.fetchSuggestionsNoKeyup=function(city,inputText,event){city=city.strip();if(city==""||city==undefined||city=="0"||city==0){alert("Please select city name")}if(inputText==""){return}if(this.options.inputSeperator){var text=inputText.split(this.options.inputSeperator);inputText=text[text.length-1]}if(inputText.length<this.options.minCharsNeeded){this.hideSugg();return}if((inputText.match(/^[a-z0-9]+$/i))){this.hideSugg();if(this.options.setLoadingImage=="1"){var elem=this.options.autosuggestPositiontopElement==null?this.inputElem:this.options.autosuggestPositiontopElement;elem.style.backgroundImage="url('/cfassets/images/common/loader.gif')";if(typeof(elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0])!="undefined"){elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0].style.backgroundImage="url('/cfassets/images/common/loader.gif')"}}this.processReqTime++;var _this=this;setTimeout(function(){_this.processReqTime--;if(_this.processReqTime<=0){_this.processRequest(city,inputText)}},300)}};NewAutoSuggest.prototype.fetchSuggestions=function(city,inputText,event){if(this.options.mobilechrome&&(PageConstants.browserType=="Firefox"||PageConstants.browserType=="Operamini")){this.fetchSuggestionsNoKeyup(city,inputText,event);return false}city=city.strip();var BKSPC=8;var charPress=null;var backSpacePress=0;if(city==""||city==undefined||city=="0"||city==0){alert("Please select city name")}if(inputText==""){return}if(this.options.inputSeperator){var text=inputText.split(this.options.inputSeperator);inputText=text[text.length-1]}var keyCode=this.getKeyCode(event);switch(keyCode){case BKSPC:inputText=inputText.substring(0,inputText.length-1);backSpacePress=1;break;default:charPress=String.fromCharCode(keyCode);if(!this.options.mobilechrome){inputText+=charPress}}if(inputText.length<this.options.minCharsNeeded){this.hideSugg();return}if((charPress&&charPress.match(/^[a-zA-Z0-9_\-]$/))||backSpacePress){this.hideSugg();if(this.options.setLoadingImage=="1"){var elem=this.options.autosuggestPositiontopElement==null?this.inputElem:this.options.autosuggestPositiontopElement;elem.style.backgroundImage="url('/cfassets/images/common/loader.gif')";if(typeof(elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0])!="undefined"){elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0].style.backgroundImage="url('/cfassets/images/common/loader.gif')"}}this.processReqTime++;var _this=this;setTimeout(function(){_this.processReqTime--;if(_this.processReqTime<=0){_this.processRequest(city,inputText)}},300)}};NewAutoSuggest.prototype.processRequest=function(city,inputText){if(this.ajaxRequest){if(!this.Browser.IE&&this.ajaxRequest.transport){try{this.ajaxRequest.transport.aborted=true;this.ajaxRequest.transport.abort()}catch(e){}}delete this.ajaxRequest}tempAutosuggestObject=null;try{inputText=inputText.toLowerCase();this.inputText=inputText;if(this.options.fetchSuggesstion!="1"){this.processAutoSuggest();if(this.options.setLoadingImage=="1"){var elem=this.options.autosuggestPositiontopElement==null?this.inputElem:this.options.autosuggestPositiontopElement;elem.style.backgroundImage=this.options.searchimgurl;if(typeof(elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0])!="undefined"){elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0].style.backgroundImage=this.options.searchimgurl}}}else{if(oldSuggestions[this.options.itemType]==undefined||oldSuggestions[this.options.itemType][city]==undefined){if(oldSuggestions[this.options.itemType]==undefined){oldSuggestions[this.options.itemType]=[]}oldSuggestions[this.options.itemType][city]=[]}if(!oldSuggestions[this.options.itemType][city][inputText]||oldSuggestions[this.options.itemType][city][inputText].length==0||!oldSuggestions[this.options.itemType][city].hasOwnProperty(inputText)){var _this=this;var params;if(this.options.itemType=="location_with_count"){params=$("property_listing_input_options").serialize()+"&c="+encodeURIComponent(city)+"&item="+encodeURIComponent(_this.options.itemType)+"&str="+encodeURIComponent(inputText)+"&sub_item="+encodeURIComponent(_this.options.subItem)}else{if((this.options.itemType=="apartment")&&(this.options.aptForAreaId!=null)){params="c="+encodeURIComponent(city)+"&apt_for_area_id="+encodeURIComponent(document.getElementById(this.options.aptForAreaId).value)+"&item="+encodeURIComponent(_this.options.itemType)+"&str="+encodeURIComponent(inputText)+"&sub_item="+encodeURIComponent(_this.options.subItem)}else{params="c="+encodeURIComponent(city)+"&item="+encodeURIComponent(_this.options.itemType)+"&str="+encodeURIComponent(inputText)+"&sub_item="+encodeURIComponent(_this.options.subItem)}}this.ajaxRequest=new Ajax.Request("/autosuggest.php",{method:"GET",parameters:params,onSuccess:function(transport){try{transport.responseText=eval(transport.responseText);if(transport.responseText.length>0){oldSuggestions[_this.options.itemType][city][inputText]=_this.sortSuggestions(transport.responseText)}_this.inputText=inputText;_this.suggestions=oldSuggestions[_this.options.itemType][city][inputText];_this.processAutoSuggest();_this.ajaxRequest=null;if(_this.options.setLoadingImage=="1"){var elem=_this.options.autosuggestPositiontopElement==null?_this.inputElem:_this.options.autosuggestPositiontopElement;elem.style.backgroundImage=_this.options.searchimgurl;if(typeof(elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0])!="undefined"){elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0].style.backgroundImage=_this.options.searchimgurl}}}catch(e){console.log(e.message);if(_this.options.setLoadingImage=="1"){var elem=_this.options.autosuggestPositiontopElement==null?_this.inputElem:_this.options.autosuggestPositiontopElement;elem.style.backgroundImage=_this.options.searchimgurl;if(typeof(elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0])!="undefined"){elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0].style.backgroundImage=_this.options.searchimgurl}}}},onFailure:function(transport){}})}else{this.inputText=inputText;this.suggestions=oldSuggestions[this.options.itemType][city][inputText];this.processAutoSuggest();if(this.options.setLoadingImage=="1"){var elem=this.options.autosuggestPositiontopElement==null?this.inputElem:this.options.autosuggestPositiontopElement;elem.style.backgroundImage=this.options.searchimgurl;if(typeof(elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0])!="undefined"){elem.parentNode.getElementsByClassName("autosuggest-search-icon")[0].style.backgroundImage=this.options.searchimgurl}}}}}catch(e){console.log(e)}};NewAutoSuggest.prototype.filterAndGetFinalIds=function(pressed_button){var uvals=this.inputElem.value;uvals=uvals.split(this.options.inputSeperator);var final_list=[];var selectedSuggestions=Object.clone(this.selectedSuggestions);uvals.each(function(v){v=v.trim();if(typeof selectedSuggestions[v]!="undefined"){if(pressed_button=="ProjectSearch"){final_list.push(v+"_"+selectedSuggestions[v])}else{final_list.push(selectedSuggestions[v])}selectedSuggestions[v]=undefined}});return final_list};NewAutoSuggest.prototype.loadPreLoadedSuggestions=function(){if(this.selectedSuggestions){for(i in this.selectedSuggestions){this.selectSuggestion(i,this.selectedSuggestions[i],i+this.selectedSuggestions[i])}}};NewAutoSuggest.prototype.selectSuggestion=function(name,Id,selSuggId){if(this.options.useDefaultSel=="1"){if(this.options.subItem){var subItemInfo=name.split(this.options.subItemSeperator);this.inputElem.value=subItemInfo[0];document.getElementById(this.options.targetElemId).value=Id;if(this.options.subItem=="area"){document.getElementById(this.options.subItemTargetHiddenId[0]).value=subItemInfo[1];document.getElementById(this.options.subItemTargetInputId[0]).value=subItemInfo[2];document.getElementById(this.options.subItemTargetInputId[1]).value=subItemInfo[3]}}else{if(this.options.multiSel){if(this.options.insertMultiValueInInput){if(this.options.inputSeperator){var text=this.inputElem.value.split(this.options.inputSeperator);text[text.length-1]=name;this.inputElem.value=text.join(this.options.inputSeperator)+this.options.inputSeperator;text=document.getElementById(this.options.targetElemId).value;if(text==""){document.getElementById(this.options.targetElemId).value=Id}else{text=text.split(this.options.inputSeperator);text[text.length]=Id;document.getElementById(this.options.targetElemId).value=text.join(this.options.inputSeperator)}this.selectedSuggestions[name]=Id}}else{if(document.getElementById(this.options.hiddenFieldDivId+Id)!=undefined){this.hideSugg();this.inputElem.value="";this.inputElem.focus();return false}var newSelSugg=document.createElement("input");newSelSugg.name=this.options.targetElemName;newSelSugg.id=this.options.hiddenFieldDivId+Id;newSelSugg.type="hidden";newSelSugg.value=Id;var newSelDis=document.createElement("a");name=name.split("#");if(this.options.mobilechrome){newSelDis.innerHTML="<span class='remove-locality'></span><span class='popular_locality_name'>"+name[0]+"</span><span class='popular_locality_add'>x</span>"}else{newSelDis.innerHTML="<span class='popular_locality_name'>"+name[0]+"</span><span class='popular_locality_add'>x</span>"}newSelDis.className="autsspan";newSelDis.title="remove";if(selSuggId!=undefined){newSelDis.id=selSuggId}var _this=this;newSelDis.onclick=function(){this.parentNode.removeChild(this);document.getElementById(_this.options.hiddenFieldDivId).removeChild(document.getElementById(_this.options.hiddenFieldDivId+Id));if(_this.options.deSelCallbackFunction){_this.options.deSelCallbackFunction(name,Id)}};var clearDiv=document.createElement("div");clearDiv.style.clear="both";document.getElementById(this.options.hiddenFieldDivId).appendChild(newSelSugg);if(document.getElementById(this.options.pickedSuggestionDivId).childNodes.length>0){document.getElementById(this.options.pickedSuggestionDivId).insertBefore(clearDiv,document.getElementById(this.options.pickedSuggestionDivId).childNodes[0]);document.getElementById(this.options.pickedSuggestionDivId).insertBefore(newSelDis,document.getElementById(this.options.pickedSuggestionDivId).childNodes[0])}else{document.getElementById(this.options.pickedSuggestionDivId).appendChild(newSelDis);document.getElementById(this.options.pickedSuggestionDivId).appendChild(clearDiv)}this.inputElem.value=""}}else{this.inputElem.value=name;document.getElementById(this.options.targetElemId).value=Id}}}return true};NewAutoSuggest.prototype.deselectSuggestion=function(name,Id,selSuggId){if(document.getElementById(selSuggId)!=undefined){document.getElementById(this.options.pickedSuggestionDivId).removeChild(document.getElementById(selSuggId));document.getElementById(this.options.hiddenFieldDivId).removeChild(document.getElementById(this.options.hiddenFieldDivId+Id))}if(this.options.deSelCallbackFunction){this.options.deSelCallbackFunction(name,Id)}};NewAutoSuggest.prototype.Browser=function(){var ua=navigator.userAgent;var isOpera=Object.prototype.toString.call(window.opera)=="[object Opera]";return{IE:!!window.attachEvent&&!isOpera,Opera:isOpera,WebKit:ua.indexOf("AppleWebKit/")>-1,Gecko:ua.indexOf("Gecko")>-1&&ua.indexOf("KHTML")===-1,MobileSafari:/Apple.*Mobile/.test(ua)}};NewAutoSuggest.prototype.sortSuggestions=function(suggestions){var finalSugg=[];if(suggestions!=undefined&&suggestions.length>0){var input=this.inputText.toLowerCase();input=input.replace(/[^a-z0-9]/ig,"");var indexForNewSugg=[];var suggestion=null;for(var i=0;i<suggestions.length;i++){if(!suggestions[i]){continue}suggestion=suggestions[i].toLowerCase().replace(/[^a-z0-9]/g,"");index=suggestion.indexOf(input);if(index!=-1){if(indexForNewSugg[index]==undefined){indexForNewSugg[index]=[]}indexForNewSugg[index][indexForNewSugg[index].length]=suggestions[i]}}for(i=0;i<indexForNewSugg.length;i++){if(indexForNewSugg[i]!=undefined){if(indexForNewSugg[i][0]!=undefined){for(var j=0;j<indexForNewSugg[i].length;j++){finalSugg[finalSugg.length]=indexForNewSugg[i][j]}}else{finalSugg[finalSugg.length]=indexForNewSugg[i]}}}}return finalSugg};