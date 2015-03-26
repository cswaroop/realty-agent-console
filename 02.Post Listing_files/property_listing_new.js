var PropertyListingNew = {
		Status : true,
		FocusVariable : "",
		FormValidation :false,
		ConsoleRequest : false,
		SaveAndFinishLater : false,
		MultipleClick : false,
                TotalEmodels : 20,
                AddedEmodels : 1,
                IsConsoleUserAllowed : false,
		validateName : function(name) {

			if (!Validator.isValidName(name.value, true)) {
				$('name_error').className="showerror";
				this.FocusVariable = name;
				return false;
			}
			$('name_error').className = "hideerror";
			return true;
		},

		validateEmail : function(email_id) {

			if (!Validator.isValidEmailId(email_id.value)) {
				$('email_error').className="showerror";
				this.FocusVariable = email_id;
				return false;
			}
			$('email_error').className = "hideerror";
			return true;
		},

		validateContactMobile : function(number,country_code) {
			if ($('mobile_verified')) {
				$('mobile_verified').hide();
			}

			if (!Validator.isValidMobileNumber(number.value,country_code.value)) {
				$('mobile_error').className="showerror";
				this.FocusVariable = number;
				return false;
			}
			$('mobile_error').className = "hideerror";
			if (country_code.value == "91") {
				this.checkMobileVerificationStatus(number, $('email'));
			}
			return true;
		},

		validateContactNumber : function(number,country_code) {

			if (number.value && !Validator.isValidMobileNumber(number.value,country_code.value)) {
				$('contact_no_error').className="showerror";
				this.FocusVariable = number;
				return false;
			}
			$('contact_no_error').className = "hideerror";
			return true;
		},

		/*
		 * @param intent : its element name
		 */
		validateListingIntent : function(intent) {
			intent = $('property_basic_details_form').getInputs('radio', intent);
			if (intent[0].checked || intent[1].checked) {
				$('listing_intent_error').className="hideerror";
				return true;
			}
			
			if($('right_time_to_call_start_hour')) {
				this.FocusVariable = $('right_time_to_call_start_hour');
			}
			$('listing_intent_error').className="showerror";
			return false;

		},
                
         /*
		 * @param intent : its element name
		 */
		validateSearchListingIntent : function(intent) {
			intent = $('property_basic_details_form').getInputs('radio', intent);
			if (intent[0].checked || intent[1].checked) {
				$('search_listing_intent_error').className="hideerror";
				return true;
			}
			
			
			$('search_listing_intent_error').className="showerror";
            this.FocusVariable = $('sale_intent_resale');
			return false;

		},
                
		/*
		 * @param property : its element name
		 */
		validatePropertyType : function(property_type) {

			var roomDetailStatus = true;
			var isPropertyTypeChecked = false;
			property_type = $('property_basic_details_form').getInputs('radio', property_type);
			for(var count =0;count<property_type.length;count++){
				if(property_type[count].checked){
					isPropertyTypeChecked = true;
					break;
				}
			}
			if (this.FormValidation && isPropertyTypeChecked && !$('plot').checked ) {
				if ($('no_of_bath_rooms_select').visible()) {
					this.Status = roomDetailStatus = this.validateBathrooms($('no_of_bath_rooms_select')) && this.Status;
				} else {
					this.Status = roomDetailStatus = this.validateBathrooms($('no_of_bath_rooms_input')) && this.Status;
				}
				
				if ($('no_of_bed_rooms_select').visible()) {
					this.Status = roomDetailStatus = this.validateNumBedrooms($('no_of_bed_rooms_select')) && roomDetailStatus && this.Status;
				} else {
					this.Status = roomDetailStatus = this.validateNumBedrooms($('no_of_bed_rooms_input')) && roomDetailStatus && this.Status;
				}
			}
			

			if (isPropertyTypeChecked) {
				$('property_type_error').className="hideerror";
				return roomDetailStatus;
			}
			
			if($('right_time_to_call_start_hour')) {
				this.FocusVariable = $('right_time_to_call_start_hour');
			}
			$('property_type_error').className="showerror";
			return false;
		},

		validateCity : function(city) {
			if (city.value == '') {
				$('city_error').className="showerror";
				this.FocusVariable = city;
				return false;
			}
			$('city_error').className="hideerror";
			return true;
		},

		validateProjectName : function(project_name) {
			if (project_name.value == '') {
                                $('project_error_tt').innerHTML = "Please select project name for your property";
				$('project_name_error').className = "showerror";
				this.FocusVariable = project_name;
				return false;
			}
                        if(this.IsConsoleUserAllowed &&
                                $('property_id').value == '')
                                /*
                                ($('sel_proj_locality').value == '' 
                                || ($('new_sel_proj_locality').value == "none" && project_name.value != $('tmp_project_name').value)))*/
                        {
                            $('project_picked').show();
                            project_validity = $('property_basic_details_form').getInputs('radio', 'project_validity');
                            if($('listing_state') && $('listing_state').value == "active" && !project_validity[0].checked && !project_validity[1].checked)
                            {
                                $('project_error_tt').innerHTML = "Please select Project State";
                                $('project_name_error').className = "showerror";
                                this.FocusVariable = project_name;
                                return false;
                            }
                            else
                            {
                                $('project_name_error').className = "hideerror";
                            }
                        }
			$('project_name_error').className = "hideerror";
			return true;
		},

		validateAreaName : function(area_name) {
                            this.FocusVariable = null;
                            if (area_name.value == '') {
                                    $('locality_name_tt').innerHTML = "Please select locality name for your property";
                                    $('area_name_error').className = "showerror";
                                    this.FocusVariable = area_name;
                                    return false;
                            }
                        
                        if(this.IsConsoleUserAllowed && 
                                ($('area_id').value == '' || $('area_id').value == "0"))
                            /*$('listing_state').value == "active" &&
                                ($('sel_proj_locality').value == '' 
                                || ($('new_sel_proj_locality').value == "none" && project_name.value != $('tmp_project_name').value)))*/
                        {
                            $('locality_not_picked').show();
                            area_validity = $('property_basic_details_form').getInputs('radio', 'area_validity');
                            if($('listing_state') && $('listing_state').value == "active" )
                            {
                                if(!area_validity[0].checked)
                                {
                                    
                                    $('locality_name_tt').innerHTML = "Please enter locality state";
                                    $('area_name_error').className = "showerror";
                                    this.FocusVariable = area_name;
                                    return false;
                                }
                                else
                                {
                                    /*Make State Incomplete Under Review
                                    $('listing_state_error').className = "showerror";
                                    this.FocusVariable = $('listing_state');
                                    return false;*/
                                }
                            }
                            else
                            {
                                $('area_name_error').className = "hideerror";
                            }
                        }
			$('area_name_error').className = "hideerror";
			return true;
		},

		validateUploadedPropertyImages:function() {
			var image_uploaded_before = (document.getElementById('property_image_count'));
			if(image_uploaded_before == null)
				image_uploaded_before = "0";
			else
				image_uploaded_before = image_uploaded_before.innerHTML;
			var images_uploaded_file = document.getElementsByName('image_ids[]');
			var images_uploaded_file_length = images_uploaded_file.length;
			var current_image_count =0 ;
			for(var i=0 ; i < images_uploaded_file_length ; i++)
				{
				if(images_uploaded_file[i].value != "")
					current_image_count++;
				}
			if(this.IsConsoleUserAllowed && $('listing_state').value == "active" && ((parseInt(current_image_count) + parseInt(image_uploaded_before)) <= 3))
				{
				return false;
				}
			return true;
			},

		validatePropertyAddress : function(property_address) {
			var propertyAddress = trim(property_address.value);


			var replaced = propertyAddress.split(' ').join('');

			if (propertyAddress == false  || !isNaN(replaced) || Validator.isDecimal(propertyAddress) || Validator.isNumeric(propertyAddress)) {

				$('property_address_error').className = "showerror";
				this.FocusVariable = property_address;
				return false;
			}

			$('property_address_error').className = "hideerror";
			return true;
		},

		validateBlock : function(block) {
			if (block.value == '') {
				$('block_error').className = "showerror";
				this.FocusVariable = block;
				return false;
			}

			$('block_error').className = "hideerror";
			return true;
		},

		validateNumBedrooms : function(bedrooms) {

			if(bedrooms.value.match(/^\d+\+$/) == bedrooms.value) {
				PropertyListingNew.handleMoreOrOther($('no_of_bed_rooms_select'),$('no_of_bed_rooms_input'));
			}else{

				if ( (!Validator.isDecimal(bedrooms.value) && !Validator.isNumeric(bedrooms.value)) ||
					bedrooms.value == 0) {
					$('bedrooms_error').className="showerror";
					this.FocusVariable = bedrooms;
					return false;
				}
				$('bedrooms_error').className="hideerror";
					return true;
			}
		},
                
                validatePropertyAge : function(age) {
                        if(age.value == 'u_c'){
                            $('propertyAge_error').className="hideerror";
                            return true;
                        }else if(age.value == ''){
                            return true;
                        }
                        currentYear  = new Date().getFullYear();
			if (!Validator.isNumeric(age.value) ||
					age.value == 0 || age.value < 1800 || age.value>currentYear) {
				$('propertyAge_error').className="showerror";
				this.FocusVariable = age;
				return false;
			}
			$('propertyAge_error').className="hideerror";
                        return true;
		},

		validateBathrooms : function(bathrooms) {
			if (!Validator.isNumeric(bathrooms.value) ||
					bathrooms.value == 0) {
				$('bathrooms_error').className="showerror";
				this.FocusVariable = bathrooms;
				return false;
			}
			$('bathrooms_error').className="hideerror";
			return true;
		},
		
		validateBalcony : function(balcony) {
			if (!Validator.isNumeric(balcony.value)) {
				$('balcony_error').className="showerror";
				this.FocusVariable = balcony;
				return false;
			}
			$('balcony_error').className="hideerror";
			return true;
		},

		validatePrice : function(price, prefix) {
			if (!prefix) {
				prefix = "";
			}
			$(prefix + 'property_inr_error').className = "hideerror";
			if($('sale_intent').checked == true) {
				$('price_error_message').innerHTML = "Please select sale price <br/> for property";
			} else {
				$('price_error_message').innerHTML = "Please select monthly rent <br/> for property";
			}
			if (price.value == 0 || !Validator.isNumeric(price.value)) {
				$(prefix + 'property_inr_error').className = "showerror";
				this.FocusVariable = price;
				return false;
			}
			
			return true;
		},

		validateFeature : function(feature) {
			if (feature.value == '') {
				$('features_error').className = "showerror";
				this.FocusVariable = feature;
				return false;
			}
			$('features_error').className = "hideerror";
			return true;
		},

		validatePropertyOwnershipType : function(ownershipType) {

			if (ownershipType.value == '') {

				$('ownership_error').className = "showerror";
				this.FocusVariable = ownershipType;
				return false;
			}

			$('ownership_error').className = "hideerror";
			return true;
		},
		validateAreaSqft : function(sqftId, isMandatory){

			if(isMandatory == undefined) {
				isMandatory = 0;
			}
			if ((isMandatory || sqftId.value !='') && (sqftId.value == 0 || (!Validator.isDecimal(sqftId.value) && !Validator.isNumeric(sqftId.value)))) {
				$(sqftId.name+'error').className="showerror";
				this.FocusVariable = sqftId;
				return false;
			}
			$(sqftId.name+'error').className="hideerror";
			return true;	
		},
		validateParking:function(elementName){
			var allElements = document.getElementsByName(elementName); 
			var isChecked = false;
			var focusVariable = '';
        	for(var count=0; count<allElements.length;count++){
        		if(allElements[count].checked == true) {
        			isChecked = true;
        			break;
        			
        		}
        		focusVariable = allElements[count];
        		
        	}
        	if(isChecked == true) {
        		return isChecked;
        	}
        	PropertyListingNew.FocusVariable = focusVariable;
        	$(elementName+'_error').className="showerror";

			return false;
        
		},
		validateAllParking:function(){
			var status = true;
			var isTwoParkingChecked = false;
			var twoParking = document.getElementsByName("parking");
			for(var i =0;i<twoParking.length;i++){
				if(twoParking[i].checked == true && twoParking[i].value=='yes' )
				{
					isTwoParkingChecked = true;
				}
			}
			var isFourParkingChecked = false;
			var fourParking = document.getElementsByName("four_parking");
			for(var i =0;i<fourParking.length;i++){
				if(fourParking[i].checked == true && fourParking[i].value=='yes' )
				{
					isFourParkingChecked = true;
				}
			}
			if(isTwoParkingChecked) {
				status = PropertyListingNew.validateParking("two_wheeler_parking") && status;
			}
			if(isFourParkingChecked) {
				status = PropertyListingNew.validateParking("four_wheeler_parking") && status;
			}
			return status;
		},
                validatePropertyEmodelsAddMore : function() {
                    var status = true;
                    if(this.IsConsoleUserAllowed)
                        {
                            var t= document.getElementsByName("total_emodel");
                            var total = parseInt(t[0].value);
                            if(total+this.AddedEmodels >= this.TotalEmodels)
                            {
                                alert("You can not add more EModels, MAX LIMIT: 20");
                                status = false;
                            }
                            else
                            {
                                var urlList = document.getElementsByName("emodel_url[]");
                                for(var i =0; i<urlList.length; i++)
                                {
                                    if(!urlList[i].value.trim())
                                    {
                                        alert("URL Field is Empty, Please Enter url for Emodels");
                                        status = false;
                                        break;
                                    }
                                    for(var j = i+1; j<urlList.length; j++)
                                    {
                                        if(urlList[j].value == urlList[i].value)
                                        {
                                            alert("Please Enter unique urls for Emodels");
                                            status = false;
                                            break;
                                        }
                                    }
                                    if(status == false)
                                        break;
                                }
                                if(status == true)
                                    this.AddedEmodels ++;
                            }
                        }
                        return status;
                },
                validatePropertyEmodels : function() {
                        var status = true;
                        if(this.IsConsoleUserAllowed)
                        {
                            var urlList = document.getElementsByName("emodel_url[]");
                            for(var i =0; i<urlList.length; i++)
                            {
                                for(var j = i+1; j<urlList.length; j++)
                                {
                                    if(urlList[i].value.trim() && urlList[j].value == urlList[i].value)
                                    {
                                        alert("Please Enter unique urls for Emodels");
                                        status = false;
                                        break;
                                    }
                                }
                                if(status == false)
                                    break;
                            }
                    }
                        return status;
		},
		validateBasicForm : function() {

			this.FormValidation = true;
			this.Status = true;
			this.Status = this.validateFeature($('features')) && this.Status;
			
			if ($('rent_intent').checked == true) {
				this.Status = this.validatePrice($('deposit_price'),'deposit_') && this.Status;
				this.Status = this.validatePrice($('price')) && this.Status;
			} else if ($('sale_intent').checked == true) {
				this.Status = this.validatePrice($('price')) && this.Status;
			}
                        if (!($('terms_conditions').checked)) {
                                    alert("Please agree to our Terms of Use and Privacy Policy to post your listing");
                                this.FocusVariable = $('terms_conditions');
                                this.Status = false;
			} 
            property_type = $('property_basic_details_form').getInputs('radio', 'unit_type');
            
			this.Status = this.validatePropertyAddress($('property_address')) && this.Status;
			this.Status = this.validateAreaName($('area')) && this.Status;
			
			property_type = $('property_basic_details_form').getInputs('radio', 'unit_type');
			if(!$('house').checked && !$('plot').checked && !$('farmhouse').checked) {
				this.Status = this.validateProjectName($('project_name')) && this.Status;
			}
			
			this.Status = this.validateCity($('city')) && this.Status;
			//here we passing name of element
			this.Status = this.validateListingIntent('posted_for') && this.Status;
			if($('sale_intent').checked) {
                            this.Status = PropertyListingNew.validateSearchListingIntent('posted_for_sale') && this.Status;
			}
			this.Status = this.validatePropertyType('unit_type') && this.Status;
			
			this.Status = this.validateContactMobile($('mobile'),$('country_code')) && this.Status;
			//this.Status = this.validateContactNumber($('contact_number'),$('contact_no_country_code')) && this.Status;
			this.Status = this.validateEmail($('email')) && this.Status;
			this.Status = this.validatePropertyOwnershipType($("ownership_type")) && this.Status;
			this.Status = this.validateName($('name')) && this.Status;
			
			var sqftId;
			if($('plot').checked){
				sqftId = 'plot_area_field';
				
			}else{
				sqftId = 'builtup_area_field';
			}
			this.Status = this.validateAreaSqft($(sqftId),1) && this.Status;
			if($('builderfloor').checked || $('farmhouse').checked || $('penthouse').checked) {
				this.Status = this.validateAreaSqft($('open_area_field'),1) && this.Status;
			}
			this.FormValidation = false;
			try {
				if (this.FocusVariable) {
					this.FocusVariable.focus();
					this.FocusVariable = '';
				}
			} catch (Exception) {}

			if (!this.Status) {
				return false;
			}
			return true;
		},

		validateDocumentalForm : function () {
		
			this.Status = this.validatePrice($('price'),"") && this.Status;
	
			if($('deposit_price')) {
				this.Status = this.validatePrice($('deposit_price'),"deposit_") && this.Status;
			}
			
			if (this.FocusVariable) {
				this.FocusVariable.focus();
				this.FocusVariable = '';
			}
			
			if (!this.Status) {
				return false;
			}
			return true;
		},
		
		validateFloor : function(onFloor, onFloorError, totalFloor, totalFloorError) {
			var status = true;
			if (!Validator.isNumeric(onFloor.value) &&
					onFloor.value !="") {
				$(onFloorError).className="showerror";
				this.FocusVariable = onFloor;
				status = false;
			}

			if (!Validator.isNumeric(totalFloor.value) &&
					totalFloor.value !="") {
				$(totalFloorError).className="showerror";
				this.FocusVariable = totalFloor;
				status = false;
			}
			$('totalfloor_innerVal').hide();
			var tfloor = parseInt(totalFloor.value)?parseInt(totalFloor.value):-1,
					onfloor = parseInt(onFloor.value)?parseInt(onFloor.value):-1;
			if(tfloor < onfloor) {
				$(totalFloorError).className="showerror";
				if(tfloor != -1 && onfloor != -1) {
					$('totalfloor_innerVal').show();
				}
				if(totalFloor.style.display == "none") {
					if(totalFloor.id == "total_floors_input") {
						this.FocusVariable = $('total_floors_select');
					} else {
						this.FocusVariable = $('total_floors_input');
					}
				} else {
					this.FocusVariable = totalFloor;
				}
				status = false;
			}
			if(status) {
				$(onFloorError).className = "hideerror";
				$(totalFloorError).className = "hideerror";
			}
			return status;
		},
		
		handleRightTimeToCall : function(startTime,endTime) {
			
			
			var start = Number(startTime.value) + 1;
			var dateText = "<script type='text/javascript'>Calendar.showTimeOptions(" + start
				+" ,23,"+ start +",$('"+endTime+"'));</script>";
			$(endTime).update(dateText);
		},

		handleListingIntent : function(selected_element) {

			$('sale_intent_div').className="sale";
			$('rent_intent_div').className="rent";
			$(selected_element+'_intent_div').className=selected_element+"selected";
			$("price_option_div").show();
			$("deposit_amount_div").hide();
			$("deposit_price").disable();
			if (selected_element == "sale") {
				$$('select#hundred option')[0].selected = true;
				$('hundred_container').hide();$('crore_container').show();
                                $('heading_sale').show();
                                $('heading_rent').hide();
                                $('maintenance_charges_input').disable();
                                $('search_sale_intent').show();
                                $('sale_intent_resale').enable();
                                $('sale_intent_new').enable();
			} else {
				$$('select#crore option')[0].selected = true;
				$('crore_container').hide();$('hundred_container').show();
				$('deposit_amount_div').show();
				$('maintenance_charges_input').enable();
				$("deposit_price").enable();
                                $('heading_sale').hide();
                                $('heading_rent').show();
                                $('deposit_property_inr_error').className = "hideerror";
                                $('search_sale_intent').hide();
                                $('sale_intent_resale').disable();
                                $('sale_intent_new').disable();
                
			}
			$('property_inr_error').className = "hideerror";
			//here we passing name of element
			this.validateListingIntent('posted_for');
		},

		handleSelect : function(containerToSelect,containerToUnselect, unselectClassName) {
			containerToSelect.className = 'on_click_select';
			containerToUnselect.className = unselectClassName;
		},

		addMore : function(type, eleName, tagNames) {
			var newEleContainer = new Element("div");
			var elementsContainerName;
			var elementToAdd;
			var elementToAddContainer = new Element("div", {"class" : "float-l"});
			var deselectLinkContainer = new Element("div", {"class" : "float-l"});
			deselectLinkContainer.style.padding = "5px";
			var clearDiv = new Element("div", {"class" : "clear"});
			
			if (type == "loan") {
				elementsContainerName = 'loan_approvals_other_div';
				elementToAdd = new Element("input", {"type" : "text", "class" : "tinytextbox", "name" : eleName});
			} else if (type == "land") {
				elementsContainerName = 'land_approvals_other_div';
				elementToAdd = new Element("input", {"type" : "text", "class" : "tinytextbox", "name" : eleName});
			} else if (type == "service") {
				elementsContainerName = 'service_container';
				elementToAdd = new Element("div", {"class" : "servicesdetail"});
				elementToAdd.className = "servicesdetail";
				var newdate = new Date();
				var uniqid = newdate.getTime();
				var innerHTML = $('more_service_select_container').innerHTML;
				innerHTML = innerHTML.replace(/id_service_/g, ('id_service_' + uniqid + '_'));
				elementToAdd.update(innerHTML);
			} else if (type == "planimage") {
				if(this.ConsoleRequest) {
					elementsContainerName = 'plan_image_container';
				} else {
					elementsContainerName = 'image_container';
				}
				elementToAdd = new Element("div",{"class":"mrt10"});
				var newdate = new Date();
				var uniqid = newdate.getTime();
				newElementToAdd =  new Element("input",{"type":"file","class":"file_upload_ele",
					"id":"file_upload"+uniqid,"name":eleName});
				elementToAdd.appendChild(newElementToAdd);
				newElementToAdd =  new Element("span");
				newElementToAdd.innerHTML = "<b> &nbsp;&nbsp;&nbsp;About Floor Plan </b>";
				elementToAdd.appendChild(newElementToAdd);
				newElementToAdd =  new Element("input",{"type":"text","class":"smalltextbox mrl15",
					"name":"plan_info[]"});
				elementToAdd.appendChild(newElementToAdd);
				newElementToAdd =  new Element("input",{"type":"hidden","value":"floor",
					"name":"plan_type[]"});
				elementToAdd.appendChild(newElementToAdd);
			} else if (type == "locationmap") {
				elementsContainerName = 'image_container';
				elementToAdd = new Element("div",{"class":"mrt10"});
				var newdate = new Date();
				var uniqid = newdate.getTime();
				newElementToAdd =  new Element("input",{"type":"file","class":"file_upload_ele",
					"id":"file_upload"+uniqid,"name":eleName});
				elementToAdd.appendChild(newElementToAdd);
			} else if (type == "amenity") {
				elementsContainerName = "other_amenities_container";
				elementToAdd = new Element("input", {"type" : "text", "class" : "tinytextbox", "name" : eleName});
			} else if (type == "image") {
				
				if(this.ConsoleRequest) {
					elementsContainerName = 'console_image_container';
				} else {
					elementsContainerName = 'image_container';
				}
				elementToAdd = new Element("div",{"class":"mrt10"});
				var newdate = new Date();
				var uniqid = newdate.getTime();
				newElementToAdd =  new Element("input",{"type":"file","class":"file_upload_ele","name":"image_ids[]","id":"file_upload"+uniqid,"name":eleName});
				elementToAdd.appendChild(newElementToAdd);
                                
                        }
			else if (type == "emodel") {
                                if(this.ConsoleRequest) {
                                elementsContainerName = 'emodel_container';
                                elementToAdd = new Element("div",{"class":"mrt10"});
                                var newdate = new Date();
                                var uniqid = newdate.getTime();
                                var tagNames = eval('(' + tagNames + ')');
                                
                                newElementToAdd =  new Element("select",{"class":"mediumselectbox fl mrl15",
                                        "id":"uploademodel"+uniqid,"name":eleName});
                                newOptionToAdd = new Element("option",{"text":"E-Model","value":"emodel"});
                                newOptionToAdd.text = "E-Model";
                                newElementToAdd.appendChild(newOptionToAdd);
                                newOptionToAdd = new Element("option",{"text":"Video","value":"video"});
                                newOptionToAdd.text = "Video";
                                newElementToAdd.appendChild(newOptionToAdd);
                                newOptionToAdd = new Element("option",{"text":"Virtual Tour","value":"virtualtour"});
                                newOptionToAdd.text = "Virtual Tour";
                                newElementToAdd.appendChild(newOptionToAdd);
                                newOptionToAdd = new Element("option",{"text":"360 Degree View","value":"view360"});
                                newOptionToAdd.text = "360 Degree View";
                                newElementToAdd.appendChild(newOptionToAdd);
                                newOptionToAdd = new Element("option",{"text":"Aerial View","value":"aerialview"});
                                newOptionToAdd.text = "Aerial View";
                                newElementToAdd.appendChild(newOptionToAdd);
                                elementToAdd.appendChild(newElementToAdd);
                                if(tagNames != 'undefined')
                                {
                                    newElementToAdd =  new Element("select",{"class":"mediumselectbox fl mrl15","name":"emodel_tag[]"});
                                    newOptionToAdd = new Element("option");
                                    newOptionToAdd.text = "Tag";
                                    newElementToAdd.appendChild(newOptionToAdd);
                                    for(var i=0; i<tagNames.length; i++)
                                    {
                                        newOptionToAdd = new Element("option");
                                        newOptionToAdd.text = tagNames[i];
                                        newElementToAdd.appendChild(newOptionToAdd);
                                    }
                                }
                                elementToAdd.appendChild(newElementToAdd);
                                newElementToAdd =  new Element("span");
                                newElementToAdd.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                                elementToAdd.appendChild(newElementToAdd);
                                newElementToAdd =  new Element("input",{"type":"text","name":"emodel_url[]","class":"largetextbox"
                                    , "style":"width:250px"});
                                elementToAdd.appendChild(newElementToAdd);
                                var uniqid2 = newdate.getTime();
                                newElementToAdd =  new Element("span");
                                newElementToAdd.innerHTML = "&nbsp;&nbsp;";
                                elementToAdd.appendChild(newElementToAdd);
                                newElementToAdd =  new Element("input",{"type":"button","class":"smalltextbox mrl15",
                                         "value":"-", "id":"sequenceemodelbutton1",
                                        "onclick":"var a = document.getElementById('sequenceemodellabel'+"+uniqid2+"); if(parseInt(a.value)>1) a.value = parseInt(a.value)-1;"});
                                    //if(parseInt(document.getElementById('sequenceemodellabel'+uniqid2).value)>1) document.getElementById('sequenceemodellabel'+uniqid2).value = parseInt(document.getElementById('sequenceemodellabel'+uniqid2).value)--;
                                elementToAdd.appendChild(newElementToAdd);
                                
                                newElementToAdd =  new Element("input",{"type":"label","name":"emodel_sequence[]","value":"1"
                                    , "style":"width:25px", "readonly":"readonly","id":"sequenceemodellabel"+uniqid2});
                                elementToAdd.appendChild(newElementToAdd);
                                newElementToAdd =  new Element("input",{"type":"button","class":"smalltextbox mrl15",
                                        "value":"+", "id":"sequenceemodelbutton2",
                                        "onclick":"var a = document.getElementById('sequenceemodellabel'+"+uniqid2+"); if(parseInt(a.value)<20) a.value= parseInt(a.value)+1;"});
                                elementToAdd.appendChild(newElementToAdd);
                                newElementToAdd =  new Element("input",{"type":"hidden","value":"floor",
                                        "name":"plan_type[]"});
                                elementToAdd.appendChild(newElementToAdd);
                            }
                                //elementToAdd = new Element("input", {"type" : "text", "class" : "tinytextbox", "name" : eleName});
			}
			var childEls = $(elementsContainerName).childElements();
			var childElsCount = childEls.length;
			var eleId = elementsContainerName + (childElsCount + 1);
			elementToAdd.id = eleId;
			elementToAddContainer.appendChild(elementToAdd);
			
			var deselectLink = document.createElement('a');
			deselectLink.innerHTML = '[x]';
			deselectLink.setAttribute('href',"javascript:void(0)");
			deselectLink.onclick = function onclick(event) {$(eleId).parentNode.parentNode.parentNode.removeChild($(eleId).parentNode.parentNode);};
			deselectLinkContainer.appendChild(deselectLink);
			
			newEleContainer.appendChild(elementToAddContainer);
			newEleContainer.appendChild(deselectLinkContainer);
			newEleContainer.appendChild(clearDiv);
			
			$(elementsContainerName).insertBefore(newEleContainer, childEls[(childElsCount-1)]);
                        
		},
		
		handlePropertyType : function(selected_element) {
			
			$('apartment_div').className = "apartment";
			$('villa_div').className = "villa";
			$('house_div').className = "house";
			$('rowhouse_div').className = "rowhouse";
			$('plot_div').className = "plot";
			$('builderfloor_div').className = "builderfloor";
			$('farmhouse_div').className = "farmhouse";
			$('penthouse_div').className = "penthouse";
			$('serviceapartment_div').className = "serviceapartment";
			$('studioapartment_div').className = "studioapartment";

			var houseType = selected_element.split("_");
			$("maintenance_project").update(houseType[0]);
			if (selected_element == 'plot_div') {
				$('property_no').update("Survey No");
				$("room_details").hide();
				$("maintenance_div").hide();
				$("maintenance_charges_input").disable();
				$("plot_area").show();
				$("plot_area_error").show();
				$("builtup_area").hide();
				$("builtup_area_error").hide();
			} else {
				$('property_no').update("House No");
				$("room_details").show();
				$("maintenance_div").show();
				$("maintenance_charges_input").enable();
				$("plot_area").hide();
				$("builtup_area").show();
				$("plot_area_error").hide();
				$("builtup_area_error").show();

			}
			if(selected_element == 'builderfloor_div'
			 || selected_element == 'farmhouse_div' 
			 || selected_element == 'penthouse_div') {
			 	$('open_area').show();
			 	$('open_area_error').show();
			 	switch(selected_element) {
			 		case 'builderfloor_div':
			 			 $('open_area_text').update("Land Area");
			 			 break;
			 		case 'farmhouse_div':
			 			 $('open_area_text').update("Plot Area");
			 			 break;
			 		case 'penthouse_div':
			 			 $('open_area_text').update("Terrace  Area");
			 			 break;
			 	}

			}else{
				$('open_area').hide();
				$('open_area_error').hide();
			}

			if (selected_element == 'house_div'
					|| selected_element == 'plot_div' || selected_element == 'farmhouse_div') {
				$('block_container').hide();
			} else {
				$('block_container').show();
			}
			if(selected_element == 'studioapartment_div') {
				$('no_of_bed_rooms_select').value = 1;
				$('no_of_bath_rooms_select').value = 1;
				$('no_of_bed_rooms_select').setAttribute('disabled','disabled');
				$('no_of_bath_rooms_select').setAttribute('disabled','disabled');

			}else{
				$('no_of_bed_rooms_select').removeAttribute('disabled');
				$('no_of_bath_rooms_select').removeAttribute('disabled');
			}
			
			if (selected_element == 'house_div' || selected_element == 'farmhouse_div') {
				$('project_name_div').hide();
				$("property_id").value="";
				$("project_name").value="";
			} else {
				$('project_name_div').show();
				if(selected_element == 'plot_div') {
					$('project_name_require_div').className="heading";
					$('project_name').onblur = function onblur(event) {return;};
					
				} else {
					$('project_name_require_div').className="heading requiredfield";
					$('project_name').onblur = function onblur(event) {
							PropertyListingNew.validateProjectName($('project_name'));};
					
				}
			}
				
			$(selected_element).className = 'checked';

			//here we passing name of element
			this.validatePropertyType('unit_type');
		},

		handleFurnishType : function(selected_element) {

			$('unfurnished').className = "unfurnished";
			$('semifurnished').className = "semifurnished";
			$('fullyfurnished').className = "fullyfurnished";

			$(selected_element).className = 'checked';
		},

		handleElesSelect : function(selectedEle, idPrefix, noOfEles, checkedClassName, uncheckedClassName) {
			var i;
			for (i = 1; i <= noOfEles; i++) {
				$(idPrefix + i).className = (uncheckedClassName) ? uncheckedClassName : $(idPrefix + i).title;
			}
			selectedEle.className = (checkedClassName);
		},

		handleCheck : function(selectedEle, checkedClassName, uncheckedClassName, selectedInputEle) {
			if (selectedEle.className == checkedClassName) {
				selectedInputEle.checked=false;
				selectedEle.className = uncheckedClassName;
			} else {
				selectedInputEle.checked=true;
				selectedEle.className = checkedClassName;
			}
		},

		handleTwoWheelerParking : function(selected_element,isParkingTypeSelected) {

		//	$('is_two_wheeler_parking').checked = true;
			if(isParkingTypeSelected == 0) {
			if(selected_element.value =='no' || selected_element.value =='' ) {
			$('two_covered').hide();
			$('two_uncovered').hide();
			if($('image_heading_two_parking') != undefined) {
				$('image_heading_two_parking').hide();
			}
			// deselect two wheeler parking
			$("two_wheeler_uncovered").checked=false;
			$('two_wheeler_parking_error').className = "";
			
			$("two_wheeler_covered").checked=false;
			if($('twocovered')!=undefined) {
			$('twocovered').className = "twocovered";
			$('twouncovered').className = "twouncovered";
		}
			$('two_wheeler_not_available').checked = true;
			
			}else{
				$('two_covered').show();
				$('two_uncovered').show();	
					
				if($('image_heading_two_parking') != undefined) {
					$('image_heading_two_parking').show();
				}
				if($('twocovered')!=undefined) {
				$('twocovered').className = "twocovered";
				$('twouncovered').className = "twouncovered";
			}
				$('two_wheeler_not_available').checked = false;
				
			}
			}else{

				if($('twocovered')!=undefined) {
				$('twocovered').className = "twocovered";
				$('twouncovered').className = "twouncovered";
			}
				$('two_wheeler_parking_error').className = "";
				$(selected_element.id).className = 'checked';
			}
			
		},
		handleParkingYesSelect:function(elementName){
			$(elementName).checked=true;
			if(elementName == 'is_two_wheeler_parking') {
				$('two_wheeler_parking_error').className = "";
			}else{
				$('four_wheeler_parking_error').className = "";
			}
			
		},
		
		deSelectTwoWheelerParking : function() {

			$('twocovered').className = "twocovered";
			$('twouncovered').className = "twouncovered";
			$('two_wheeler_covered').checked=false;
			$('two_wheeler_uncovered').checked=false;
		},

		handleFourWheelerParking : function(selected_element,isParkingTypeSelected) {
			
			
//			$('is_two_wheeler_parking').checked = true;
			if(isParkingTypeSelected == 0) {
			if(selected_element.value =='no' || selected_element.value =='' ) {
			$('four_covered').hide();
			$('four_uncovered').hide();
			$('four_common').hide();
			
			if($('image_heading_four_parking') != undefined) {
				$('image_heading_four_parking').hide();
			}
			$('four_wheeler_parking_error').className = "";
			$('four_wheeler_not_available').checked = true;
			// deselect two wheeler parking
			$("four_wheeler_uncovered").checked=false;
			$("four_wheeler_covered").checked=false;
			if($('fourcovered')!=undefined) {
			$('fourcovered').className = "fourcovered";
			$('fouruncovered').className = "fouruncovered";
			$('fourcommon').className = "fourcommon";
		}
			
			}else{
				$('four_covered').show();
				$('four_uncovered').show();	
				$('four_common').show();
				$('four_wheeler_parking_error').className = "";
				if($('fourcovered')!=undefined) {
				$('fourcovered').className = "fourcovered";
				$('fouruncovered').className = "fouruncovered";
				$('fourcommon').className = "fourcommon";
			}
				if($('image_heading_four_parking') != undefined) {
					$('image_heading_four_parking').show();
				}
				$('four_wheeler_not_available').checked = false;
				
			}
			}else{
				if($('fourcovered')!=undefined) {
				$('fourcovered').className = "twocovered";
				$('fouruncovered').className = "fouruncovered";
				$('fourcommon').className = "fourcommon";
			}
				$('four_wheeler_parking_error').className = "";
				$(selected_element.id).className = 'checked';
				
			}
			
//			
//			
//
//			$('parking').checked = true;
//			$('fourcovered').className = "fourcovered";
//			$('fouruncovered').className = "fouruncovered";
//			$('fourcommon').className = "fourcommon";
//			$(selected_element).className = 'checked';
		},
		
		deSelectFourWheelerParking : function() {

			$('four_wheeler_covered').checked=false;
			$('four_wheeler_uncovered').checked=false;
			$('four_wheeler_common').checked=false;
			$('fourcovered').className = "fourcovered";
			$('fouruncovered').className = "fouruncovered";
			$('fourcommon').className = "fourcommon";
		},

		handleOwnership : function(selected_element) {

			$('freehold').className = "ownershiptype";
			$('leasehold').className = "ownershiptype";
			$('poa').className = "ownershiptype";
			$('cooperative').className = "ownershiptype";

			$(selected_element).className = 'ownershiptypeclicked';

		},
		

		handlePrice : function(conversion_type, prefix) {

			var price=0;
			if (!prefix) {
				prefix = "";
			}
			price = $(prefix + 'price').value;
			if (conversion_type == 'detail_to_full') {
				price = (($(prefix + 'crore')) ? ($(prefix + 'crore').value * 10000000) : 0) +
						$(prefix + 'lakh').value * 100000 +
						$(prefix + 'thousand').value * 1000 +
						(($(prefix + 'hundred')) ? ($(prefix + 'hundred').value * 100) : 0);
				$(prefix + 'price').value = price;
				this.validatePrice($(prefix + 'price'), prefix);
			} else {
				
				if ($(prefix + 'crore')) {
					crore = Math.floor(price / 10000000);
					price %= 10000000;
					$(prefix + 'crore').options[crore].selected = true;
				}
				
				lakh = Math.floor(price / 100000);
				price %= 100000;
				$(prefix + 'lakh').options[lakh].selected = true;
				thousand = Math.floor(price / 1000);
				price %= 1000;
				$(prefix + 'thousand').options[thousand].selected = true;
				
				if ($(prefix + 'hundred')) {
					hundred = Math.floor(price / 100);
					price %= 100;
					$(prefix + 'hundred').options[hundred].selected = true;
				}
				this.validatePrice($(prefix + 'price'), prefix);
			}
		},
		
		handlePriceEdit : function (prefix) {
			if (!prefix) {
				prefix = "";
			}
			
			if ($(prefix + "crore")) {
				$(prefix + "crore").enable();
			}
			$(prefix + "lakh").enable();
			$(prefix + "thousand").enable();
			if ($(prefix + "hundred")) {
				$(prefix + "hundred").enable();
			}
			$(prefix + 'price').enable();
		},

		handlePropertyOwnershipType : function(ownershipType) {

			var propertyOwnershipType = ownershipType.value;

			if (propertyOwnershipType == 'Owner') {

				if ($('broker_asst')) {
					$('broker_asst').checked = true;
				}
				$('owner_prompt').show();
				$('broker_prompt').hide();
				$("listing_catagory_div").hide();
				$("listing_category").disable();
			} else if (propertyOwnershipType == 'Broker') {

				if ($('broker_asst')) {
					$('broker_asst').checked = false;
				}
				$('owner_prompt').hide();
				$('broker_prompt').show();
				$("listing_catagory_div").show();
				$("listing_category").enable();
			} else {

				if ($('broker_asst')) {
					$('broker_asst').checked = false;
				}
				$('owner_prompt').hide();
				$('broker_prompt').hide();
				$("listing_catagory_div").show();
				$("listing_category").enable();
			}
			this.validatePropertyOwnershipType(ownershipType);
		},

		getApartmentForCity : function() {

			new Ajax.Request('/property/get-builder-for-city',
					{
						method:'POST',
						parameters: 'city='+city,
						onSuccess: function(transport) {
							$('builder_select').innerHTML =transport.responseText;
						},
						onFailure: function(transport) {
							alert('Could not connect to CommonFloor Server for this request');
							$('listing_loader').hide();
						},
						onComplete: function(transport) {
								$('listing_loader').hide();
						}
					});
		},

		handleApartmentKeyPressEvent : function(event) {

			var functions = new Array('PropertyListingNew.handleSelectApartment');
			PropertySearchPage.keyPress(event, 'apartment', 'project_name', '', functions, '', 'area');
		},

		handleSelectApartment : function(name, id){

			var aptNameAndAreaParams = name.split('@#');

			$('property_id').value = id;
			$('project_name').value = aptNameAndAreaParams[0];

			if (aptNameAndAreaParams[1] && aptNameAndAreaParams[2]){

				$('area_id').value = aptNameAndAreaParams[1];
				$('area').value = aptNameAndAreaParams[2];
				$('property_address').value = aptNameAndAreaParams[3];
			}

			$('block_select').update("");
			PropertyListingNew.handleMoreOrOther($('block_select'), $('block_input'));
			PropertyListingNew.loadBlocks($('property_id'), "kiran");
			if(this.ConsoleRequest) {
				ContentPropertyListingNew.showAdditionalInfo(1);
				if($('project_picked') && $('property_id').value.length!=0) {
					$('project_picked').hide();
				}
				if($('locality_picked') && $('area_id').value!=0 && $('area_id').value!='') {
					$('locality_picked').hide();
				}
				ContentPropertyListingNew.handleChangeAction('locality');
			}
		},
		
		handleSelectCity: function() {
			$('area_id').value = '';
			$('area').value = '';
			$('property_address').value = '';
			$('property_id').value = '';
			$('project_name').value = '';
			if ($('block_select') && $('block_select').visible()) {
				var options = $$('select#block_select option');
				options[0].selected = true;
			} else if ($('block_input') && $('block_input').visible()) {
				$('block_input').value = '';
			}
			$('autosuggest').fire('autosuggest:reset');
		},

		checkMobileVerificationStatus: function(mobileContainer, emailContainer) {

			new Ajax.Request(
			'/property-listing-public/check-mobile-verification-status',
			{
				method:'POST',
				parameters: 'mobile=' + mobileContainer.value + '&email=' + emailContainer.value,
				onSuccess: function(transport) {
					if (transport.responseText == "1") {
						$('mobile_verified').show();
					}
				},
				onFailure: function(transport) {
				},
				onComplete: function(transport) {
				}
			});
		},

		handleYesNo : function(selectedEle, unselectedEle) {

			selectedEle.className="blank";
			unselectedEle.className="blank";
			selectedEle.className="blankselected";
		},

		checkIsRegUser : function(emailContainer, submit) {
			new Ajax.Request(
			'/listing/is-reg-user',
			{
				method:'POST',
				parameters: 'email=' + emailContainer.value,
				onSuccess: function(transport) {
					$('is_reg_user').value = transport.responseText;
					if (submit === true) {
						if(($('is_reg_user').value == "1") || ($('is_reg_user').value == "0")) {
							PropertyListingNew.processBasicDetailsSubmit();
						}
					}
				},
				onFailure: function(transport) {

				},
				onComplete: function(transport) {
				}
			});
		},

		processBasicDetailsSubmit : function() {
			var isRegUser;
			isRegUser = parseInt($('is_reg_user').value);

			if (isRegUser == 1) {
				authorize = new Authorize('Post your Property','public','','property_basic_details_form');
				authorize.showAuthorizeForm(true);
			} else if (isRegUser == 0) {
				if(!this.MultipleClick) {
					this.MultipleClick = true;
					$('property_basic_details_form').submit();
				}
			} else {
				this.checkIsRegUser($('email'), true);
			}
		},

		handleMoreOrOther : function(eleTohide, eleToShow) {
			eleTohide.disable();
			eleTohide.hide();
			eleToShow.enable();
			eleToShow.show();
		},
		
		handleRoomsEdit : function(selectContainer, inputContainer) {
			if (selectContainer.visible()) {
				selectContainer.enable();
			} else {
				inputContainer.enable();
			}
		},
		handleBuiltupAreaEdit :function(selectContainer){
			if(selectContainer) {
				 selectContainer.removeAttribute('readonly');
				 
				 
			}
		},

		loadBlocks : function(propertyIdContainer, selectedBlock) {
			var propertyId;
			propertyId = propertyIdContainer.value;

			if (propertyId && !$('block_select').visible()) {
				new Ajax.Request(
				'/listing/load-blocks',
				{
					method:'POST',
					parameters: 'pi=' + propertyIdContainer.value,
					onSuccess: function(transport) {
						var blocks, option, blocksPresent = true;
						blocks = transport.responseText;
						if (blocks) {
							option = new Element("option", {"value" : ""});
							option.update("Select Block");
							$('block_select').insert(option);
							data = JSON.parse(blocks, function (key, value) {
								//value = value.trim();
								if (value != '' && value != 'Single Building' && (typeof(value) == "string")) {
									option = new Element("option", {"value" : value});
									option.update(value);
									$('block_select').insert(option);
									if (blocksPresent) {
										blocksPresent = false;
										PropertyListingNew.handleMoreOrOther($('block_input'), $('block_select'));
									}
								}
							});

						}
					},
					onFailure: function(transport) {

					},
					onComplete: function(transport) {
					}
				});
			}
		},
		
		createSlider : function(slider, valueDiv, hiddenValue, start, end, current) {
			if (current && current != '') {
				hiddenValue.value = current;
			} else {
				hiddenValue.value = "";
			}
			valueDiv.update(current+"km");
			new Control.Slider(slider.down('.handle'), slider, {
				range: $R(start, end),
				sliderValue: current,
				onSlide: function(value) {
					valueDiv.update(Math.floor(value)+"km");
				},
				onChange: function(value) { 
					valueDiv.update(Math.floor(value)+"km");
					hiddenValue.value = Math.floor(value);
				}
				});
		},
		
		showMobileVerificationDiv : function() {
			$("mobile_ver_code_entry_div").toggle();
			$("wrong_code_entry_status_div").hide();
			$("correct_code_entry_status_div").hide();
		},
		
		handleVerificationCode : function(source, listingId, verificationCode) {
			new Ajax.Request(
			'/listing/verify-mobile',
			{
				method : ((verificationCode !== null) ? 'POST' : 'GET'),
				parameters: ((verificationCode) ? ("mobile_verification_code=" + verificationCode) : "") + "&listing_id=" + listingId,
				onSuccess: function(transport) {
					var status = transport.responseText;
					if (verificationCode) {
						if (status == "1") {
							$("mobile_ver_code_entry_div").hide();
							$("wrong_code_entry_status_div").hide();
							$("correct_code_entry_status_div").show();
							setTimeout('$("correct_code_entry_status_div").hide()', 8000);
							$('mobile_not_verified').hide();
							$('mobile_verified').show();
						} else if (status == "-1") {
							$("mobile_ver_code_entry_div").hide();
							$("wrong_code_entry_status_div").show();
							$("correct_code_entry_status_div").hide();
						} else {
							alert("Invalid Request");
						}
					} else {
						if (status == "1") {
							var statusDiv = new Element("span", {"id" : "resend_ver_code_status"});
							statusDiv.update("Sent");
							source.parentNode.appendChild(statusDiv);
							setTimeout("$('resend_ver_code_status').parentNode.removeChild($('resend_ver_code_status'))",5000)
						} else {
							alert("Invalid Request");
						}
					}
				},
				onFailure: function(transport) {
				},
				onComplete: function(transport) {
				}
			});
		},
		
		handleSaveAndFinishRestLater : function(form) {
			if (form && !this.SaveAndFinishLater) {
				this.SaveAndFinishLater = true;
				var finishRestLaterNotificationEle = 
						new Element("input", {"type" : "hidden", "name" : "finish_rest_later", "value" : "1"});
				form.appendChild(finishRestLaterNotificationEle);
				form.submit();
			}
		},
		
		selectNearbyAreas : function(locality_name, check_box_id)
		{
			
			var oldNearbyArea = $('nearby_areas').value;
			oldNearbyArea = oldNearbyArea.split(",");
			oldNearbyArea[oldNearbyArea.length-1] = locality_name;
			$('nearby_areas').value = oldNearbyArea.join(",") +","
			$('nearby_areas').focus();
			$('autosuggest').hide();
		},
		
		handleNearByAreas : function(ele,addComma) {
			if(addComma == 1) {
				if(ele.value[ele.value.length-1] != ',' && ele.value != '') {
					ele.value = ele.value + ",";
				}
			} else {
				if(ele.value[ele.value.length-1] == ',') {
					ele.value = ele.value.substr(0, ele.value.length-1);
				}
			}
		},
		
		showSuccussForm : function(SuccessDivID,status,lastButtonClick) {
			
			if($("loader"))
				$(loaderId).show();
			if(status !="mobileregister" && status !="premiumcredit" ) {
				listing_id = $('listing_id').value;
				params = "status="+status+"&listing_id="+listing_id;
			} else {
				params = "status="+status;
			}
			
			params = params + "&last_button_click=" + lastButtonClick;
			me = this;	
				new Ajax.Request(
					"/listing/success-popup",
					{
						method:'GET',
						parameters: params,
						onSuccess: function(transport){		
						
							$(SuccessDivID).update(transport.responseText);
						
							$(SuccessDivID).style.position = 'fixed';
							$(SuccessDivID).style.zIndex = '9999';
							$(SuccessDivID).style.width = '500px';
							var dimensions = me.getBrowserSize();
							
							var width = dimensions[0];
							var height = dimensions[1];
							var contentWidth = $(SuccessDivID).offsetWidth;	
					    	var contentHeight = $(SuccessDivID).offsetHeight;

					    	$(SuccessDivID).style.left = Math.ceil((width - contentWidth) / 2) + 'px';
					    	var temp_top = (Math.ceil((height - contentHeight) / 2) - 20);
					    		if(temp_top < 0) {
					    			temp_top = 0;
					    		}
					    	$(SuccessDivID).style.top = temp_top + 'px';
					    	
					    	$(SuccessDivID).show();
							
						},
						onFailure: function(transport){
							alert('Could not connect to CommonFloor Server for this request');
							$(loaderId).hide();
						},
						onComplete: function(transport){
							if($(loaderId))
							$(loaderId).hide();
						}		
					}
				);
		},
		
		getBrowserSize : function(){

			var bodyWidth = document.documentElement.clientWidth;
			var bodyHeight = document.documentElement.clientHeight;
			
			var bodyWidth, bodyHeight; 
			// all except Explorer
			if (self.innerHeight){  
			 
			   bodyWidth = self.innerWidth; 
			   bodyHeight = self.innerHeight; 
			   
			// Explorer 6 Strict Mode
			}  else if (document.documentElement && document.documentElement.clientHeight) {
			    		 
			   bodyWidth = document.documentElement.clientWidth; 
			   bodyHeight = document.documentElement.clientHeight; 
			// other Explorers
			} else if (document.body) { 	
				
			   bodyWidth = document.body.clientWidth; 
			   bodyHeight = document.body.clientHeight; 
			} 
			
			return [bodyWidth,bodyHeight];
		},
		handleMasterPlan : function () {
			
			var master_plan = document.getElementsByName("change_master_plan");
			try {
				if(master_plan && master_plan[1].checked) {
					this.removeImage("master_plan", "temp", "temp");
					master_plan[1].checked = false;
					return false;
				}
			}catch (Exception ) {}
			return true;
		},
		handlePlotArea : function() {
			var plot_b = $('plot_site_b').value;
			var plot_l = $('plot_site_l').value;
			if ((Validator.isNumeric(plot_b) || Validator.isDecimal(plot_b)) &&  ( Validator.isNumeric(plot_l) || Validator.isDecimal(plot_b))) { 
				var plotVal = plot_b*plot_l;
				var element = $('area_unit_type_plot');


				var plot_l_feet = AreaUnitConvertor.convertUnits(plot_l,AreaUnitConvertor.mapUnitType(element.value),AreaUnitConvertor.SQUARE_FEET_);
				var plot_b_feet = AreaUnitConvertor.convertUnits(plot_b,AreaUnitConvertor.mapUnitType(element.value),AreaUnitConvertor.SQUARE_FEET_);

				$('plot_site').value=Math.round(plot_l_feet)+'X'+Math.round(plot_b_feet);

				var quantity = AreaUnitConvertor.convertUnits(plot_l_feet*plot_b_feet,AreaUnitConvertor.SQUARE_FEET,element.value);
				$('plot_area_hidden').value  = quantity;
                if(element.value == AreaUnitConvertor.ACRE || element.value == AreaUnitConvertor.GUNTHA || element.value == AreaUnitConvertor.GROUND
                    || element.value == AreaUnitConvertor.CENT || element.value == AreaUnitConvertor.HECTARE) {
					$('plot_area_field').value  = quantity.toFixed(3);
				}else{
					$('plot_area_field').value  = Math.round(quantity);
				}

			}

		},

                removeEmodel : function(emodel_type, emodel_url, containerDiv) {

			listing_id = $('listing_id').value;
                            params = "emodel_url=" + emodel_url + "&emodel_type=" + emodel_type +
                                    "&listing_id=" + listing_id;

			new Ajax.Request(
				"/listing/remove-emodel",
				{
					method:'POST',
					parameters: params,
					onSuccess: function(transport){		
                                            var result = transport.responseText;
                                            //console.log(result);
                                            var status = result.split("@");
                                            alert(status[1]);
                                            if(status[0] =="1") {
                                                    $(containerDiv).innerHTML ="";
                                                    $(containerDiv).hide();
                                            }
					},
					onFailure: function(transport){
						alert('Could not connect to CommonFloor Server for this request');
					},
					onComplete: function(transport){
					}		
				}
				);
		},
		removeImage : function(image_type, image_id, containerDiv, apt_img_to_del) {
			if(apt_img_to_del != 1 && image_type == "floor_plan" && apt_img_to_del != undefined) {
				$('apt_img_to_del').value = $('apt_img_to_del').value + "|" + image_id;
				$(containerDiv).innerHTML ="";
				$(containerDiv).hide();
				return;
			}
			if(image_type == "image")
					{
					$('property_image_count').innerHTML = parseInt($('property_image_count').innerHTML) - 1 ; 
					}
			listing_id = $('listing_id').value;
                            params = "image_id=" + image_id + "&image_type=" + image_type +
                                    "&listing_id=" + listing_id;

			new Ajax.Request(
				"/listing/remove-image",
				{
					method:'POST',
					parameters: params,
					onSuccess: function(transport){		

						if(image_type != "master_plan") {
							var result = transport.responseText;
                                                        //console.log(result);
							var status = result.split("@");
							alert(status[1]);
							if(status[0] =="1") {
								$(containerDiv).innerHTML ="";
								$(containerDiv).hide();
								if($("image_count"))
									$("image_count").innerHTML = status[2];
							}
						} else {
							$('area_and_floor_plan_form').submit();
						}
					},
					onFailure: function(transport){
						alert('Could not connect to CommonFloor Server for this request');
					},
					onComplete: function(transport){
					}		
				}
				);
		},
		handleAreaUnitType :function(element){
			if(element != undefined) {
				id = element.id ;
				if(id == 'area_unit_type_plot') {
					if($('plot_area_hidden').value >0 ){
						var quantity = AreaUnitConvertor.convertUnits($('plot_area_hidden').value,PropertyListingNew.prevAreaUnitType,element.value);
						$('plot_area_hidden').value  = quantity;
                        if(element.value == AreaUnitConvertor.ACRE || element.value == AreaUnitConvertor.GUNTHA || element.value == AreaUnitConvertor.GROUND
                            || element.value == AreaUnitConvertor.CENT || element.value == AreaUnitConvertor.HECTARE) {
							$('plot_area_field').value  = quantity.toFixed(3);
						}else{
							$('plot_area_field').value  = Math.round(quantity);
						}
					}
					if($('plot_site_l') !=undefined && $('plot_site_b') !=undefined) {

						var plot_l = $('plot_site_l').value ;
						var plot_b = $('plot_site_b').value ;
						var prevUnitType = PropertyListingNew.prevAreaUnitType;
						if( prevUnitType== AreaUnitConvertor.ACRE || prevUnitType== AreaUnitConvertor.GUNTHA || prevUnitType== AreaUnitConvertor.GROUND
                            || prevUnitType == AreaUnitConvertor.GUNTHA || prevUnitType == AreaUnitConvertor.GROUND) {
							prevUnitType = AreaUnitConvertor.SQUARE_FEET;
							if($('plot_site').value != '') {
								var plotSite = ($('plot_site').value).split('X');
								plot_l = plotSite[0];
								plot_b = plotSite[1];
							}

						}
					}
					

					if(plot_l >0 && element.value != AreaUnitConvertor.ACRE && element.value != AreaUnitConvertor.GUNTHA
                        && element.value != AreaUnitConvertor.GROUND && element.value != AreaUnitConvertor.CENT
                        && element.value != AreaUnitConvertor.HECTARE){

						
						var quantity = AreaUnitConvertor.convertUnits(plot_l,AreaUnitConvertor.mapUnitType( prevUnitType),AreaUnitConvertor.mapUnitType(element.value));
						if( quantity % 1 === 0){
							$('plot_site_l').value  = quantity;
						}else{
							$('plot_site_l').value  = quantity.toFixed(2);	
						}
						

					}
					if(plot_b >0 && element.value != AreaUnitConvertor.ACRE && element.value != AreaUnitConvertor.GUNTHA && element.value != AreaUnitConvertor.GROUND
                        && element.value != AreaUnitConvertor.CENT && element.value != AreaUnitConvertor.HECTARE){
						var quantity = AreaUnitConvertor.convertUnits(plot_b,AreaUnitConvertor.mapUnitType( prevUnitType),AreaUnitConvertor.mapUnitType(element.value));
						if( quantity % 1 === 0){
							$('plot_site_b').value  = quantity;
						}else{
							$('plot_site_b').value  = quantity.toFixed(2);	
						}

					}
					if($('plot_dimensions') !=undefined) {
						
						if(element.value == AreaUnitConvertor.ACRE || element.value == AreaUnitConvertor.GUNTHA || element.value == AreaUnitConvertor.GROUND
                            || element.value == AreaUnitConvertor.CENT || element.value == AreaUnitConvertor.HECTARE) {
							$('plot_dimensions').hide();

						}else{
							$('plot_dimensions').show();
						}

						$('plot_dimension_type').update(AreaUnitConvertor.mapUnitType(element.value));
					}
					if($('plot_area_type') != undefined) {
						$('plot_area_type').update(element.value);
					}

				}else {

					if($('builtup_area_hidden') != undefined && $('builtup_area_hidden').value >0 ){
						
						var quantity=  AreaUnitConvertor.convertUnits($('builtup_area_hidden').value,PropertyListingNew.prevAreaUnitType,element.value);
						if(element.value == AreaUnitConvertor.ACRE || element.value == AreaUnitConvertor.GUNTHA || element.value == AreaUnitConvertor.GROUND
                            || element.value == AreaUnitConvertor.CENT || element.value == AreaUnitConvertor.HECTARE) {
							$('builtup_area_field').value = quantity.toFixed(3);
						}else{
							$('builtup_area_field').value = Math.round(quantity);
						}
						$('builtup_area_hidden').value  = quantity;
					}
					if($('carpet_area_hidden')!= undefined && $('carpet_area_hidden').value >0 ){
						var quantity = AreaUnitConvertor.convertUnits($('carpet_area_hidden').value,PropertyListingNew.prevAreaUnitType,element.value);
						$('carpet_area_hidden').value  = quantity;
                        if(element.value == AreaUnitConvertor.ACRE || element.value == AreaUnitConvertor.GUNTHA || element.value == AreaUnitConvertor.GROUND
                            || element.value == AreaUnitConvertor.CENT || element.value == AreaUnitConvertor.HECTARE) {
							$('carpet_area').value  = quantity.toFixed(3);
						}else{
							$('carpet_area').value  = Math.round(quantity);
						}
					}
					if($('open_area_hidden')!= undefined && $('open_area_hidden').value >0 ){
						var quantity = AreaUnitConvertor.convertUnits($('open_area_hidden').value,PropertyListingNew.prevAreaUnitType,element.value);
						$('open_area_hidden').value  = quantity;
                        if(element.value == AreaUnitConvertor.ACRE || element.value == AreaUnitConvertor.GUNTHA || element.value == AreaUnitConvertor.GROUND
                            || element.value == AreaUnitConvertor.CENT || element.value == AreaUnitConvertor.HECTARE) {
							$('open_area_field').value  = quantity.toFixed(3);
						}else{
							$('open_area_field').value  = Math.round(quantity);
						}
					}

				} 

				switch(id){
					case "area_unit_type_builtup":

				}


				if(id == 'area_unit_type_builtup'){
					selectedIndex = $('area_unit_type_builtup').selectedIndex ;
					
				}else if(id == 'area_unit_type_carpet') {

					selectedIndex = $('area_unit_type_carpet').selectedIndex ;

				}else if(id == 'area_unit_type_plot') {

					selectedIndex = $('area_unit_type_plot').selectedIndex ;
							
				}else if(id == 'area_unit_type_openarea') {
					selectedIndex = $('area_unit_type_openarea').selectedIndex ;
				}
				if($('area_unit_type_carpet') != undefined) {

					$('area_unit_type_carpet').selectedIndex =selectedIndex ;
				}
				if($('area_unit_type_plot')!= undefined) {
					$('area_unit_type_plot').selectedIndex = selectedIndex ;
				}
				if($('area_unit_type_builtup') != undefined) {
					$('area_unit_type_builtup').selectedIndex =selectedIndex;
				}
				if($('area_unit_type_openarea') != undefined) {
					$('area_unit_type_openarea').selectedIndex =selectedIndex;
				}
			}
		},

        projectNameOnBlur : function() {
            if ($('project_name').value == '') {$('project_name').value = $('tmp_project_name').value;}
            PropertyListingNew.validateProjectName($('project_name').value);
            if($('area').value!=''){PropertyListingNew.validateAreaName($('area'));}
        },

        areaNameOnBlur : function() {
            if ($('area').value == '') {$('area').value = $('tmp_locality_name').value;}
            PropertyListingNew.validateAreaName($('area'));
        },
        negotiableOnChange : function(element){
        	var valToUpdate = 0;
        	if(element.checked == true){
        		valToUpdate = 1;
        	}else{
        		valToUpdate = 0;
        	}
        	
        	var allElements = document.getElementsByName(element.name); 

        	for(var count=0; count<allElements.length;count++){
        		allElements[count].checked = element.checked;
        		allElements[count].value = valToUpdate;
        	}

        },

    	removeReportFlag: function(listingId) {
    	//alert(listingId);
			new Ajax.Request(
			'/content/realestate-broker/wrong-report',
			{
				method:'POST',
				parameters: {li:listingId, com:"Action Taken."},
				onSuccess: function(transport) {
							//alert("Success");
							$('property_basic_details_form').submit();
						}
			});
		},

};
