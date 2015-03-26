function ProfilePage(){var serialzeArr={};var formInputSelector="input[name],select[name],textarea[name]";var locality_suggestor;var g_selected_suggestions={};var no_of_subagent=0;var newSubAgentMarkup='<tr id={broker_id}><td style="text-align:center;"><span>{broker_name}</span> </td><td>{broker_email}</td><td>{broker_mobile}</td><td>{created_on}</td><td>{broker_status}</td><td class="number">-</td><td class="number">-</td><td class="number">-</td><td class="text-center inline-form-section" style="width: 250px;"> <div class="credits"><input maxlength="4" type="text" class="text-right readonly-input" value="{subagent_credits}" readonly="" class="readonly-input"></div></td></tr>';this.init=function(){try{no_of_subagent=parseInt($("#myteam-page").attr("data-count"));if(no_of_subagent==0){$("#no_sub-agent_text").show();$(".sub-agent_data").hide()}else{$(".sub-agent_data").show();$("#no_sub-agent_text").hide()}var page=$("[sub-page-name]").attr("sub-page-name");switch(page){case"profile-page":initializeMyProfilePage();break;case"myteam-page":initializeMyTeamPage();break;case"my-subscriptions":intializeMySubscriptionsPage();break;default:break}}catch(e){console.error("Error intializing Profile Page :: "+e.message)}};function initializeMyProfilePage(){try{$("#city").val($("#city_hidden_field").val());$(".custom-chosen").chosen({width:"95%"});$("#propertyType").chosen();$("#profileform").find(formInputSelector).each(function(i){populateSerializeArray(this)});initializeAutosuggest();bindMyProfileEventHandlers()}catch(e){console.error("Exception in intializing Profile page :: "+e.message)}$("#datepicker").datepicker({format:"MM' yyyy",viewMode:"months",minViewMode:"months",endDate:new Date()})}function initializeMyTeamPage(){$('[data-toggle="tooltip"]').tooltip({placement:"bottom"});var currAgentDelId;$(".custom-chosen").chosen({width:"75%",search_contains:true});bindMyTeamEventHandlers()}function bindMyTeamEventHandlers(){var currCreditRemCount;$("#subagent-acc-table .delete-agent").click(function(){$("#delete-sub-agent-modal").modal("show");currAgentDelId=$(this).closest("tr").attr("id");var parentEl=$(this).closest("tr");credit=parentEl.find(".readonly-input").removeAttr("readonly").val()});$("#delete-sub-agent-modal .confirm-del").click(function(){var p=$(this).closest("tr");var d="subagent_id="+currAgentDelId+"&subagent_credit="+credit+"&type=delete";themeInteraction.postData("/agent/sub-agent/sub-user-manage",d,function(resp){var str1=$("#myteam-page .agent-credits").text().replace(/[^\d.]/g,"");var credits=parseFloat(str1).toFixed(2)-0;var num=(credits+(parseFloat(credit).toFixed(2)-0));$("#myteam-page .agent-credits").text("Credit Balance : "+num+" Credits");$("#"+currAgentDelId).remove();no_of_subagent--;if(no_of_subagent==0){$("#no_sub-agent_text").show();$(".sub-agent_data").hide()}showNotification("Subagent successfully removed")},function(err){console.log(err);return})});$("#subagent-acc-table .edit-agent").click(function(){var tr=$(this).closest("tr");var form=$("#update-subagent-form");currAgentId=tr.attr("id");var currAgentCity=tr.attr("data-city");var currAgentEmail=tr.find(".subagent_email").text();var currAgentName=tr.find(".subagent_name").text();var currAgentMobile=tr.find(".subagent_mobile").text();$("#update-sub-agent-modal").modal("show");form.find("input[name=sub_agent_name]").val(currAgentName);form.find("input[name=sub_agent_email]").val(currAgentEmail);form.find("input[name=sub_agent_mobile]").val(currAgentMobile);form.find("select[name=sub_agent_city]").val(currAgentCity).trigger("chosen:updated")});$("#update-sub-agent-modal .update-subagent").click(function(){var subagentData=$("#update-subagent-form").serialize();subagentData=subagentData+"&subagent_id="+currAgentId;var updateSubagentForm=$(this).closest("#update-sub-agent-modal");var r=validateHtmlElements(updateSubagentForm);if(r===-1){return}$("#update-sub-agent-modal").modal("hide");var loading=$(".view-container .loading");loading.show();themeInteraction.postData("/agent/sub-agent/edit-sub-user",subagentData,function(resp){resp=JSON.parse(resp)||"";if(resp&&typeof resp=="object"){if(resp.status=="success"){var updatedForm=$("#update-subagent-form");var updatedName=updatedForm.find("#name input").val();var updatedMobile=updatedForm.find("#mobile input").val();var updatedCity=updatedForm.find("#city select").val();var editField=$("#"+currAgentId);editField.attr("data-city",updatedCity);editField.find(".subagent_name").text(updatedName);editField.find(".subagent_mobile").text(updatedMobile);editField.find(".subagent_city").text(updatedCity);showNotification("Subagent information successfully updated")}else{showNotification("Failed to update sub-agent","error")}}loading.hide()})});$("#create-agent").click(function(){$("#add-sub-agent-modal").modal("show");trackPageEvents("My Team","Add Team Member","init")});$("#myteam-page .custom-inline-edit").click(function(){$(this).hide();currAgentId=$(this).closest("tr").attr("id");var parentEl=$(this).closest(".inline-form-section");parentEl.addClass("writemode-container");currCreditRemCount=parentEl.find(".readonly-input").removeAttr("readonly").val()});$("#myteam-page .inline-form-btn .credit-edit").click(function(){var par=$(this).closest("tr");subagent_credit=parseFloat(par.find(".readonly-input").removeAttr("readonly").val());var r=validateHtmlElements(par);if(r===-1){return}var agentData="subagent_id="+currAgentId+"&subagent_credit="+subagent_credit;themeInteraction.postData("/agent/sub-agent/edit-subagent-credit-detail",agentData,function(resp){resp=JSON.parse(resp)||"";if(resp&&typeof resp=="object"){if(resp.status=="success"){var str1=$("#myteam-page .agent-credits").text().replace(/[^\d.]/g,"");var credits=parseFloat(str1).toFixed(2)-0;var num=(credits+(parseFloat(resp.prev_credit_value).toFixed(2)-0-parseFloat(resp.credit_value).toFixed(2)-0));$("#myteam-page .agent-credits").text("Credit Balance : "+num+" Credits");showNotification("Subagent Credits successfully updated")}else{showNotification("Failed to edit sub-agent credits :"+resp.msg,"error");par.find(".readonly-input").attr("readonly",true).val(currCreditRemCount)}currCreditRemCount=""}})});$("#myteam-page .inline-form-section").hover(function(){if($(".writemode-container").length>0){return false}$(this).find(".custom-inline-edit").show()},function(){$(this).find(".custom-inline-edit").hide()});$("#myteam-page .inline-form-btn .btn-danger").click(function(){$(this).parent().hide();var parent=$(this).closest(".inline-form-section").removeClass("writemode-container");parent.find(".readonly-input").attr("readonly",true).val(currCreditRemCount);currCreditRemCount=""});$("#add-sub-agent-modal .submit-subagent").click(function(){var subagentData=$("#add-subagent-form").serialize();var addSubagentForm=$(this).closest("#add-sub-agent-modal");var r=validateHtmlElements(addSubagentForm);if(r===-1){return}$("#add-sub-agent-modal").modal("hide");var loading=$(".view-container .loading");loading.show();themeInteraction.postData("/agent/sub-agent/add-sub-agent",subagentData,function(resp){resp=JSON.parse(resp)||"";if(resp&&typeof resp=="object"){if(resp.status=="success"){no_of_subagent++;trackPageEvents("My Team","Add Team Member","Success");$("#no_sub-agent_text").hide();$(".sub-agent_data").show();$("#subagent-acc-table > tbody:last").append(newSubAgentMarkup.interpolate(resp)).show();var str1=$("#myteam-page .agent-credits").text().replace(/[^\d.]/g,"");var credits=parseFloat(str1).toFixed(2)-0;var num=(credits-parseFloat(resp.subagent_credits).toFixed(2)-0);$("#myteam-page .agent-credits").text("Credit Balance : "+num+" Credits")}else{showNotification("Failed to create sub-agent :"+resp.msg,"error")}}loading.hide()})});$("#myteam-page .inline-form-btn .btn-success").click(function(){var data=$("#profileform").serialize();var inlineForm=$(this).closest(".inline-form-section");var url="/agent/profile/edit";var errMsg="";var error=false;var r=validateHtmlElements(inlineForm);if(r===-1){return}$(this).parent().hide();inlineForm.removeClass("writemode-container").find(".readonly-input").attr("readonly",true)})}function intializeMySubscriptionsPage(){$('[data-toggle="tooltip"]').tooltip();$("#lead-consumption-summary-table").tablesorter({headers:{0:{sorter:false},2:{sorter:false},3:{sorter:false},4:{sorter:false}},sortList:[[1,0]]});$("#locality-leads-table").tablesorter({headers:{0:{sorter:false},2:{sorter:false},3:{sorter:false},4:{sorter:false}},sortList:[[1,1]]});exportExcelUrl="";$(".edit-credit-cap").click(function(){$("#edit-credit-cap-modal").modal("show");$("#ol-cap").val("");$("#dl-cap").val("");var tr=$(this).closest("tr");filter_id=tr.attr("id");var lead_cap=tr.attr("lead-cap");var credit_cap=tr.attr("credit-cap");lead_used=tr.attr("lead-used");$(".lead-cap").text(lead_cap);$(".credit-cap").text(credit_cap);trackPageEvents("My Subscriptions","Click","Edit_init")});$("#city-col").click(function(){var isAsc=$(this).hasClass("headerSortUp");trackPageEvents("My Subscriptions","Click","Sort - City_"+(isAsc?"asc":"desc"))});$("#edit-credit-cap-submit").click(function(){var capForm=$("#ol-cap").parent();var r=validateHtmlElements(capForm);if(r===-1){return}var dailyLeadCap=$("#dl-cap").val();var overallLeadCap=$("#ol-cap").val();var url="agent/report/raise-lead-refund-request";var credit_cap=$("#ol-cap").val();var lead_cap=$("#dl-cap").val();var data="filter_id="+filter_id+"&lead_cap="+lead_cap+"&credit_cap="+credit_cap;var url="agent/account-credit/update-credit-and-lead-cap";$("#edit-credit-cap-modal").modal("hide");themeInteraction.postData(url,data,function(resp){resp=JSON.parse(resp)||"";if(resp&&typeof resp=="object"){var editField=$("#"+filter_id);if(resp.lead_cap){editField.attr("lead-cap",resp.lead_cap)}if(resp.credit_cap){editField.attr("credit-cap",resp.credit_cap);editField.find(".credit_cap").text(resp.credit_cap);if(parseFloat(resp.credit_cap)==parseFloat(resp.current_credit_cap)){editField.find(".show-warning-icon").show()}else{editField.find(".show-warning-icon").hide()}}showNotification(resp.msg);trackPageEvents("My Subscriptions","Click",$(".lead-cap").text()+"-"+$("#dl-cap").val());trackPageEvents("My Subscriptions","Click",$(".credit-cap").text()+"-"+$("#ol-cap").val())}else{showNotification("Some Error occurred","error")}})})}function initializeAutosuggest(){locality_suggestor=new NewAutoSuggest("agnt_location_serv_input",$("#agnt_location_serv_input").val(),null,{targetElemName:"agent_serving_location[]",suggestionSeperator:"|",multiSel:1,autosuggestClass:"greyborder",pickedSuggestionDivId:"agnt_picked_locations",onMissMarkup:"Could not find any matches for your input",itemType:"locality",hiddenFieldDivId:"agnt_hidden_fields_container",setLoadingImage:"0",parentHaveScroll:"content"});var preloadedSugg=document.getElementById("agent_preloaded_suggestions").value;if(preloadedSugg&&preloadedSugg!="null"){try{locality_suggestor.selectedSuggestions=g_selected_suggestions=JSON.parse(preloadedSugg);locality_suggestor.loadPreLoadedSuggestions()}catch(e){console.log(e)}}var d=$("#autosuggest");$("#content").scroll(function(e){if(d){d.hide()}})}function updateSelectedSuggestions(){var valPart=$("#agnt_hidden_fields_container input");g_selected_suggestions={};for(var i=0;i<valPart.length;i++){var keyEl=valPart[i].getAttribute("data-locality");g_selected_suggestions[keyEl]=valPart[i].value}locality_suggestor.selectedSuggestions=g_selected_suggestions;locality_suggestor.loadPreLoadedSuggestions();var l=Object.keys(g_selected_suggestions)||[];if(l.length>0){$("#localities_shown").html(l.join(","))}else{$("#localities_shown").html("Not Specified")}}function populateSerializeArray(e){var value=$(e).val();serialzeArr[$(e).attr("name")]=value}function handleProfileFormSubmitCallback(inlineForm){updateSelectedSuggestions();inlineForm.find(formInputSelector).each(function(i){populateSerializeArray(this);if(this.tagName.toLowerCase()=="select"&&this.className.indexOf("custom-chosen")>-1){var text;if($(this).val()==null){text="N/A"}else{var val=$(this).val();text=$(this).val();if(typeof val=="object"){text=$(this).val().join(",")}}inlineForm.find(".inline-form-shown").html(text)}})}function bindMyProfileEventHandlers(){$("#profile-page .custom-inline-edit").click(function(){var parentEl=$(this).closest(".inline-form-section");parentEl.addClass("writemode-container");var input=parentEl.find(".readonly-input").removeAttr("readonly");if(input.val()=="Not Specified"){input.val("")}locality_suggestor.selectedSuggestions=g_selected_suggestions;locality_suggestor.loadPreLoadedSuggestions();if(input.length==0){input=parentEl.find("select")}trackPageEvents("Profile","Edit",input.attr("name"))});$("#profile-page .inline-form-btn .btn-danger").click(function(){$(this).parent().hide();var parent=$(this).closest(".inline-form-section").removeClass("writemode-container");parent.find(formInputSelector).each(function(i){var val=serialzeArr[$(this).attr("name")];$(this).val(val);if(this.tagName.toLowerCase()=="select"&&this.className.indexOf("custom-chosen")>-1){$(this).trigger("chosen:updated")}});parent.find(".readonly-input").attr("readonly",true);if(parent.hasClass("profile-name-section")){parent.find("img.profile-pic:first-child").show();parent.find("img#profile-pic-placeholder").hide();$("#profile-pic-uploader").val("")}});function resetLocalitiesField(){$("#localities_shown").html("");$("#agnt_picked_locations").html("");$("#city_hidden_field").val($("#city").val());$("#agnt_hidden_fields_container").html("");$("[name='agent_serving_location[]']").val("")}var months=["MONTHS","January","February","March","April","May","June","July","August","September","October","November","December"];$("#profile-page .inline-form-btn .btn-success").click(function(){if($("#city_hidden_field").val()!=$("#city").val()){resetLocalitiesField()}var data=$("#profileform").find("select, textarea, input").serializeArray();for(var index=0;index<data.length;index++){if(data[index].value=="Not Specified"){data[index].value=""}if(data[index].name=="oper_since"&&data[index].value.indexOf("'")>-1){var dt=data[index].value.split("'");var mt=months.indexOf(dt[0].trim());if(mt>0){mt=mt+"";if(mt.length==1){mt="0"+mt}data[index].value=dt[1].trim()+"-"+mt+"-01"}}}data=jQuery.param(data);var inlineForm=$(this).closest(".inline-form-section");var url="/agent/profile/edit";var errMsg="";var error=false;var r=validateHtmlElements(inlineForm);if(r===-1){return}themeInteraction.postData(url,data,function(resp){var respArr=resp.split("|");if(respArr[0]=="0"){showNotification(respArr[1],"error")}else{handleProfileFormSubmitCallback(inlineForm);$(this).parent().hide();var input=inlineForm.removeClass("writemode-container").find(".readonly-input").attr("readonly",true);if(input.length==0){input=inlineForm.find("select")}trackPageEvents("Profile","Update",input.attr("name"))}})});$("#profile-page .inline-form-section").hover(function(){if($(".writemode-container").length>0){return false}$(this).find(".custom-inline-edit").show()},function(){$(this).find(".custom-inline-edit").hide()});$("#agnt_location_serv_input").keypress(function(e){locality_suggestor.fetchSuggestions($("#city").val(),this.value,e)});$("#profile-page .profile-pic").click(function(){if($(".profile-name-section").hasClass("writemode-container")){return}$("#profile-pic-uploader").click()});$("#profile-pic-uploader").on("change",function(){var files=!!this.files?this.files:[];var _this=this;if(!files.length||!window.FileReader){return}var reader=new FileReader();var img=files[0];reader.readAsDataURL(img);reader.onloadend=(function(){if(/^image/.test(img.type)){var form=document.getElementById("profile-pic-submit");var _img=this;var fd=new FormData();fd.append("app",img);$("#profile-page img.profile-pic").hide();$("#profile-pic-placeholder").show();$.ajax({url:"/agent/profile/upload-profile-pic",type:"POST",data:fd,contentType:false,cache:false,processData:false,success:function(data){if(data&&data.indexOf("|")>-1){var status=data.split("|");if(status[0].trim()+""=="1"){$("#profile-page img.profile-pic").attr("src",_img.result).show();$("#header_profile_pic").attr("src",_img.result);$("#profile-pic-placeholder").hide();$("#profile-pic-submit input[type=file]").val("");return}}$("#profile-pic-placeholder").hide();$("#profile-page img.profile-pic").show();$("#profile-pic-submit input[type=file]").val("");showNotification("Failed to update profile pic","error")}})}})})}};