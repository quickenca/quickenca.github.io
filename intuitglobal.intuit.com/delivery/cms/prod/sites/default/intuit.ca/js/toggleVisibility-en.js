function toggleVisibility(divId) {
   var e = document.getElementById(divId);

   if(e.style.display == 'block')
      e.style.display = 'none';
   else
      e.style.display = 'block';
}

function toggleVisibility_PlusMinus(divId) {
   	var e = document.getElementById(divId);
	var imgObj = document.getElementById("img_" + divId);

	if(e.style.display == 'block'){
	   imgObj.src = "/images/icons/plus.jpg";
	   e.style.display = 'none';
	}
	else {
	   imgObj.src = "/images/icons/minus.jpg";
	   e.style.display = 'block';
	}
}

function hideDiv(divId){
    var divObj = document.getElementById(divId);
	var imgObj = document.getElementById("img" + divId);
	var linkObj = document.getElementById("link" + divId);
	var tdObj = document.getElementById("td" + divId);

	if (divObj.style.display == "block"){
		divObj.style.display = "none";
		imgObj.src = "/fr/images/comp-dropdown-button.jpg";
		linkObj.style.color = "#ffffff";
		tdObj.style.backgroundImage = "url(/fr/images/comp-back-closed.jpg)";			
	}			
}
		
function showDiv(divId, imgName){
    var divObj = document.getElementById(divId);
	var imgObj = document.getElementById("img" + divId);
	var linkObj = document.getElementById("link" + divId);
	var tdObj = document.getElementById("td" + divId);

	if(divObj.style.display == "none"){		  	
		divObj.style.display = "block";
		imgObj.src = "/fr/images/comp-dropdown-button-two.jpg";
		linkObj.style.color = "#ffffff";
		tdObj.style.backgroundImage = "url(/fr/images/comp-back-selected.jpg)";
  	}		
}
	
	
function hideDisplay(divId){   
	var divObj = document.getElementById(divId);

	if(divObj.style.display == "none"){
		showDiv(divId);		  	
	}
	else {
		hideDiv(divId);
	}		

	document.getElementById("linkshowHideAll").innerHTML = "Close all";			
	for (var i=0; i < ids.length; i++){		
		divObj = document.getElementById(ids[i]);
			
		if(divObj.style.display == "none"){
			document.getElementById("linkshowHideAll").innerHTML = "Show all";
			return;
		}
	}
}
	
function showHideAll(){		
	var divObj = document.getElementById("linkshowHideAll");

    if (divObj.innerHTML == "Show all"){		
		for (var i=0; i < ids.length; i++){
			showDiv(ids[i]);
		}		

		divObj.innerHTML = "Close all";
	}
	else if (divObj.innerHTML == "Close all"){
		for (var i=0; i < ids.length; i++){
			hideDiv(ids[i]);
		}		

		divObj.innerHTML = "Show all";
	}
}			
