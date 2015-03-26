var eventCarousel = null;
var Calendar = {
	TITLE : 'title',
	TITLE_CONST : 'Event Title..',
	PLACE : 'place',
	NOT_ORGANIZER : 'not_organizer',
	ORGANIZER : 'organizer',
	GROUPS : 'groups[]',
	TARGET_GROUP :'target_group',
	YES_REMIND :'yes_remind',
	YES_NOTIFY :'yes_notify',
	POST_NOTICE : 'post_notice',
	SEND_EMAIL : 'send_email',
	SMS_REMINDER :'sms_reminder',
	EMAIL_REMINDER :'email_reminder',
	START_TIME_MONTH_ID :'start_time_Month_ID',
	START_TIME_DAY_ID :'start_time_Day_ID',
	START_TIME_YEAR_ID :'start_time_Year_ID',
	END_TIME_MONTH_ID :'end_time_Month_ID',
	END_TIME_DAY_ID :'end_time_Day_ID',
	END_TIME_YEAR_ID :'end_time_Year_ID',
	START_TIME_HOUR :'start_time_hour',
	END_TIME_HOUR :'end_time_hour',
	SMS_MONTH_ID :'sms_Month_ID',
	SMS_DAY_ID :'sms_Day_ID',
	SMS_YEAR_ID :'sms_Year_ID',
	SMS_MONTH_ID :'sms_Month_ID',
	SMS_DAY_ID :'sms_Day_ID',
	SMS_YEAR_ID :'sms_Year_ID',
	SMS_HOUR :'sms_hour',
	EMAIL_MONTH_ID :'email_Month_ID',
	EMAIL_DAY_ID :'email_Day_ID',
	EMAIL_YEAR_ID :'email_Year_ID',
	EMAIL_MONTH_ID :'email_Month_ID',
	EMAIL_DAY_ID :'email_Day_ID',
	EMAIL_YEAR_ID :'email_Year_ID',
	EMAIL_HOUR :'email_hour',
	EMAIL :'email',
	SMS :'sms',
	SMS_REMINDER : 'sms_reminder',
	EMAIL_REMINDER : 'email_reminder',
	TEXT_AREA_ID : 'description',
	TEXT_AREA_LENGTH : '',
	SMS_NOTIF_START_HOUR : '',
	SMS_NOTIF_END_HOUR : '',
	IS_ADMIN : 'is_admin',
	
	//DEFAULT_TEXT : {'title' : 'Title of the Event ...', 'organizer' : 'Organizer Details ...', 'venue' : 'Event Venue ...'},
	
	init : function() {
		$('events_container').observe('click',function(event){
			if(event.target.className === 'btn_event_rsvp'){
				var elem = event.target;
				var eventId =$(elem).readAttribute('data-eventid');
				var status;
				if($(elem).innerHTML == "I am Attending"){
					status = "yes";
				}
				else if($(elem).innerHTML == "You are attending"){
					status = "no";
				}
				Calendar.eventRsvp(elem,eventId,status);
			}
			else if(event.target.className == 'event_rsvp_list'){
				var elem = event.target;
				$('popupBg').setStyle({display: 'block'});
				Calendar.loadRsvpListPopup(elem);
			}
		});
		$('rsvp-list-popup').observe('click',function(event){
			if(event.target.className === 'close_popup'){
				$('popupBg').setStyle({display: 'none'});
				$('rsvp_list_popup').setStyle({display : 'none'});
			}
		});
	},

	toggleDefaultText: function(obj, expected_txt){
		
		var txt = obj.value;
		//var expected_txt = this.DEFAULT_TEXT[field];
		
		if(txt == '')
		{
			obj.value = expected_txt;	
		}
		else if(txt == expected_txt)
		{
			obj.value = '';
		}		
	},
	
	showTimeOptions: function(from, to ,select, parentElement) {

		return_string = "";   
		for (i =Number (from); i <=Number (to); i++) 
		{
			if (i <0 || i > 24) 
				exit;
	              
			if (i == 12) 
			{
			   display = "12 Noon";                  
			} 
			else if (i == 0 || i == 24) 
			{
			   display = "12 Midnight";
			}
			else if (i > 12) 
			{      
			      display = i - 12;
			      display = display + ":00 PM";
			}  
			else  
			{
			      display = i + ":00 AM";
			}
			if(select == i)
			{
				return_string += "<option value='"+i+"' selected>"+display+"</option>";	
			}
			else
			{
				return_string += "<option value='"+i+"'>"+display+"</option>";
			}    
			
	  }  
		
	  if(parentElement != undefined) {
		  parentElement.update(return_string); 
	  } else {
		  document.write(return_string);
	  }
	},

	showTimeOptionsWithNull: function(from, to ,select, parentElement) {

		return_string = "";   
		for (i =Number (from); i <=Number (to); i++) 
		{
			if (i <0 || i > 24) 
				exit;
	              
			if (i == 12) 
			{
			   display = "12 Noon";                  
			} 
			else if (i == 0 || i == 24) 
			{
			   display = "12 Midnight";
			}
			else if (i > 12) 
			{      
			      display = i - 12;
			      display = display + ":00 PM";
			}  
			else  
			{
			      display = i + ":00 AM";
			}
			if(select == i)
			{
				return_string += "<option value='"+i+"' selected>"+display+"</option>";	
			}
			else
			{
				return_string += "<option value='"+i+"'>"+display+"</option>";
			}    
			
	  }  

	  return_string += "<option value='Nil' selected>Select</option>";

	  if(parentElement != undefined) {
		  parentElement.update(return_string); 
	  } else {
		  document.write(return_string);
	  }
	},

	hideElement: function(id) {
		$(id).hide();
	},
	showElement: function(id) {
		$(id).show();
	},
	formValidator: function() {
		if(trim($(this.TITLE).value)=='' || $(this.TITLE).value == this.TITLE_CONST) {
			$('title_error').innerHTML = 'Please enter a Title for the Event.';
			$('title_error_main').show();
			return false;
		}else if($(this.TITLE).value.length > 200) {
			$('title_error').innerHTML = 'Title cannot be more than 200 characters.';
			$('title_error_main').show();
			return false;
			
		}else {
			$('title_error_main').hide();
		}
		
		if($(this.TEXT_AREA_ID).value.length > this.TEXT_AREA_LENGTH) {
			$('description_error').innerHTML = 'Event description can not be more than '+this.TEXT_AREA_LENGTH+' characters.';
			$('description_error_main').show();
			return false;
		}else {
			$('description_error_main').hide();
		}

		if($(this.NOT_ORGANIZER).checked) {
			if(trim($(this.ORGANIZER).value) == '') {
				$('organizer_error').innerHTML = 'Please enter the organizer name';
				$('organizer_error_main').show();
				$('help_block').hide();
				return false;
			}else if($(this.ORGANIZER).value.length > 40) {
				$('organizer_error').innerHTML = 'Organizer name cannot be more than 40 characters';
				$('organizer_error_main').show();
				$('help_block').hide();
				$('organizer').value = '';
				return false;
			}else {
				$('organizer_error_main').hide();
			}
		}
		
		if($(this.PLACE).value.length > 200 ) {
			$('venue_error').innerHTML = 'Venue cannot be more than 200 characters.';
			$('venue_error_main').show();
			return false;
		}else {
			$('venue_error_main').hide();
		}
		
		
		if($(this.TARGET_GROUP)) {
			if($(this.TARGET_GROUP).checked) {
			
				if(!this.CheckFormElements(this.GROUPS)) {
					$("groups_error").innerHTML = 'Please select atleast one group';
					$("groups_error_main").show();
					return false;
				}else {
					$("groups_error_main").hide();
				}
			}
		}
		

		return true;
	},
	
	CheckFormElements: function(name)
	{
		var elements = new Array();
		elements = document.getElementsByName(name);
		var checked_flag = false;
		for(var i = 0; i<elements.length; i = i+1)
		{
			var element = document.getElementsByName(name).item(i);
			if(element.type == "checkbox")
			{
				if(element.checked == true)
				{
					return true;
				}
			}	
		}
		return false;
	},
	
	validateTextAreaCharsLength: function(){
		var length = $(this.TEXT_AREA_ID).value.length;
		if(length > $(this.TEXT_AREA_LENGTH)){
			
			return false;
		}
		return true;
	},
	
	validateEventTime: function()
	{
		var start_year = $(this.START_TIME_YEAR_ID).value;
		var start_month = $(this.START_TIME_MONTH_ID).value;
		var start_day = $(this.START_TIME_DAY_ID).value;
		var end_year = $(this.END_TIME_YEAR_ID).value;
		var end_month = $(this.END_TIME_MONTH_ID).value;
		var end_day = $(this.END_TIME_DAY_ID).value;
		var start_hour = $(this.START_TIME_HOUR).value;
		var end_hour = $(this.END_TIME_HOUR).value;
		var start_date=new Date(start_year, start_month, start_day, start_hour);
		//start_date.setFullYear(start_year,start_month,start_day);
		var end_date=new Date(end_year, end_month, end_day, end_hour);
		//end_date.setFullYear(end_year,end_month,end_day);
		var current_date=new Date();
		//var current_hour = current_date.getHours();

		if(!this.compareDates(current_date.getTime(),start_date.getTime()))
		{
			alert("Start time should be greater than current time. Please provide correct start time");
			return false;
		}
		if(!this.compareDates(start_date.getTime(),end_date.getTime()))
		{
			alert('Start time should be less than the end time. Please provide correct timing options.');
			return false;
		}
		return true;
	},
	compareDates: function(first_date,last_date)
	{
		if(last_date > first_date)
		{
			return true;
		}
		else 
		{	
			return false;
		}
	},
	validateRemindTime: function(type)
	{
		if(type == this.SMS)
		{
			var month = $(this.SMS_MONTH_ID).value;
			var year = $(this.SMS_YEAR_ID).value;
			var day = $(this.SMS_DAY_ID).value;
			var scheduled_hour = $(this.SMS_HOUR).value;
			
			if(scheduled_hour < this.SMS_NOTIF_START_HOUR){
				alert('SMS notification hour should be greater than 7 a.m. and less than 10 p.m. Please provide correct sms notification hour.');
				return false;
			}
			
			if(scheduled_hour > this.SMS_NOTIF_END_HOUR){
				alert('SMS notification hour should be greater than 7 a.m. and less than 10 p.m. Please provide correct sms notification hour.');
				return false;
			}
	
		}
		else if(type == this.EMAIL)
		{
			var month = $(this.EMAIL_MONTH_ID).value;
			var year = $(this.EMAIL_YEAR_ID).value;
			var day = $(this.EMAIL_DAY_ID).value;
			var scheduled_hour = $(this.EMAIL_HOUR).value;
		}
		else
		{
			alert('Please provide correct remind time options.');
			return false;
		}
		var scheduled_date=new Date(year, month, day, scheduled_hour);
		//scheduled_date.setFullYear(year,month,day);
		var current_date=new Date();
		//var current_hour = current_date.getHours();
		var end_year = $(this.END_TIME_YEAR_ID).value;
		var end_month = $(this.END_TIME_MONTH_ID).value;
		var end_day = $(this.END_TIME_DAY_ID).value;
		var end_hour = $(this.END_TIME_HOUR).value;
	
		var end_date=new Date(end_year, end_month, end_day, end_hour);
		//end_date.setFullYear(end_year,end_month,end_day);
		
		if(this.compareDates(scheduled_date.getTime(),end_date.getTime()) && this.compareDates(current_date.getTime(),scheduled_date.getTime()))
		{
			return true;
		}
		else
		{	
			if(type == this.SMS){
				alert('Incorrect SMS remind time. It should be greater than the current time and less than the end time of the event. So please provide correct SMS remind time.');
			}
			else if(type == this.EMAIL){
				alert('Incorrect EMAIL remind time. It should be greater than the current time and less than the end time of the event. So please provide correct EMAIL remind time.');
			}
			return false;
		}
	},	
	
	deleteEvent: function(event_id, title, notice_id) {
	
	params = 'event_id='+event_id;
	
	if(title == undefined && title != null && title != ''){
		title = 'this';
	} else{
		title = '[ ' + (unescape(title)).replace(/\+/g, " ") + ' ]';
	}
	if(confirm("Are you sure you want to delete " + title + " event") == false){
		return;
	}
	if(notice_id != undefined && notice_id != null && notice_id != ''){
		if(confirm('There exists a notice corresponding to this event at your apartment level. Do you want to remove that notice also.')){
			params = params + '&' + 'notice_id=' + notice_id;
		}
	}
		
		var url = '/calendar/delete';
		
		new Ajax.Request(url,
		  {
			method:'post',
			parameters: params,
			onSuccess: function(transport){
				var outcome = transport.responseText;
				window.location.href = '/calendar';
			},
			onFailure: function(transport){
				var outcome = transport.responseText;
				parent.$('flashmsg').innerHTML = outcome;
				parent.$('flashmsg').show();
			}			
		  });

	},
	
	searchDayWiseEvents: function(date) {
		
//		$('search_results_div').style.display = 'block';
//		$('status_message').innerHTML = '';
		if($('date_new_val')){
                    $('date_new_val').value = date;
                }
		var url='/calendar/search-results';
		
		new Ajax.Request(url,
		  {
			method:'post',
			parameters: 'date='+date + '&' + 'search_type=' + 'day',
			onSuccess: function(transport){
				var outcome = transport.responseText;
				
				var text = '<a href="javascript:void(0);" class="carousel-control previous_button prev" rel="prev"></a>';
				text += '<div class="container" id="carousel-wrapper"><ul id="events_date_search">';
				text += outcome;
				text += '</ul></div><a href="javascript:void(0);" class="carousel-control next_button next" rel="next"></a>';
				
				$('events_container').innerHTML = text;
				
				$("event_count").innerHTML =  $("count").innerHTML;
				$("month_carousel").innerHTML =  $("month").innerHTML;
				$("date_carousel").innerHTML =  $("date").innerHTML;
				var slides = new Array();
				
				if ($$('#events_date_search .slide') != '') {
					slides = $$('#events_date_search .slide');
				}
	
				eventCarousel = null;
					eventCarousel = new Carousel('carousel-wrapper', slides, $$('a.carousel-control'), {
	                     duration: 0.75,
	                     effect: 'scroll',
	                     circular: false,
	                     wheel: false,
	                     auto: false,
	                     visibleSlides: 1
	                 });
					eventCarousel.moveTo(eventCarousel.slides[0]);
			},
			onFailure: function(transport){
//				var outcome = transport.responseText;
//				$('status_message').innerHTML = 'Internal Error';
			}			
		  });

	},

	eventRsvpProcess : function(elem, status)
	{
		$(elem).setAttribute("disabled",true);
		setTimeout(function(){ $(elem).removeAttribute("disabled") }, 5000);
		if(status == 'yes'){
			$(elem).innerHTML = "You are attending";
			$(elem).setAttribute("title","Not Attending? Press again");
			$(elem).setStyle({color : 'white',backgroundColor : '#15608f',borderColor : '#196fa5'});
		}
		else if(status == 'no'){
			$(elem).innerHTML = "I am Attending";
			$(elem).setAttribute("title","RSVP to confirm that you are attending this event");
			$(elem).setStyle({color :'buttontext',backgroundColor : 'buttonface',borderColor : 'buttonface'});	
		}
	},

	eventRsvp : function(elem,eventId, status)
	{
		var url ="/calendar/event-rsvp";

		new Ajax.Request(url,
		{
			method:'POST',
			parameters: 'eventId='+eventId+ '&' +'status='+status,
			onSuccess : function(transport){
				var result = transport.responseText;
				if(result == true){
					Calendar.eventRsvpProcess(elem,status);
				}	
			},
			onFailure: function(transport){
				 alert('Something went wrong. Try after sometime.');
			}
		});
	},

	loadRsvpListPopup: function(elem){
		var eventId = $(elem).readAttribute("data-event-id");
		var url = "/calendar/rsvp-list";
		
		new Ajax.Request(url,
		{
			method : 'POST',
			parameters : 'eventId='+eventId,
			onSuccess: function(transport){
				var result = transport.responseText;
				if(result){
					$('rsvp_list_popup').update(result);
					$('rsvp_list_popup').setStyle({display :'block'});
				}
				else{
					$('popupBg').setStyle({display: 'none'});
					$('rsvp_list_popup').setStyle({display : 'none'});
					alert('No body RSVPed this event till now.');
				}	
			},
			onFailure: function(transport){
				 alert('Something went wrong. Try after sometime.');
			}
		});
	},

	showEventInfoBox: function(eventId)
	{
		var url = '/calendar/details-popup';
		
		new Ajax.Request(url,
				  {
					method:'GET',
					parameters: {id:eventId},
					onSuccess: function(transport){
						messageObj.setHtmlContent(transport.responseText);
						messageObj.setSize(500,325);
						messageObj.setCssClassMessageBox(false);
						messageObj.setSource(false);	// no html source since we want to use a static message here.
						messageObj.setShadowDivVisible(true);	// Disable shadow for these boxes	
						messageObj.display();
						register_contact_view(vendor_id);
	}
				  });
				
				messageObj.setHtmlContent("<div align='center'><strong>loading..</strong></div>");
				messageObj.setSize(150,40);
				messageObj.setCssClassMessageBox(false);
				messageObj.setSource(false);	// no html source since we want to use a static message here.
				messageObj.setShadowDivVisible(true);	// Disable shadow for these boxes	
				messageObj.display();
}
};
