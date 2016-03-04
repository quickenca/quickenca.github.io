    function CheckForOther (item, origlen){
      var sitem = item.options[item.selectedIndex];

      if (item.selectedIndex == (item.length - 1)){
        var val = prompt ("ADD A NEW CHOICE:", "");

        if (val == null)
          item.selectedIndex = 0;
        else {
          var slen = item.length;

          if (slen == origlen+1){
            item.options[slen] = new Option (sitem.text, sitem.value);
                 }

          item.options[item.length-2].text = val;
          item.options[item.length-2].value = val;
          item.selectedIndex = item.length-2;
        }
      }
    }

    function validateFormField(val){
      return val.length != null && val != "";
      
    }

    function highlightRequiredFormFieldValue(fieldId){
      document.getElementById(fieldId).style.border = "1px solid red";
      document.getElementById(fieldId).style.backgroundColor = "lightyellow";
      document.getElementById(fieldId + "_label").style.color = "red";
    }

    function resethighlightRequiredFormFieldValue(fieldId){
      document.getElementById(fieldId).style.border = "1px solid gray";
      document.getElementById(fieldId).style.backgroundColor = "#fff";
      document.getElementById(fieldId + "_label").style.color = "gray";
    }

    function validateForm(myForm){
          var check = true;

      var obj = document.getElementById("firstname_Required");
      if (obj && obj.value == "yes"){
        var fieldVal = document.getElementById("firstname").value;
        if(!validateFormField(fieldVal)){
          highlightRequiredFormFieldValue("firstname");
                check = false;
            }
            else {
              resethighlightRequiredFormFieldValue("firstname");
            }
      }

      obj = document.getElementById("lastname_Required");
      if (obj && obj.value == "yes"){
        var fieldVal = document.getElementById("lastname").value;
        if(!validateFormField(fieldVal)){
          highlightRequiredFormFieldValue("lastname");
                check = false;
            }
            else {
              resethighlightRequiredFormFieldValue("lastname");
            }
      }

      obj = document.getElementById("email_Required");
      if (obj && obj.value == "yes"){
        var fieldVal = document.getElementById("email").value;
        if(!validateFormField(fieldVal)){
          highlightRequiredFormFieldValue("email");
                check = false;
            }
            else {
              resethighlightRequiredFormFieldValue("email");
            }
      }

      obj = document.getElementById("role_Required");
      if (obj && obj.value == "yes"){
        var fieldVal = document.getElementById("role").value;
        if(!validateFormField(fieldVal)){
          highlightRequiredFormFieldValue("role");
                check = false;
            }
            else {
              resethighlightRequiredFormFieldValue("role");
            }
      }

      obj = document.getElementById("company_Required");
      if (obj && obj.value == "yes"){
        var fieldVal = document.getElementById("company").value;
        if(!validateFormField(fieldVal)){
          highlightRequiredFormFieldValue("company");
                check = false;
            }
            else {
              resethighlightRequiredFormFieldValue("company");
            }
      }

      obj = document.getElementById("phone_Required");
      if (obj && obj.value == "yes"){
        var fieldVal = document.getElementById("phone").value;
        if(!validateFormField(fieldVal)){
          highlightRequiredFormFieldValue("phone");
                check = false;
            }
            else {
              resethighlightRequiredFormFieldValue("phone");
            }
      }

      obj = document.getElementById("city_Required");
      if (obj && obj.value == "yes"){
        var fieldVal = document.getElementById("city").value;
        if(!validateFormField(fieldVal)){
          highlightRequiredFormFieldValue("city");
                check = false;
            }
            else {
              resethighlightRequiredFormFieldValue("city");
            }
      }

      obj = document.getElementById("province_Required");
      if (obj && obj.value == "yes"){
        var fieldVal = document.getElementById("province").value;
        if(!validateFormField(fieldVal)){
          highlightRequiredFormFieldValue("province");
                check = false;
            }
            else {
              resethighlightRequiredFormFieldValue("province");
            }
      }

      obj = document.getElementById("qbtrialtellus_Required");
      if (obj && obj.value == "yes"){
        var fieldVal = document.getElementById("qbtrialtellus").value;
        if(!validateFormField(fieldVal)){
          highlightRequiredFormFieldValue("qbtrialtellus");
                check = false;
            }
            else {
              resethighlightRequiredFormFieldValue("qbtrialtellus");
            }
      }
      
      obj = document.getElementById("message_Required");
      if (obj && obj.value == "yes"){
        var fieldVal = document.getElementById("message").value;
        if(!validateFormField(fieldVal)){
          highlightRequiredFormFieldValue("message");
                check = false;
            }
            else {
              resethighlightRequiredFormFieldValue("message");
            }
      }

      //validate email value if it exists
      if (typeof document.getElementById("email") != "undefined"){
        var emailValue = document.getElementById("email").value;
        var emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(emailValue)){
          highlightRequiredFormFieldValue("email");
              check = false;
          }
          else {
            resethighlightRequiredFormFieldValue("email");
          }
      }

      if (check){
        document.getElementById("formValidationErrorInfo").innerHTML = "";

        var thankYouPageURL = "?thankYouPageURL=" + document.getElementById("thankYouPageURL").value + "&fname=" + document.getElementById("firstname").value + "&lname=" + document.getElementById("lastname").value + "&email=" + document.getElementById("email").value;

        if ((document.getElementById("pfSku") != null)&&(document.getElementById("pfSku") != "")){
        	if ((document.getElementById("company") != null)&&(document.getElementById("company") != "")){
        		thankYouPageURL = thankYouPageURL + "&pfSku=" + document.getElementById("pfSku").value + "&company=" + document.getElementById("company").value;
        	}
        	else{
        		thankYouPageURL = thankYouPageURL + "&pfSku=" + document.getElementById("pfSku").value;
        	}
        }
        if ((document.getElementById("emailTemplate") != null) && (document.getElementById("emailTemplate") != "")) {
        	thankYouPageURL = thankYouPageURL + "&emailTemplate=" + document.getElementById("emailTemplate").value;
        }
        if ((document.getElementById("language") != null) && (document.getElementById("language") != "")) {
        	thankYouPageURL = thankYouPageURL + "&language=" + document.getElementById("language").value;
        }
        document.getElementById("qbURL").value = document.getElementById("qbURL").value + thankYouPageURL;

      }
      else {
        var txt = "<table cellpadding=\"10\" cellspacing=\"0\" border=\"0\" width=\"100%\" style=\"border: 1px solid red;\"><tr bgcolor=\"lightyellow\"><td><font color=\"red\">" + document.getElementById("LeadGenFormFieldValidationMessage").value + "<td></tr></table><br/>";

        document.getElementById("formValidationErrorInfo").innerHTML = txt;
      }

      return check;
    }
