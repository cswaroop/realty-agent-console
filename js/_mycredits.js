function MyCreditsPage(){var request_action;var request_ctrl;var exportExcelUrl;this.init=function(){try{var page=$("[sub-page-name]").attr("sub-page-name");switch(page){case"lead-report":initLeadReportPage();break;case"refund-status":initRefundStatusPage();break;case"credits-summary":initCreditsSummaryPage();break;default:break}var request_uri=document.getElementById("request_uri").value;if(request_uri){request_ctrl=request_uri.substring(0,request_uri.lastIndexOf("/"));request_action=request_uri.substring(request_uri.lastIndexOf("/"))}bindGenericEventHandlers()}catch(e){console.error("Error initalize My Credits page :: "+e.message)}};function initLeadReportPage(){$('[data-toggle="tooltip"]').tooltip({placement:"bottom"});var leadId;$("#lead-report .agent_lead_status").click(function(){var tr=$(this).closest("tr");leadId=tr.attr("id");broker_id=$(this).closest("tr").attr("broker_id");var modal=$("#lead-status-modal").modal("show");var t=tr.find(".agent_lead_status").text().trim();if(t!="Not Specified"){$("#agent-lead-status select").val(t)}else{$("#agent-lead-status select").val("")}});$("#lead-status-modal .add-status").click(function(){var tagValue=$("#lead-status-modal .agent-lead-status option:selected").val();var d="tg="+tagValue+"&tt=status&li="+leadId+"&broker_id="+broker_id;$("#lead-status-modal").modal("hide");themeInteraction.postData("/agent/report/add-tag",d,function(resp){var editField=$("#"+leadId);editField.find(".lead-status").find("span").text(tagValue);showNotification(resp)})});$("#lead-report .agent_lead_remarks").click(function(){var tr=$(this).closest("tr");leadId=tr.attr("id");broker_id=tr.attr("broker_id");$("#lead-remarks-modal").modal("show");var t=tr.find(".lead-remark").text().trim();if(t!="Not Specified"){$(".lead_remark_in").val(t)}else{$(".lead_remark_in").val("")}});$("#lead-remarks-modal .add-remarks").click(function(){remarks=$("#lead-remarks-modal textarea.lead_remark_in").val();var d="tg="+remarks+"&tt=remark&li="+leadId+"&broker_id="+broker_id;$("#lead-remarks-modal").modal("hide");themeInteraction.postData("/agent/report/add-tag",d,function(resp){var editField=$("#"+leadId);editField.find(".lead-remark").text(remarks);editField.find(".remarks-tooltip").attr("data-original-title",remarks);showNotification(resp)})});var reportBtn;$(".report_button").click(function(){reportBtn=$(this);if(reportBtn.attr("report-broker")=="false"){return}$("#report-agent-modal").modal("show")});$("#report-agent-modal-submit").click(function(){var td=reportBtn.closest("td").html("Reporting...");var pool_id=reportBtn.attr("lead-id");var broker_id=reportBtn.attr("broker-id");var url="agent/report/raise-lead-refund-request";var data="broker_id="+broker_id+"&pool_id="+pool_id;themeInteraction.postData(url,data,function(){td.html("Reported")})});exportExcelUrl="/agent/agent-report/export-as-excel"}function initRefundStatusPage(){exportExcelUrl="/agent/account-credit/export-refund-report-as-excel"}function initCreditsSummaryPage(){$("#lead-consumption-summary-table").tablesorter({headers:{0:{sorter:false},2:{sorter:false},3:{sorter:false},4:{sorter:false}},sortList:[[1,0]]});$("#locality-leads-table").tablesorter({headers:{0:{sorter:false},2:{sorter:false},3:{sorter:false},4:{sorter:false}},sortList:[[1,1]]});exportExcelUrl="";$(".edit-credit-cap").click(function(){$("#edit-credit-cap-modal").modal("show");$("#ol-cap").val("");$("#dl-cap").val("");var tr=$(this).closest("tr");filter_id=tr.attr("id");var lead_cap=tr.attr("lead-cap");var credit_cap=tr.attr("credit-cap");$(".lead-cap").text(lead_cap);$(".credit-cap").text(credit_cap)});$("#edit-credit-cap-submit").click(function(){var capForm=$("#ol-cap").parent();var r=validateHtmlElements(capForm);if(r===-1){return}var dailyLeadCap=$("#dl-cap").val();var overallLeadCap=$("#ol-cap").val();var url="agent/report/raise-lead-refund-request";var credit_cap=$("#ol-cap").val();var lead_cap=$("#dl-cap").val();var data="filter_id="+filter_id+"&lead_cap="+lead_cap+"&credit_cap="+credit_cap;var url="agent/account-credit/update-credit-and-lead-cap";$("#edit-credit-cap-modal").modal("hide");themeInteraction.postData(url,data,function(resp){resp=JSON.parse(resp)||"";if(resp&&typeof resp=="object"){var editField=$("#"+filter_id);if(resp.lead_cap){editField.attr("lead-cap",resp.lead_cap)}if(resp.credit_cap){editField.attr("credit-cap",resp.credit_cap);editField.find(".credit_cap").text(resp.credit_cap);if(parseInt(resp.credit_cap)==parseInt(resp.current_credit_cap)){editField.find(".fa-warning").show()}else{editField.find(".fa-warning").hide()}}showNotification(resp.msg)}else{showNotification("Some Error occurred","error")}})})}function bindGenericEventHandlers(){$('[data-toggle="tooltip"]').tooltip();$(".table-toggle-header").on("click",function(e){if(e.target.attributes.hasOwnProperty("sort-title")){return}$(this).parent().addClass("show").find(".table-toggle-input input").focus()});$(".table-toggle-input input").blur(function(){$(this).val("").trigger("keyup").parent().parent().removeClass("show")});$(".table-toggle-input input").keyup(function(e){var data=this.value.toLowerCase();var _this=$(this);var row=_this.closest("table").find("tbody tr").hide();var col=_this.closest("th").index()+1;row.filter(function(){var $t=$(this).find("td:nth-child("+col+")");if($t.text().toLowerCase().indexOf(data)>-1){return true}return false}).show()});$("select[credit-filter]").change(function(){if(this.value==""){return false}var data=$("select[credit-filter]").serialize()+"&"+$("select[max-page-size]").serialize();themeInteraction.fetchPage(request_ctrl+request_action,data)});$("select[max-page-size]").change(function(){if(this.value==""){return false}var data=$(this).serialize()+"&"+$("select[credit-filter]").serialize();themeInteraction.fetchPage(request_ctrl+request_action,data)});$(".pagination-container li a").click(function(){var _this=$(this);if(_this.parent().hasClass("disabled")){return}var pageNum=_this.attr("data-page");if(!pageNum){return}var add_data=$("select[max-page-size]").serialize()||"";var total_results=$("#total_results").val();if(total_results!==undefined){add_data=add_data+"&num_results="+total_results}add_data+="&"+document.getElementById("sort_params").value;add_data+="&"+$("select[credit-filter]").serialize()||"";themeInteraction.fetchPage(request_ctrl+request_action,"page="+pageNum+"&"+add_data)});$("#export-excel").click(function(){var data=$("select[credit-filter]").serialize();window.open(exportExcelUrl+"?"+data,"_blank")});$("a[sort-title]").click(function(){var _this=$(this);var data=$("select[credit-filter]").serialize();var sortParams="so="+_this.attr("sort-title");if(_this.hasClass("table-sort-asc")){_this.removeClass("table-sort").removeClass("table-sort-asc").addClass("table-sort-desc");sortParams+="&sot=DESC"}else{_this.removeClass("table-sort").removeClass("table-sort-desc").addClass("table-sort-asc");sortParams+="&sot=ASC"}document.getElementById("sort_params").value=sortParams;data+="&"+sortParams+"&"+$("select[max-page-size]");themeInteraction.fetchPage(request_ctrl+request_action,data)})}};