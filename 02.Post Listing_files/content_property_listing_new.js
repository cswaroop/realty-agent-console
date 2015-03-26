var ContentPropertyListingNew = {
        Status : true,
		FocusVariable : "",
		FormValidation :false,
		LastSelectedProperty : false, // last selected type of property
		AjaxRequest : '',
		SaveDetail : false,
		handleRightTimeToCall : function(startTime,endTime) {
			
			
			var start = Number(startTime.value) + 1;
			var dateText = "<script type='text/javascript'>Calendar.showTimeOptions(" + start
				+" ,23,"+ start +",$('"+endTime+"'));</script>";
			$(endTime).update(dateText);
		},

		handlePropertyOwnershipType : function(ownershipType, changeCategory, skip) {
			if(skip != 1) {
				PropertyListingNew.handlePropertyOwnershipType(ownershipType);
			}
			if(changeCategory != "1") {
				if (ownershipType.value == 'Owner') {
					$("listing_cat").hide();
					$('agent_listing_category').update("<option value='free'>Free</option>");
				} else {
					$("listing_cat").show();
					$('agent_listing_category').update("<option value='paid_basic'>Paid Basic</option><option value='paid_premium'>Paid Premium</option>");
					$('agent_listing_category').options[0].selected=true;
				}
			} else {
				if (ownershipType.value == 'Owner' && $('agent_listing_category').value == "paid_premium") {
					if($('show_contact') != undefined) {
						$('show_contact_info').show();
						$('show_contact').enable();
					}
				} else {
					if ($('show_contact') != undefined) {
						$('show_contact_info').hide();
						$('show_contact').checked = false;
						$('show_contact').disable();
					}
				}
			}
		},
		
		handleListingIntent : function(selected_element,loadAdditionalDetail) {

			if(loadAdditionalDetail) {
				this.showAdditionalInfo();
			}
			$("price_option_div").show();
			if (selected_element == "sale") {
				$("deposit_amount_div").hide();
				$$('select#hundred option')[0].selected = true;
                                $('hundred_container').hide();$('crore_container').show();
                                $('heading_sale').show();
                                $('heading_rent').hide();
                                $('registration_fee_div').show();
                                $("includes_reg_yes").enable();
                                $("includes_reg_no").enable();
                                $("deposit_price").disable();
                                $('search_sale_intent').show();
                                $('sale_intent_resale').enable();
                                $('sale_intent_new').enable();
			} else {
				$$('select#crore option')[0].selected = true;
				$('crore_container').hide();$('hundred_container').show();
				$('registration_fee_div').hide();
				$('deposit_amount_div').show();
				$("deposit_price").enable();
                                $('heading_sale').hide();
                                $('heading_rent').show();
                                $('deposit_property_inr_error').className = "hideerror";
                                $("includes_reg_yes").disable();
                                $("includes_reg_no").disable();
                                $('search_sale_intent').hide();
                                $('sale_intent_resale').disable();
                                $('sale_intent_new').disable();
			}
			$('property_inr_error').className = "hideerror";
			//here we passing name of element
			PropertyListingNew.validateListingIntent('posted_for');
		},
		
		handlePropertyType : function(selected_element,loadAdditionalDetail) {
			

			var currentSelectedProperty = selected_element.value;
			if(this.LastSelectedProperty == currentSelectedProperty) {
				return;
			}
			this.LastSelectedProperty = currentSelectedProperty;
			if(loadAdditionalDetail) {
				this.showAdditionalInfo();
				if (currentSelectedProperty == 'Plot') {
					return;
				}
			}
			$('property_type_error').className="hideerror";
			if (currentSelectedProperty == 'Plot') {
				$('property_no').update("Survey No");
				$("room_details").hide();
				$("plot_options").show();
				if($("additional_possession_from_div") != undefined 
						&& $("basic_possession_from_div") != undefined) {
					$("basic_possession_from_div").update($("additional_possession_from_div").innerHTML);
					$("additional_possession_from_div").update();
				}
				if($("additional_ownership_div") != undefined 
						&& $("basic_ownership_div") != undefined) {
					$("basic_ownership_div").update($("additional_ownership_div").innerHTML);
					$("additional_ownership_div").update();
				}
				$("plot_area_field").enable();
				$("plot_site").enable();
				$("plot_site_l").enable();
				$("plot_site_b").enable();
				$("maintenance_div").hide();
				$('builtup_area').hide();
				$('plot_area_error').show();
				$('builtup_area_error').hide();
			} else {
				$('property_no').update("House No");
				$("room_details").show();
				$("plot_options").hide();
				if($("additional_possession_from_div") != undefined 
						&& $("basic_possession_from_div") != undefined) {
					$("additional_possession_from_div").update($("basic_possession_from_div").innerHTML);
					$("basic_possession_from_div").update();
				}
				if($("additional_ownership_div") != undefined 
						&& $("basic_ownership_div") != undefined) {
					$("additional_ownership_div").update($("basic_ownership_div").innerHTML);
					$("basic_ownership_div").update();
				}
				$("plot_area_field").disable();
				$("plot_area_error").hide();
				$("plot_site").disable();
				$("plot_site_l").disable();
				$("plot_site_b").disable();
				$("maintenance_div").show();
				$('builtup_area').show();
				$('builtup_area_error').show();
			}
			if(currentSelectedProperty == "Builder Floor" 
			 || currentSelectedProperty == "Farmhouse"
			 || currentSelectedProperty == 'Penthouse') {
			 	$('open_area').show();
			 	$('open_area_error').show();
			 	switch(currentSelectedProperty) {
			 		case 'Builder Floor':
			 			 $('open_area_text').update("Land Area");
			 			 break;
			 		case 'Farmhouse':
			 			 $('open_area_text').update("Plot Area");
			 			 break;
			 		case 'Penthouse':
			 			 $('open_area_text').update("Terrace  Area");
			 			 break;
			 	}

			}else{
				$('open_area').hide();
				$('open_area_error').hide();
			}
			if (currentSelectedProperty == 'House'
					|| currentSelectedProperty == 'Plot' || currentSelectedProperty == "Farmhouse") {
				$('block_container').hide();
			} else {
				$('block_container').show();
			}
			if(currentSelectedProperty == "Studio Apartment") {
				$('no_of_bed_rooms_select').value = 0.5;
				$('no_of_bath_rooms_select').value = 1;
				$('no_of_bed_rooms_select').setAttribute('disabled','disabled');
				$('no_of_bath_rooms_select').setAttribute('disabled','disabled');

			}else{
				$('no_of_bed_rooms_select').removeAttribute('disabled');
				$('no_of_bath_rooms_select').removeAttribute('disabled');
			}
			if (currentSelectedProperty == 'Plot'){
			   $('builtup_area').hide();	
			} else {
				$('builtup_area').show();
			}
			if (currentSelectedProperty == 'House' || currentSelectedProperty == "Farmhouse") {
				$('project_name_div').hide();
			} else {
				$('project_name_div').show();
				if(currentSelectedProperty == 'Plot') {
					$('project_name_require_div').className="heading";
					$('project_name').onblur = function onblur(event) {return;};
					
				} else {
					$('project_name_require_div').className="heading requiredfield";
					$('project_name').onblur = function onblur(event) {
							PropertyListingNew.validateProjectName($('project_name'));};
				}
			}
			if(currentSelectedProperty == "Apartment") {
				$("balconies_div").show();
			} else {
				$("balconies_div").hide();
			}
		},
		
		handlePossessionFrom : function(type)  {
						var reset = false;
			
			if(type=="day" && ($("day").value=='' || $("day").value=='N.A.')) {
                                if($("day").value!='N.A.'){
                                    $("day").value = "DD";
                                }
                                if($("month").value=='N.A.' && $("year").value=='N.A.'){
                                    $("possessionFrom_error").className = "hideerror";
                                    reset =true;
                                }				
			}
                        else if(type=="day" && $("day").value!='N.A.' && ($("month").value=='N.A.' || $("year").value=='N.A.')){
                                this.validatePossessionFrom();
                                return true;
                        }
			
			if(type=="month" && ($("month").value=='' || $("month").value=='N.A.')) {
                                if($("month").value!='N.A.'){
                                    $("month").value = "MM";
                                }
                                if($("month").value=='N.A.'){
                                    $("day").value = "N.A.";
                                    if($('year').value != 'N.A.'){
                                        this.validatePossessionFrom();
                                        return true;
                                    }
                                    else{
                                        $("possessionFrom_error").className = "hideerror";
                                        reset =true;
                                    }
                                }				
			}
                        else if(type=="month" && $("month").value!='N.A.'){
                            if($("year").value!='N.A.'){
                                $("possessionFrom_error").className = "hideerror";
                            }
                            else{
                                this.validatePossessionFrom();
                                return true;
                            }
                        }
			
			if(type=="year" && ($("year").value=='' || $("year").value=='N.A.')) {
				if($("year").value!='N.A.'){
                                    $("year").value = "YYYY";
                                }
                                if($("year").value=='N.A.'){
                                    $("month").value = "N.A.";
                                    $("day").value = "N.A.";
                                    $("possessionFrom_error").className = "hideerror";
                                } 
				reset = true;
			}
			if((type=="day" && ($("month").value=='MM' || $("year").value=='YYYY'))
				|| (type=="month" && ($("day").value=='DD' || $("year").value=='YYYY'))
				|| (type=="year" && ($("day").value=='DD' || $("month").value=='MM'))) {
				reset = true;
			}
			  
			if(reset) {
				$("possession_from").value = "";
			} else {
				if($("month").value.length == 1) {
					$("month").value = "0" + $("month").value;
				}
				if($("day").value.length == 1) {
					$("day").value = "0" + $("day").value;
				}
                                if($("year").value != 'N.A.' && $("month").value != 'N.A.' && ($("day").value == 'N.A.' || ! $('day').visible())){
                                    $("possession_from").value = $("year").value +"-"+ $("month").value + "-01";
                                }
                                else{
                                    $("possession_from").value = $("year").value +"-"+ $("month").value + "-" +$("day").value;
                                }				
				this.validatePossessionFrom();
			}
		},
		
		validatePossessionFrom : function() {
			
			if($("possession_from").value == "" &&  $("day").value=='DD' 
				&& $("month").value=='MM' && $("year").value=='YYYY') {
				$("possessionFrom_error").className = "hideerror";
				return true;
			} else {
				var monthVal = $("month").value -1;
                                var dayVal = $("day").value;
                                if($("year").value != 'N.A.' && $("month").value != 'N.A.' && ($("day").value == 'N.A.' || ! $('day').visible())){
                                    dayVal = '1';
                                }
				var composedDate = new Date($("year").value, monthVal, dayVal);
				
				if(composedDate.getDate() == dayVal &&
			            composedDate.getMonth() == monthVal &&
			            composedDate.getFullYear() == $("year").value){
					$("possessionFrom_error").className = "hideerror";
					return true;
				} else {
					$("possessionFrom_error").className = "showerror";
					return false;
				}
			}
		},
		
		validatePropertyOwnershipType : function(ownerShip) {

			ownerShip = $('property_basic_details_form').getInputs('radio', ownerShip);
			
			if (ownerShip[0].checked || ownerShip[1].checked
				|| ownerShip[2].checked) {
				$('ownership_error').className="hideerror";
				return true;
			}
			PropertyListingNew.FocusVariable = $('owner');
			$('ownership_error').className="showerror";
			return false;
		},
		
		validateContactMobile : function(number,country_code) {
			if ($('mobile_verified')) {
				$('mobile_verified').hide();
			}

			if (!Validator.isValidMobileNumber(number.value,country_code.value)) {
				$('mobile_error').className="showerror";
				PropertyListingNew.FocusVariable = number;
				return false;
			}
			$('mobile_error').className = "hideerror";
			return true;
		},

        validatePhysicallyVerified : function() {

            var errorMsg = "";
            if ($('phy_verf_listing').checked && $('phy_verf_listing').value == '1') {

                if ($('balconies_div').getStyle('display') != 'none') {
                    if (($('no_of_balconies_select').value != "more" && $('no_of_balconies_select').value == "") || ($('no_of_balconies_select').value == "more" && $('no_of_balconies_input').value == "")) {
                        errorMsg += "Balconies field is empty\n";
                    }
                }

                if ($('direction_facing') != undefined && $('direction_facing').value == "") {
                    errorMsg += "Direction Facing field is empty\n";
                }

                if ($$('input[name="flooring_type"]') != '' && $$('input[name="flooring_type"]:checked').length == 0) {
                    errorMsg += "Flooring Type field is empty\n";
                }

                if ($$('input[name="servant_accommodation"]') != '' && $$('input[name="servant_accommodation"]:checked').length == 0) {
                    errorMsg += "Servant Accommodation field is empty\n";
                }

                if ($$('input[name="bachelors_allowed"]') != '' && $$('input[name="bachelors_allowed"]:checked').length == 0) {
                    errorMsg += "Bachelors Allowed field is empty\n";
                }

                if ($$('input[name="is_dining_space_available"]') != '' && $$('input[name="is_dining_space_available"]:checked').length == 0) {
                    errorMsg += "Dining space available field is empty\n";
                }

                if ($$('input[name="pet_allowed"]') != '' && $$('input[name="pet_allowed"]:checked').length == 0) {
                    errorMsg += "Pet allowed field is empty\n";
                }

                if ($$('input[name="tenant_veg"]') != '' && $$('input[name="tenant_veg"]:checked').length == 0) {
                    errorMsg += "Tenant Veg field is empty\n";
                }

                if ($$('input[name="furnish_state"]') != '' && $$('input[name="furnish_state"]:checked').length == 0) {
                    errorMsg += "Furnish state field is empty\n";
                }

                if ($$('input[name="two_wheeler_parking"]') != '' && $$('input[name="two_wheeler_parking"]:checked').length == 0) {
                    errorMsg += "Two wheeler field is empty\n";
                }

                if ($$('input[name="four_wheeler_parking"]') != '' && $$('input[name="four_wheeler_parking"]:checked').length == 0) {
                    errorMsg += "Four wheeler field is empty\n";
                }

                if ($$('input[name="is_visitor_parking_available"]') != '' && $$('input[name="is_visitor_parking_available"]:checked').length == 0) {
                    errorMsg += "Is visitor parking field is empty\n";
                }

                if ($('total_floors_select') != undefined &&  $('total_floors_select').value == "" ) {
                    errorMsg += "Total floor field is empty\n";
                }

                if ($('on_floor_select') != undefined &&  $('on_floor_select').value == "" ) {
                    errorMsg += "Property on which floor field is empty\n";
                }

                if (!$('is_geocode_correct').checked) {
                    errorMsg += "Property Geocode Correct should be checked\n";
                }
                if(!PropertyListingNew.validateUploadedPropertyImages())
                	errorMsg += "Total Number of images uploaded should be more than 3\n";
            }

            if ( errorMsg != "") {
                errorMsg = "Following criteria unmet for a listing to be marked as physically verified : \n" + errorMsg;
                alert(errorMsg);
                return false;
            }

            return true;
        },
		
		validateBasicForm : function() {

			if(isExpiredListing){
				var result = confirm('This is an expired listing. If you would like to activate it, then a credit will be deducted.Press OK to deduct the credit and make listing live. Press Cancel to just save the listing.');
				if(result){
					$('is_refresh_from_user').value=1;
				}else{
					$('is_refresh_from_user').value=0;
				}
			}

			this.FormValidation = true;
			PropertyListingNew.FormValidation = true;
			this.Status = true;
			
			if($('on_floor_input') !=undefined && $('total_floors_input') != undefined) {
				this.Status = PropertyListingNew.validateFloor($('on_floor_input'),'onfloor_error',$('total_floors_input'),'totalfloor_error') && this.Status;
			}
			this.Status = PropertyListingNew.validateFeature($('features')) && this.Status;

			if ($('rent_intent').checked == true) {
				PropertyListingNew.Status = PropertyListingNew.validatePrice($('deposit_price'),'deposit_') && this.Status;
				PropertyListingNew.Status = PropertyListingNew.validatePrice($('price')) && this.Status;
			} else if ($('sale_intent').checked == true) {
				this.Status = PropertyListingNew.validatePrice($('price')) && this.Status;
			}
			property_type = $('property_basic_details_form').getInputs('radio', 'unit_type');
			if($('plot').checked){
				this.Status = PropertyListingNew.validateAreaSqft($('plot_area_field'),1) && this.Status;
			}else{
				this.Status = PropertyListingNew.validateAreaSqft($('builtup_area_field'),1) && this.Status;
				if($('carpet_area') != undefined) {
					this.Status = PropertyListingNew.validateAreaSqft($('carpet_area')) && this.Status;
				}
			}
			this.Status = PropertyListingNew.validatePropertyAddress($('property_address')) && this.Status;
			this.Status = PropertyListingNew.validateAreaName($('area')) && this.Status;
			if($('builderfloor').checked || $('farmhouse').checked || $('penthouse').checked) {
				this.Status = PropertyListingNew.validateAreaSqft($('open_area_field'),1) && this.Status;
			}
			if(!$('house').checked && !$('plot').checked && !$('farmhouse').checked) {
				this.Status = PropertyListingNew.validateProjectName($('project_name')) && this.Status;
			}
			
                        if ($('terms_conditions') !=undefined && !($('terms_conditions').checked)) {
				alert("Please agree to our Terms of Use and Privacy Policy to post your listing");
                                PropertyListingNew.FocusVariable = $('terms_conditions');
                                this.Status = false;
			} 
			this.Status = PropertyListingNew.validateCity($('city')) && this.Status;
			//here we passing name of element
			this.Status = PropertyListingNew.validateListingIntent('posted_for') && this.Status;
			this.Status = PropertyListingNew.validatePropertyType('unit_type') && this.Status;
			this.Status = this.validateContactMobile($('mobile'),$('country_code')) && this.Status;
			//this.Status = this.validateContactNumber($('contact_number'),$('contact_no_country_code')) && this.Status;
			this.Status = PropertyListingNew.validateEmail($('email')) && this.Status;
			this.Status = this.validatePropertyOwnershipType("user_type") && this.Status;
			this.Status = PropertyListingNew.validateName($('name')) && this.Status;
			if(!$('plot').checked) {
				this.Status = PropertyListingNew.validateAllParking() && this.Status;
			}

            if($('phy_verf_listing') != undefined && $('phy_verf_listing').checked){
                this.Status = this.validatePhysicallyVerified($('phy_verf_listing')) && this.Status;
            }

			this.FormValidation = false;
			PropertyListingNew.FormValidation = false;
			this.FocusVariable = PropertyListingNew.FocusVariable;
			if (this.FocusVariable) {
				this.FocusVariable.focus();
				this.FocusVariable = '';
			}
                        
                        this.Status = PropertyListingNew.validatePropertyEmodels() && this.Status;
			if (!this.Status) {
				this.Status = true;
				PropertyListingNew.Status = true;
				return false;
			}
			
			//saveListingDetail();
			return true;
		},
		
		showAdditionalInfo : function(projectChange) {
			
			
			property_type = $('property_basic_details_form').getInputs('radio', "unit_type");
			var isPropertyTypeChecked = false;
			for(var count =0;count<property_type.length;count++){
				if(property_type[count].checked){
					isPropertyTypeChecked = true;
					break;
				}
			}
			if (!isPropertyTypeChecked) {
				alert("Please select property type first to proceed");
				return;
			}

			var params = $('property_basic_details_form').serialize();
			var waitingText = "<center>Please Wait ...................</center>";
			$('additional_info_div').update(waitingText);
			new Ajax.Request('/listing/post-listing-additional-detail',
			{
				method:'GET',
				parameters: params+"&is_ajax=true&project_change="+projectChange,
				onSuccess: function(transport) {
					$('additional_info_div').update(transport.responseText);
				},
				onFailure: function(transport) {
					alert('Could not connect to CommonFloor Server for this request');
				},
				onComplete: function(transport) {
				}
			});
		},
		
		saveListingDetail : function(submitBtn) {

			if(this.SaveDetail || !this.validateBasicForm()) {
				return;	
			}
			property_type = $('property_basic_details_form').getInputs('radio', "unit_type");
			var isPropertyTypeChecked = false;
			for(var count =0;count<property_type.length;count++){
				if(property_type[count].checked){
					isPropertyTypeChecked = true;
					break;
				}
			}
			if (!isPropertyTypeChecked) {
				alert("Please select property type first to proceed");
				return;
			}

			this.SaveDetail = true;
			$('listing_loader').show();
			var listingId = $("listing_id");
			propertyId = $("property_id");
			var lastButtonClick = $('last_button_click').value;
			new Ajax.Request('/listing/post-listing-additional-detail',
					{
						method:'POST',
						parameters: $('property_basic_details_form').serialize() +"&is_ajax=true",
						onSuccess: function(transport) {
				
							if(transport.responseText != '') {
								var output = transport.responseText.split("|");
								var listingId = $('listing_id').value;
								if(output[1] != undefined && listingId.length == 0 && output[1].length !=0) {
									$('listing_id').value = output[1];	
									$('email').disabled = true;
									var redirectUrl = "/listing?listing_id="+output[1];
									window.location.href = redirectUrl + "&status=" + output[2] +"#" +$('tag_to_move').value;
								}
								
								if(output[2] !="") {
									if(listingId == "" || output[2] != "success") {
									PropertyListingNew.showSuccussForm( "success_form", output[2], lastButtonClick);
									} else {
										PropertyListingNew.showSuccussForm( "success_form", "notify", lastButtonClick);
									}
								} else {
									alert(output[0]);
								}
							}
							ContentPropertyListingNew.SaveDetail = false;
							$('listing_loader').hide();
							if(submitBtn != undefined) {
								submitBtn.focus();
							}
						},
						onComplete: function(transport) {
							$('listing_loader').hide();
							$('last_button_click').value = 0;
						},
						onFailure: function(transport) {
							alert('Could not connect to CommonFloor Server for this request');
							ContentPropertyListingNew.SaveDetail = false;
							$('listing_loader').hide();
						}
					});
		},

    handleChangeAction : function(type, citychange) {
	try {
                var cancelLink;
                if(typeof(citychange) === "undefined") {
                    citychange = false;
                }
		if (type == 'project' ||type == 'locality') {
                if(type == 'project') {
                    $('new_project_info').show();
                    if(citychange == true) {
                        cancelLink = $('new_project_info').getElementsByTagName('a');
                        for(i=0; i<cancelLink.length; i++) {cancelLink[i].hide();}
                    }
                    else {
                        cancelLink = $('new_project_info').getElementsByTagName('a');
                        for(i=0; i<cancelLink.length; i++) {cancelLink[i].show();}
                    }
                    if($('old_project_info')) {
                            $('old_project_info').hide();
                            }
                    $('new_address').show();
                    if(citychange == true) {
                        cancelLink = $('new_address').getElementsByTagName('a');
                        for(i=0; i<cancelLink.length; i++) {cancelLink[i].hide();}
                    }
                    else {
                        cancelLink = $('new_address').getElementsByTagName('a');
                        for(i=0; i<cancelLink.length; i++) {cancelLink[i].show();}
                    }
                    if($('old_address') != undefined) {
                            $('old_address').hide();
                    }
                    if($('project_picked'))
                    {
                        $('project_validity_radio_db').checked = false;
                        $('project_validity_radio_unknown').checked = false;
                        $('project_picked').hide();
                    }
                    if($('locality_not_picked'))
                    {
                        $('locality_validity_radio_unknown').checked = false;
                        $('locality_not_picked').hide();
                    }
                    $('area_name_error').className = "hideerror";
                    $('project_name_error').className = "hideerror";
            }

                    $('new_area_info').show();
                    if(citychange == true) {
                        cancelLink = $('new_area_info').getElementsByTagName('a');
                        for(i=0; i<cancelLink.length; i++) {cancelLink[i].hide();}
                    }
                    else {
                        cancelLink = $('new_area_info').getElementsByTagName('a');
                        for(i=0; i<cancelLink.length; i++) {cancelLink[i].show();}
                    }

                    if($('old_area_info')) {
                    $('old_area_info').hide();
                    }
                    if($('sel_proj_locality').value != $('area_id').value) {
                        $('locality_mismatch_error').show();
                    }
                    else {
                        $('locality_mismatch_error').hide();
                    }
                    $('area_name_error').className = "hideerror";
                    if($('locality_not_picked'))
                    {
                        $('locality_validity_radio_unknown').checked = false;
                        $('locality_not_picked').hide();
                    }
            }else if(type=='mobile') {
					$('old_contact_mobile').hide();
					$('new_contact_mobile').show();
				}else if(type=='address') {
					$('new_address').show();
					$('old_address').hide();
                    if(citychange == true) {
                        cancelLink = $('new_address').getElementsByTagName('a');
                        for(i=0; i<cancelLink.length; i++) {cancelLink[i].hide();}
                    }
                    else {
                        cancelLink = $('new_address').getElementsByTagName('a');
                        for(i=0; i<cancelLink.length; i++) {cancelLink[i].show();}
                    }
				}
			} catch(Exception) {
				
			}
		},
		
		handleCancelAction : function(type, oldValue,oldLocality,oldAddress) {
			try {
                var cancelLink;
				if (type == 'project' ||type == 'locality') {
					if(type == 'project') {
                    cancelLink = $('new_project_info').getElementsByTagName('a');
                    for(i=0; i<cancelLink.length; i++) {cancelLink[i].show();}
					$('project_name').value = oldValue;
                    $('tmp_project_name').value = oldValue;
                    $('sel_proj_locality').value = $('old_sel_proj_locality').value;
                    $('project_name_error').hide();
					$('new_project_info').hide();
                                        $('project_validity_radio_db').checked = false;
                                        $('project_validity_radio_unknown').checked = false;
                                        $('locality_validity_radio_unknown').checked = false;
					$('old_project_info').show();
                                        
					$('property_id').value = $('old_property_id').value;
                    $('property_address').value = oldAddress;
					$('new_address').hide();
					$('old_address').show();
				}
                cancelLink = $('new_area_info').getElementsByTagName('a');
                for(i=0; i<cancelLink.length; i++) {cancelLink[i].show();}
                $('area').value = oldLocality;
                $('tmp_locality_name').value = oldLocality;
				$('area_name_error').hide();
				$('new_area_info').hide();
               $('locality_validity_radio_unknown').checked = false;
                cancelLink = $('new_area_info').getElementsByTagName('a');
                for(i=0; i<cancelLink.length; i++) {cancelLink[i].show();}
				$('old_area_info').show();
                $('area_id').value=$('old_area_id').value;
                if($('sel_proj_locality').value != $('area_id').value) {
                    $('locality_mismatch_error').show();
                }
                else {
                    $('locality_mismatch_error').hide();
                }

                } else if(type=='mobile'){
					$('mobile').value=oldLocality;
					$('country_code').value=oldValue;
					$('old_contact_mobile').show();
					$('new_contact_mobile').hide();
					
				} else if(type=='address') {
					$('property_address').value = oldValue;
					$('new_address').hide();
					$('old_address').show();
				}
			} catch(Exception) {
				
			}
		},

    handleBlurAction : function(type) {
        if($('locality_picked') && $('area_id').value!=0 && $('area_id').value!='') {
            $('locality_picked').hide();
        }
        if($('area_id').value != $('sel_proj_locality').value) {
                $('locality_mismatch_error').show();
                
        }
        
        else {
            $('locality_mismatch_error').hide();
        }
    }
};