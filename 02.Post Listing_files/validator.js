var Validator = {
	
	isValidEmailId : function(str){
	
		var returnValue = false;
		
		// check for null string
		if(str == null) {
			return returnValue;
		}
		 
		str = this.trim(str);
		
		// check for empty or for spaces
		if((str == '') || (str.search(/\s/) != -1)) {
			return returnValue;
		}
		
		// check for valid email pattern
		var p_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var matches = str.match(p_email);
		if(matches == null || matches[0] != str) {
			return returnValue;
		}
		return true;
	},
	
	isValidCountryCode : function(countryCode) {
		
		var returnValue = false;
		var matches;
		
		if(countryCode == null) {
			return returnValue;
		}
		
		countryCode = this.trim(countryCode);
		
		if((countryCode == '') || (countryCode.search(/\s/) != -1)) {
			return returnValue;
		}
		
		//allowing user to enter "+" charecter in other ISD code
		if(countryCode.charAt(0)=="+")
		{
			countryCode = countryCode.replace("+","");
		}

		matches = countryCode.match(/^[0-9]{1,4}$/);
		if(matches == null || matches[0] != countryCode) {
			return returnValue;
		}
		
		return true;
	},
	
	isValidMobileNumber : function(mobile, countryCode) {
		
		var returnValue = false;
		var matches;
		
		if(countryCode && !this.isValidCountryCode(countryCode))
			return returnValue;
		
		// check for null string
		if(mobile == null) {
			return returnValue;
		}
		
		mobile = this.trim(mobile);
		
		// check for empty or for spaces
		if((mobile == '') || (mobile.search(/\s/) != -1)) {
			return returnValue;
		}
		
		// check mobile number
		var validMobilePatterns = new Array();
		validMobilePatterns['91'] = '/^[987][0-9]{9}$/';
		validMobilePatterns['001'] = '/^[0-9]{10}$/';
		validMobilePatterns['44'] = '/^[987][0-9]{9}$/';
		validMobilePatterns['971'] = '/^5[0-9]{8,9}/';
		
		var validMobileRegExp = validMobilePatterns[countryCode];
		if(!validMobileRegExp)
			validMobileRegExp = '/^[1-9][0-9]{7,10}$/';
		
		validMobileRegExp = eval(validMobileRegExp);
		
		matches = mobile.match(validMobileRegExp);
		if(matches == null || matches[0] != mobile) {
			return returnValue;
		}
		
		return true;
		
	},
	
	isValidName : function(name, allowNumeric) {
		
		if(name == null)
			return false;
		
		name = this.trim(name);
                
        if(name.toLowerCase()=='name' || name.toLowerCase()=='full name')
            return false;
		
		if(name == '')
			return false;
		
		var namePattern = /^[a-zA-Z\s\.]+$/;
		if(allowNumeric) {
			namePattern = /^[a-zA-Z\s\.0-9]+$/;
		}
		var matches = name.match(namePattern);
		if(matches == null || (matches[0] != name))
			return false;
		
		return true;
	},
	
	trim: function(str) {
		
		str = str.replace(/\s+/g," ");
		str = str.replace(/^\s|\s$/g,"");
		return str;
	},
	
	isNumeric: function(input)
	{
		matches = input.match(/^[0-9]+$/);
	    return matches!=null && matches[0]==input;
	},

	isDecimal: function(input)
	{
		//upto 3 decimal
		matches = input.match(/^\d+\.\d{0,3}$/);
	    return matches!=null && matches[0]==input;
	},

	validateEmail: function(ele, errorEle) {
		
		if(errorEle == undefined) {
			if((ele.next() == undefined || ele.next().className.indexOf("error-block") == -1)) {
				errorEle = new Element("div", {"class":"error-block","style":"display:none"});
				errorEle.innerHTML = "<div class='help_wrap'><p><span></span></p><div class='help_arrow'></div></div>";
				ele.parentNode.insertBefore(errorEle,ele.nextSibling);
			} else {
				errorEle = ele.next()
			}
		}
		
		var value = ele.value;
		if(value == ele.placeholder) {
			value = '';
		}
		if(value == "") {
			errorEle.show();
			focusEle = ele;
			errorEle.getElementsByTagName('span')[0].innerHTML = "Please enter email id";
			ele.addClassName("redborder");
			return false;
		} else if(!Validator.isValidEmailId(value)) {
			errorEle.show();
			focusEle = ele;
			errorEle.getElementsByTagName('span')[0].innerHTML = "Please enter valid email id";
			ele.addClassName("redborder");
			return false;
		} else {
			errorEle.hide();
			ele.removeClassName("redborder");
			return true;
		}
	},
	
	validateMobile: function(ele,countryEle, errorEle) {
		if(errorEle == undefined) {
			if((ele.next() == undefined || ele.next().className.indexOf("error-block") == -1)) {
				errorEle = new Element("div", {"class":"error-block","style":"display:none"});
				errorEle.innerHTML = "<div class='help_wrap'><p><span></span></p><div class='help_arrow'></div></div>";
				ele.parentNode.insertBefore(errorEle,ele.nextSibling);
			} else {
				errorEle = ele.next()
			}
		}
		
		if(ele.value == "") {
			errorEle.show();
			focusEle = ele;
			errorEle.getElementsByTagName('span')[0].innerHTML = "Please enter mobile number";
			ele.addClassName("redborder");
			return false;
		} else if(countryEle.value == "") {
			errorEle.show();
			focusEle = ele;
			errorEle.getElementsByTagName('span')[0].innerHTML = "Please enter country code";
			ele.addClassName("redborder");
			return false;
		} else if(!Validator.isValidMobileNumber(ele.value, countryEle.value)) {
			errorEle.show();
			focusEle = ele;
			errorEle.getElementsByTagName('span')[0].innerHTML = "Please enter valid mobile number";
			ele.addClassName("redborder");
			return false;
		} else {
			errorEle.hide();
			ele.removeClassName("redborder");
			return true;
		}
	},
	
	validateName: function(ele, errorEle) {
		
		if(errorEle == undefined) {
			if((ele.next() == undefined || ele.next().className.indexOf("error-block") == -1)) {
				errorEle = new Element("div", {"class":"error-block","style":"display:none"});
				errorEle.innerHTML = "<div class='help_wrap'><p><span></span></p><div class='help_arrow'></div></div>";
				ele.parentNode.insertBefore(errorEle,ele.nextSibling);
			} else {
				errorEle = ele.next()
			}
		}
		var value = ele.value;
		if(value == ele.placeholder) {
			value = '';
		}
		if(value == "") {
			errorEle.show();
			focusEle = ele;
			errorEle.getElementsByTagName('span')[0].innerHTML = "Please enter name";
			ele.addClassName("redborder");
			return false;
		} else if(!Validator.isValidName(value)) {
			errorEle.show();
			focusEle = ele;
			errorEle.getElementsByTagName('span')[0].innerHTML = "Please enter valid name";
			ele.addClassName("redborder");
			return false;
		} else {
			errorEle.hide();
			ele.removeClassName("redborder");
			return true;
		}
	},
	
	validatePassword : function(ele, errorEle) {
		
		if(typeof errorEle === "undefined") {
			if((typeof ele.next() === "undefined" || ele.next().className.indexOf("error-block") == -1)) {
				errorEle = new Element("div", {"class":"error-block","style":"display:none"});
				errorEle.innerHTML = "<div class='help_wrap'><p><span></span></p><div class='help_arrow'></div></div>";
				ele.parentNode.insertBefore(errorEle,ele.nextSibling);
			} else {
				errorEle = ele.next()
			}
		}
		
		if(ele.value == "" || (ele.placeholder == ele.value)) {
			errorEle.show();
			focusEle = ele;
			errorEle.getElementsByTagName('span')[0].innerHTML = "Please enter password";
			return false;
		} else if(ele.value.length < 6 ) {
			errorEle.show();
			focusEle = ele;
			errorEle.getElementsByTagName('span')[0].innerHTML = "Password should be atleast 6 char";
			return false;
		} else {
			errorEle.hide();
			return true;
		}
	},

	elementValidate:function(ele, errorEle, erroMessage){
		
		var value = ele.value;
		if(value == "") {
			errorEle.show();
			focusEle = ele;
			errorEle.getElementsByTagName('span')[0].innerHTML = erroMessage;
			ele.addClassName("redborder");
			return false;
		} else {
			errorEle.hide();
			ele.removeClassName("redborder");
			return true;
		}

	},

	isEmpty : function(str){
	
		var returnValue = false;		
					 		
		if((str == null)) {
			returnValue = true;
		}
		else if((str == '') || (str.search(/\s/) != -1)){
			str = str.trim();

			returnValue = true;
		}
				
		return returnValue;
	},

	isRegXMatching : function(regx_str, str){
		var returnValue = true;

		if(!Validator.isEmpty(str)){
			var matches = str.match(regx_str);
			if(matches == null || (matches[0] != name))
				returnValue = false;
		}
		else{
			returnValue = false;
		}

		return returnValue;
	},

	isValidDate : function(date_str){
		var date = new Date(date_str);

		return !isNaN(date.valueOf());
	},

	dateComparision : function(date1, date2, condition){
		var returnValue = false;

		if(!Validator.isEmpty(date1) && !Validator.isEmpty(date2) && !Validator.isEmpty(condition)){
			var d1 = new Date(date1);
			var d2 = new Date(date2);

			if (condition == "less" && d1 < d2) {
			  returnValue = true;
			}
			else if (condition == "greater" && d1 > d2) {
			  returnValue = true;
			}
		}

		return returnValue;
	},

	numberComparision : function(num1, num2, condition){
		var returnValue = false;

		if(!Validator.isEmpty(num1) && !Validator.isEmpty(num2) && !Validator.isEmpty(condition)){

			if(Validator.isNumeric(num1) && Validator.isNumeric(num2)){
				if (condition == "less" && num1 < num2) {
				  returnValue = true;
				}
				else if (condition == "greater" && num1 > num2) {
				  returnValue = true;
				}
			}						
		}

		return returnValue;
	},

	isValidPercentNumber : function(num){
		var returnValue = false;

		if(!Validator.isEmpty(num) && Validator.isNumeric(num)){
			if(num >= 0 && num <= 100){
				returnValue = true;
			}
		}

		return returnValue;
	},

	isValidImage : function(img_full_path){
		var allowedExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
		var fileExtension = img_full_path.split('.').pop().toLowerCase();

        var isValidFile = false;

        for(var index in allowedExtension) {

            if(fileExtension === allowedExtension[index]) {
                isValidFile = true; 
                break;
            }
        }
        
        return isValidFile;
	},

	isValidImageSize : function(img_full_path, img_size){
		if(img_size == undefined){
			img_size = (2 * 1024 * 1024);
		}
		//TODO: Add logic here
	}
	
}
