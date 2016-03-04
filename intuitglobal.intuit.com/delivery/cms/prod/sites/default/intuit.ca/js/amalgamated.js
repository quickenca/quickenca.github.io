function goto_URL(object) {
    window.location.href =
    object.options[object.selectedIndex].value;
}

function popUp(vPage,vh,vw) {
    msgWindow=window.open(vPage,"popup","height=" + vh + ",width=" + vw + ",location=no,menubar=no,scrollbars=no,resizable=no,status=no");
    msgWindow.opener = window.self;
}

function chartPopUp(url,w,h){
    win = window.open(url, 'newWin'+new Date().getTime(), 'scrollbars=1,width='+w+',height='+h+',toolbar=0,status=0,menubar=0,links=0,resizable=0');
    win.window.focus();
}

function printWindow() {
    bV = parseInt(navigator.appVersion);
    if (bV >= 4) window.print();
}

function wcgToggleInverse(srcEl, divID)
{
    var checkBox = srcEl;
    if (checkBox.checked)
    {
        document.getElementById(divID).style.display = 'block';
    }
    else
    {
        document.getElementById(divID).style.display = 'none';
    }
}

function wcgToggle(srcEl, divID)
{
    var checkBox = srcEl;
    if (checkBox.checked)
    {
        document.getElementById(divID).style.display = 'none';
    }
    else
    {
        document.getElementById(divID).style.display = 'block';
    }
}

function wcgToggleCheck(targetId)
{
    var wcgCheckBox = document.getElementById(targetId);

    if (wcgCheckBox.checked)
    {
        wcgCheckBox.checked = false;
    }
    else
    {
        wcgCheckBox.checked = true;
    }
}

lockButton=0;

function checkpswd()
{
 b=document.login.pwd.value;
 if (b == 'education')
   location = "members.jsp"
 else
   location = "error.jsp"
}
function checkfrpswd()
{
 b=document.login.pwd.value;
 if (b == 'conseillerpro')
   location = "/membre/index.shtm"
 else
   location = "/membre/sorry.shtm"
}

function goSelectLink()
{
    var box = document.navform.navbox;
    var target = box.options[box.options.selectedIndex].value;

    if (checkForm() == true)
    {
        window.location = target;
    }
    else
    {
        return false;
    }
}

function checkForm()
{
    var box = document.navform.navbox;
    var target = box.options[box.options.selectedIndex].value;

    if (target == "unselected")
    {
        document.getElementById("error").style.display = "inline";
          return false;
      }
      else
      {
          document.getElementById("error").style.display = "none";
          return true;
      }
}

function replaceText(text, search, replace) {
    var newString;
    newString = text.replace(search, replace);

    return newString;
}

// frame busting code
// if (top != self) { top.location.replace(self.location.href); }
if (top.frames.length != 0 && top.frames[0].name != "testharnessform" && top.location.indexOf('http://visualwebsiteoptimizer.com') < 0) {
    top.location = self.document.location;
}

// Remove newline from after visible mboxes
$('document').ready(function(){
    $('.mboxDefault:visible').css("display", "inline");
    $('div[id^=mboxImported]:visible').css("display", "inline");
    $('div[id^=mboxClick]').css("display", "inline");
});


// Country Select Begin

$('document').ready(function(){
    $("body").click(function (evt) {
        var $target = $(evt.target);
        var caclicked = false;
        if($target.is("img") && $target.parent("#countryAnchor")) {
        	caclicked = true;
        }
        if($target.attr('id') != 'countryFormContainer' && $target.attr('id') != 'countryAnchor' && !caclicked ){
        	$('#countryFormContainer').slideUp('slow');
        }
    });
    $('#countryAnchor').click(function(){
        $('#countryFormContainer').slideDown('slow');
    });
});

// Country Select End

// Dropdown1 Select Begin

$('document').ready(function(){
    $('#dropdown1Anchor').click(function(){
        $('#dropdown1FormContainer').slideDown('slow');
    });

    $("body").click(function (evt) {
        var target = evt.target;
        if(target.id != 'dropdown1FormContainer' && target.id != 'dropdown1Anchor'){
            $('#dropdown1FormContainer').slideUp('slow');
       }
   });
});

// Dropdown1 Select End

// Dropdown2 Select Begin

$('document').ready(function(){
    $('#dropdown2Anchor').click(function(){
        $('#dropdown2FormContainer').slideDown('slow');
    });

    $("body").click(function (evt) {
        var target = evt.target;
        if(target.id != 'dropdown2FormContainer' && target.id != 'dropdown2Anchor'){
            $('#dropdown2FormContainer').slideUp('slow');
       }
   });
});

// Dropdown2 Select End

// CMS Chrome Start

//Chrome Drop Down Menu v2.01- Author: Dynamic Drive (http://www.dynamicdrive.com)
//Last updated: November 14th 06- added iframe shim technique

function setActiveMenu(menu) {
  var temp_menu = document.getElementById(menu);
  if(temp_menu != null)
      if (menu == "Menu_1"){
          temp_menu.style.background = "url(" + mediaURL + "/intuit.ca/images/template/home_hover_back.jpg)";
      }
      else {
          temp_menu.style.background = "url(" + mediaURL + "/intuit.ca/images/template/nav1_background_repeater_hover.jpg) center center repeat-x";
      }
}

function setActiveUKMenu(menu) {
  var temp_menu = document.getElementById(menu);
  if(temp_menu != null)
      if (menu == "TopMenu_1"){
          temp_menu.style.background = "url(" + mediaURL + "/intuit.co.uk/images/template/uk_home_hover_back.jpg)";
      }
      else {
          temp_menu.style.background = "url(" + mediaURL + "/intuit.co.uk/images/template/uk_nav1_background_repeater_hover.jpg) center center repeat-x";
      }
}

var cssdropdown={
disappeardelay: 250, //set delay in miliseconds before menu disappears onmouseout
disablemenuclick: false, //when user clicks on a menu item with a drop down menu, disable menu item's link?
enableswipe: 1, //enable swipe effect? 1 for yes, 0 for no
enableiframeshim: 1, //enable "iframe shim" technique to get drop down menus to correctly appear on top of controls such as form objects in IE5.5/IE6? 1 for yes, 0 for no

//No need to edit beyond here////////////////////////
dropmenuobj: null, ie: document.all, firefox: document.getElementById&&!document.all, swipetimer: undefined, bottomclip:0,

getposOffset:function(what, offsettype){
var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
var parentEl=what.offsetParent;
while (parentEl!=null){
totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
parentEl=parentEl.offsetParent;
}
return totaloffset;
},

swipeeffect:function(){
if (this.bottomclip<parseInt(this.dropmenuobj.offsetHeight)){
this.bottomclip+=10+(this.bottomclip/10) //unclip drop down menu visibility gradually
this.dropmenuobj.style.clip="rect(0 auto "+this.bottomclip+"px 0)"
}
else
return
this.swipetimer=setTimeout("cssdropdown.swipeeffect()", 10)
},

showhide:function(obj, e){
if (this.ie || this.firefox)
this.dropmenuobj.style.left=this.dropmenuobj.style.top="-500px"
if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover"){
if (this.enableswipe==1){
if (typeof this.swipetimer!="undefined")
clearTimeout(this.swipetimer)
obj.clip="rect(0 auto 0 0)" //hide menu via clipping
this.bottomclip=0
this.swipeeffect()
}
obj.visibility="visible"
}
else if (e.type=="click")
obj.visibility="hidden"
},

iecompattest:function(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
},

clearbrowseredge:function(obj, whichedge){
var edgeoffset=0
if (whichedge=="rightedge"){
var windowedge=this.ie && !window.opera? this.iecompattest().scrollLeft+this.iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetWidth
if (windowedge-this.dropmenuobj.x < this.dropmenuobj.contentmeasure)  //move menu to the left?
edgeoffset=this.dropmenuobj.contentmeasure-obj.offsetWidth
}
else{
var topedge=this.ie && !window.opera? this.iecompattest().scrollTop : window.pageYOffset
var windowedge=this.ie && !window.opera? this.iecompattest().scrollTop+this.iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetHeight
if (windowedge-this.dropmenuobj.y < this.dropmenuobj.contentmeasure){ //move up?
edgeoffset=this.dropmenuobj.contentmeasure+obj.offsetHeight
if ((this.dropmenuobj.y-topedge)<this.dropmenuobj.contentmeasure) //up no good either?
edgeoffset=this.dropmenuobj.y+obj.offsetHeight-topedge
}
}
return edgeoffset
},

dropit:function(obj, e, dropmenuID){
if (this.dropmenuobj!=null) //hide previous menu
this.dropmenuobj.style.visibility="hidden" //hide menu
this.clearhidemenu()
if (this.ie||this.firefox){
obj.onmouseout=function(){cssdropdown.delayhidemenu()}
obj.onclick=function(){return !cssdropdown.disablemenuclick} //disable main menu item link onclick?
this.dropmenuobj=document.getElementById(dropmenuID)

if (this.dropmenuobj!=null){
this.dropmenuobj.onmouseover=function(){cssdropdown.clearhidemenu()}
this.dropmenuobj.onmouseout=function(e){cssdropdown.dynamichide(e)}
this.dropmenuobj.onclick=function(){cssdropdown.delayhidemenu()}
this.showhide(this.dropmenuobj.style, e)
this.dropmenuobj.x=this.getposOffset(obj, "left")
if (this.firefox){
  this.dropmenuobj.y=this.getposOffset(obj, "top") - 12;
}
else {
  this.dropmenuobj.y=this.getposOffset(obj, "top")
}
this.dropmenuobj.style.left=this.dropmenuobj.x-this.clearbrowseredge(obj, "rightedge")+"px"
this.dropmenuobj.style.top=this.dropmenuobj.y+obj.offsetHeight+"px"
this.positionshim() //call iframe shim function
}
}
},

positionshim:function(){ //display iframe shim function
if (this.enableiframeshim && typeof this.shimobject!="undefined"){
if (this.dropmenuobj.style.visibility=="visible"){
this.shimobject.style.width=this.dropmenuobj.offsetWidth+"px"
this.shimobject.style.height=this.dropmenuobj.offsetHeight+"px"
this.shimobject.style.left=this.dropmenuobj.style.left
this.shimobject.style.top=this.dropmenuobj.style.top
}
this.shimobject.style.display=(this.dropmenuobj.style.visibility=="visible")? "block" : "none"
}
},

hideshim:function(){
if (this.enableiframeshim && typeof this.shimobject!="undefined")
this.shimobject.style.display='none'
},

contains_firefox:function(a, b) {
while (b.parentNode)
if ((b = b.parentNode) == a)
return true;
return false;
},

dynamichide:function(e){
var evtobj=window.event? window.event : e
if (this.ie&&!this.dropmenuobj.contains(evtobj.toElement))
this.delayhidemenu()
else if (this.firefox&&e.currentTarget!= evtobj.relatedTarget&& !this.contains_firefox(evtobj.currentTarget, evtobj.relatedTarget))
this.delayhidemenu()
},

delayhidemenu:function(){
this.delayhide=setTimeout("if (cssdropdown.dropmenuobj !=null)cssdropdown.dropmenuobj.style.visibility='hidden'; cssdropdown.hideshim()",this.disappeardelay) //hide menu
},

clearhidemenu:function(){
if (this.delayhide!="undefined")
clearTimeout(this.delayhide)
},

startchrome:function(){
for (var ids=0; ids<arguments.length; ids++){
var menuitems=document.getElementById(arguments[ids]).getElementsByTagName("a")
for (var i=0; i<menuitems.length; i++){
if (menuitems[i].getAttribute("rel")){
var relvalue=menuitems[i].getAttribute("rel")
menuitems[i].onmouseover=function(e){
var event=typeof e!="undefined"? e : window.event
cssdropdown.dropit(this,event,this.getAttribute("rel"))
}
}
}
}
if (window.createPopup && !window.XmlHttpRequest){ //if IE5.5 to IE6, create iframe for iframe shim technique
document.write('<IFRAME id="iframeshim"  src="" style="display: none; left: 0; top: 0; z-index: 90; position: absolute; filter: progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)" frameBorder="0" scrolling="no"></IFRAME>')
this.shimobject=document.getElementById("iframeshim") //reference iframe object
}
}

}

// CMS Chrome End

// Grayout Start

//==============================================================================================
//Don't modify the next 2 functions as these are the window style elements for all grayour popus
//==============================================================================================
function popup_prefix(window_title, window_width){
 return '<div class="lightbox" style="width:' + window_width + ';"><table border="0" cellpadding="0" cellspacing="0"><tr><td style="width:4px; height:29px;" border="0"></td><td style="height: 29px;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="padding-left:10px; font-weight:bold; font-size: 18px; color: #006699;"><span id="popup-title">' + window_title + '</span></td><td valign="top" style="padding-right: 8px;"><a href="javascript:window.close();"><img id="popup-close" src="/en/images_/popup-close.jpg" border="0" alt="Close" width="10" height="10" align="right"></a></td></tr></table></td><td style="width:4px; height:29px;" border="0"></td></tr><tr><td style="width:4px; height:4px;" border="0"></td><td border="0" valign="top" style="padding:10px;">';
}

function popup_prefix_fr(window_title, window_width){
 return '<div class="lightbox" style="width:' + window_width + ';"><table border="0" cellpadding="0" cellspacing="0"><tr><td style="width:4px; height:29px; background-color:#ffffff;" border="0"></td><td style="height: 29px;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="padding-left:10px; font-weight:bold; font-size: 18px; color: #006699;"><span id="popup-title">' + window_title + '</span></td><td valign="top" style="padding-right: 8px;"><a href="javascript:window.close();"><img id="popup-close" src="/en/images_/popup-close.jpg" border="0" alt="Close" width="10" height="10" align="right"></a></td></tr></table></td><td style="width:4px; height:29px; background-color:#ffffff;" border="0"></td></tr><tr><td style="width:4px; height:4px;" border="0"></td><td border="0" valign="top" style="padding:10px;">';
}

function popup_suffix(){
 return '</td><td style="width:4px; height:3px;" border="0"></td></tr><tr><td style="width:4px; height:4px;" border="0"></td><td style="height: 5px;"></td><td style="width:4px; height:4px;"></td></tr></table></div>';
}
//==============================================================================================

function popup_lightbox(title, width, divId, language){
 var content = $('#' + divId).html();
 if(language == 'fr')
   grayPopup(true, popup_prefix_fr(title, width) + content + popup_suffix());
 else
   grayPopup(true, popup_prefix(title, width) + content + popup_suffix());
}

function popup(window_title, description, window_width){
 grayPopup(true, popup_prefix(window_title, window_width) + description + popup_suffix());
}

//Now for the code that actually does the grayout popup.

function grayPopup(vis, html){
grayOut(vis);
displayHtml(vis, html);
}

function grayOut(vis) {
var dark=document.getElementById('darkScreen');
if (!dark) {
  dark = document.createElement('div');
  dark.style.position = "absolute";
  dark.style.top = "0px";
  dark.style.left = "0px";
  dark.style.overflow = "hidden";
  dark.style.display = "none";
  dark.id = "darkScreen";

  document.getElementsByTagName("body")[0].appendChild(dark);
}

hideDropDowns(vis);

if (vis) {
 setOpacity(dark, 0.7);

 dark.style.zIndex = 50;
 dark.style.backgroundColor = "#cccccc";
 dark.style.width = getFullWidth() + "px";
 dark.style.height = getFullHeight() + "px";
 dark.style.display = "block";
}
else{
  dark.style.display = "none";
}
}

function hideDropDowns(vis){
var dd = document.getElementsByTagName("select");

if(!vis){
   for(x = 0; x < dd.length; x++){
      dd[x].style.display = dd[x].oldDisplay;
   }
}
else{
   for(x = 0; x < dd.length; x++){
      dd[x].oldDisplay = dd[x].style.display;
      dd[x].style.display = "none";
   }
}
}

function setOpacity(obj, opacity){
obj.style.opacity = opacity;
obj.style.MozOpacity = opacity;
obj.style.filter = "alpha(opacity=" + (opacity*100) + ")";
}

function getScreenHeight(){
 if (self.innerHeight)
     return self.innerHeight;
 else if (document.documentElement && document.documentElement.clientHeight)
     return document.documentElement.clientHeight;
 else if (document.body)
     return document.body.clientHeight;
}

function getScreenWidth(){
 if (self.innerWidth)
     return self.innerWidth;
 else if (document.documentElement && document.documentElement.clientWidth)
     return document.documentElement.clientWidth;
 else if (document.body)
     return document.body.clientWidth;
}

function getFullHeight(){
var d = document.getElementsByTagName("body")[0];
if(d.scrollHeight)
   return d.scrollHeight;
else
   return d.offsetHeight;
}

function getFullWidth(){
var d = document.getElementsByTagName("body")[0];
if(d.scrollWidth)
   return d.scrollWidth;
else
   return d.offsetWidth;
}
var keepAdjusting = false;
var adjustWait = 10;
var adjustTotalWait = 100; //10000;
var adjustCount = 0;

function adjustLocation(){
var display = document.getElementById("displayPopup");
var t = ((getScreenHeight() - display.offsetHeight)/2) + document.body.scrollTop;
var l = ((getScreenWidth() - display.offsetWidth)/2) + document.body.scrollLeft;

if(t < 0) t = 0;
if(l < 0) l = 0;

if(keepAdjusting && (adjustCount++*adjustWait)<adjustTotalWait){
    display.style.top = t + "px";
    display.style.left = l + "px";
    setTimeout("adjustLocation()",adjustWait);
}
else{
   keepAdjusting = false;
   adjustCount = 0;
}
}

function displayHtml(vis, html){
var display = document.getElementById("displayPopup");
if(!display){
   display = document.createElement("div");
   display.style.position = "absolute";
   display.style.overflow = "hidden";
   display.style.display = "none";
   display.id = "displayPopup";

   document.getElementsByTagName("body")[0].appendChild(display);
}

keepAdjusting = vis;

if(vis){
    display.style.zIndex = 100;
    display.style.backgroundColor = "#FFFFFF";
    display.style.display = "block";

    display.innerHTML = html;
    adjustLocation();
 }
 else{
    display.style.display = "none";
    display.innerHTML = "";
 }
}


function close(){
grayPopup(false);
}

window.close = close;

// Grayout End

// Banner Scroller Start

current = 1;
var isBannerScrolling = true;

$('document').ready(function(){
    $('.slides').hover(bannerMouseIn, bannerMouseOut);
});

function bannerMouseIn(){
    isBannerScrolling = false;
}

function bannerMouseOut(){
    isBannerScrolling = true;
}

function nextPicture(num, totalBannerImages) {
    if(isBannerScrolling){
        num--;
        // alert(totalBannerImages);
        if (num < 0){
            clearTimeout(f);
            return;
        }

        // Hide current picture
        $('#slide' + current).hide();

        // Show next picture, if last, loop back to front
        if (current == totalBannerImages) { current = 1; }
        else { current++ }

        $('#slide' + current).show();

        f = setTimeout("nextPicture("+num+","+totalBannerImages+")",10000);
    }
    else{
        f = setTimeout("nextPicture("+current+","+totalBannerImages+")",10000);
    }
}

function previousPicture(totalBannerImages) {
    // Hide current picture
    // alert(totalBannerImages);
    object = document.getElementById('slide' + current);
    object.style.display = 'none';

    if (current == 1) { current = totalBannerImages; }
    else { current--; }
    object = document.getElementById('slide' + current);
    object.style.display = 'block';
}

// Banner Scroller End

// Cms Product Detail Begin

var lastTab = "";
xmlDoc = null;

$('document').ready(function(){

    $('.buynow').click(buynowAction);
    $('.buynow').change(buynowAction);

    if(xmlDoc != null) postBuyNow();

    $('.buynow').click(buyxsellnowAction);
    $('.buynow').change(buyxsellnowAction);

    $('.buyxsellnow').click(buyxsellnowAction);
    $('.buyxsellnow').change(buyxsellnowAction);

    $('#addToCart').click(addToCart);

    if($.browser.msie && $.browser.version=="6.0"){
        $('#addToCart').attr("href", "#");
    }
});

function addToCart(){
    var numberOfSkus = $('#currentSku').val().split(",").length;
    var quantity = "1";
    var currentSku = $('#currentSku').val();
    var additionalSku = $('#additionalSku').val();
    var xSellSkus = $('#xSellSkus').val();
    var interruptorURI = $('#interruptorURI').val();

    if(additionalSku != null && additionalSku != ""){
        if($('#storeSet').val() != "calgary") quantity += ",1";
        currentSku += "," + additionalSku;
    }

    if (xSellSkus != null && xSellSkus != ""){
    	xSellSkus = xSellSkus.split(",");
	    if (xSellSkus.length > 0){
	    	if($('#storeSet').val() != "calgary"){
		    	for (var i=0,j=xSellSkus.length; i<j; i++){
			    	currentSku += "," + xSellSkus[i];
			    	quantity += ",1";
			    }
	    	}
	    }
    }

    if($('#storeSet').val() != "calgary"){
        for(x = 1; x < numberOfSkus; x++){
            quantity += ",1";
        }
    }


    if(interruptorURI!=null && interruptorURI!=""){
    	
        self.location= interruptorURI+"?SkuId="  + currentSku + "&Quantity=" + quantity + "&catId=" + $('#catId').val() + "&priorityCode=" + $('#campId').val() + "&language=" + $('#lang').val();;
    }else{
        var store = $('#AddToCart').val();
        self.location = store + "/AddSoftGoodToCart.jsp?SkuId=" + currentSku + "&Quantity=" + quantity + "&catId=" + $('#catId').val() + "&priorityCode=" + $('#campId').val() + "&language=" + $('#lang').val();
    }
}

function buynowAction(){
    if (this.type == "radio" && this.checked) {
        postBuyNow();
    }
    else
        if (this.type != "radio") {
            postBuyNow();
        }
}

var xSellSkusIdArray = [];
var xSellSkusDataArray = [];

function buyxsellnowAction(){
	var targetItemName = this.name.split("_")[0];
	var targetItemValue = this.value;
	var inputType = "";

	$('.buyxsellnow').each(function(){
		if (this.type == "hidden"){
			inputType = this.value;
		}

		if (this.type == "image"){
			var currentItemName = this.name.split("_")[0];
			if (currentItemName == targetItemName){
				if (this.value == targetItemValue){
					if (jQuery.trim($(this).attr("src")) == jQuery.trim($('.remove_ImagePath_' + targetItemValue).val())){
						$(this).attr("src", $('.select_ImagePath_' + targetItemValue).val());
						$(this).attr("alt", $('.select_AltText_' + targetItemValue).val());
						$(this).attr("width", $('.select_Width_' + targetItemValue).val());
						$(this).attr("height", $('.select_Height_' + targetItemValue).val());

						if (jQuery.inArray(targetItemValue, xSellSkusIdArray) != -1){
							xSellSkusDataArray[targetItemValue] = "";
							delete xSellSkusDataArray[targetItemValue];
							delete xSellSkusIdArray[targetItemValue];
						}
					}
					else {
						$(this).attr("src", $('.remove_ImagePath_' + targetItemValue).val());
						$(this).attr("alt", $('.remove_AltText_' + targetItemValue).val());
						$(this).attr("width", $('.remove_Width_' + targetItemValue).val());
						$(this).attr("height", $('.remove_Height_' + targetItemValue).val());

						xSellSkusIdArray.push(targetItemValue);

						if ($('span.skuSavings_' + targetItemValue).html() != null){
							xSellSkusDataArray[targetItemValue] = '<hr/><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" width="70%">' + $('div.skuHeader_' + targetItemValue).html() + '<br>' + $('span.skuSavings_' + targetItemValue).html() + '</td><td align="right" class="r_15pad" valign="top" width="30%">' + $('div.skuPrice_' + targetItemValue).html() + '</td></tr></table>';
						}
						else{
							xSellSkusDataArray[targetItemValue] = '<hr/><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" width="70%">' + $('div.skuHeader_' + targetItemValue).html() + '</td><td align="right" class="r_15pad" valign="top" width="30%">' + $('div.skuPrice_' + targetItemValue).html() + '</td></tr></table>';
						}
					}
				}
				else {
					if (inputType == "radio") {
						$(this).attr("src", $('.select_ImagePath_' + this.value).val());
						$(this).attr("alt", $('.select_AltText_' + this.value).val());
						$(this).attr("width", $('.select_Width_' + this.value).val());
						$(this).attr("height", $('.select_Height_' + this.value).val());

						xSellSkusDataArray[this.value] = "";
						delete xSellSkusDataArray[this.value];
						delete xSellSkusIdArray[this.value];
					}
				}
			}
		}
		else {
			if ((this.type == "radio" || this.type == "checkbox")){
				if (this.checked){
					xSellSkusIdArray.push(this.value);

					if ($('span.skuSavings_' + this.value).html() != null){
						xSellSkusDataArray[this.value] = '<hr/><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" width="70%">' + $('div.skuHeader_' + this.value).html() + '<br>' + $('span.skuSavings_' + this.value).html() + '</td><td align="right" class="r_15pad" valign="top" width="30%">' + $('div.skuPrice_' + this.value).html() + '</td></tr></table>';
					}
					else {
						xSellSkusDataArray[this.value] = '<hr/><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" width="70%">' + $('div.skuHeader_' + this.value).html() + '</td><td align="right" class="r_15pad" valign="top" width="30%">' + $('div.skuPrice_' + this.value).html() + '</td></tr></table>';
					}
				}
				else {
					if (jQuery.inArray(this.value, xSellSkusIdArray) != -1){
						xSellSkusDataArray[this.value] = "";
						delete xSellSkusDataArray[this.value];
						delete xSellSkusIdArray[this.value];
					}
				}
			}
		}
	});

	if (xSellSkusIdArray.length > 0){
		var str = "";
		xSellSkusIdArray = [];
		var subTotalList = 0.0;
		var subTotalDiscounted = 0.0;
		var tempListPrice = 0.0;
		var tempDiscountedPrice = 0.0;
		var tempPrice = 0.0;
		var language = $('#lang').val();
		var currencySymbol = $('#currencySymbol').val();
		var SideCarCrossSellSubTotalHeader = $('#SideCarCrossSellSubTotalHeader').val();
		var SideCarCrossSellSubTotalYouSavedHeader = $('#SideCarCrossSellSubTotalYouSavedHeader').val();

		if (language == 'fr'){
			tempListPrice = $('span.listPrice').text().replace(/\$|\£|\&pound\;|\/month/g, '').replace(/,/g, '.')
		}
		else {
			tempListPrice = $('span.listPrice').text().replace(/\$|\£|\&pound\;|\/month|,/g, '').replace(/,/g, '.');
		}

		if (isNaN(tempListPrice)){
			if (language == 'fr'){
				tempListPrice = $('#skuListPrice').text().replace(/\$|\£|\&pound\;|\/month/g, '').replace(/,/g, '.');
				tempDiscountedPrice = $('#campaignDiscountedPrice').text().replace(/\$|\£|\&pound\;|\/month/g, '').replace(/,/g, '.');
			}
			else {
				tempListPrice = $('#skuListPrice').text().replace(/\$|\£|\&pound\;|\/month|,/g, '').replace(/,/g, '.');
				tempDiscountedPrice = $('#campaignDiscountedPrice').text().replace(/\$|\£|\&pound\;|\/month|,/g, '').replace(/,/g, '.');
			}

		}
		else {
			tempDiscountedPrice = tempListPrice;
		}

		if (isNaN(tempListPrice) == false){
			subTotalList = parseFloat(tempListPrice);

			if (isNaN(tempDiscountedPrice)){
				subTotalDiscounted = parseFloat(tempListPrice);
			}
			else {
				subTotalDiscounted = parseFloat(tempDiscountedPrice);
			}
		}

		for (key in xSellSkusDataArray){
			if (xSellSkusDataArray[key] != null && xSellSkusDataArray[key] != ""){
				str += xSellSkusDataArray[key];
				xSellSkusIdArray.push(key);

				tempPrice = $('#listPrice_' + key).val();
				if (isNaN(tempPrice) == false){
					subTotalList += parseFloat(tempPrice);
				}

				tempPrice = $('#discountedPrice_' + key).val();
				if (isNaN(tempPrice) == false){
					subTotalDiscounted += parseFloat(tempPrice);
				}
			}
		}

		if (isNaN(subTotalList) == false && (subTotalList-subTotalDiscounted).toFixed(2) > 0){
			str += '<hr/><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="70%" valign="top"><h2>' + SideCarCrossSellSubTotalHeader + '</h2><br><strong><font color="green">' + SideCarCrossSellSubTotalYouSavedHeader + ' ' + formatCurrency(currencySymbol, (subTotalList-subTotalDiscounted), language)  + '</font></strong></td><td align="right" class="r_15pad" width="30%" valign="top"><span class="price_gray">' + formatCurrency(currencySymbol, subTotalList, language) + '</span><br><span class="qb-price14">' + formatCurrency(currencySymbol, subTotalDiscounted, language) + '</span></td></tr></table>';
		}
		else {
			str += '<hr/><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="70%"><h2>' + SideCarCrossSellSubTotalHeader + '</h2></td><td align="right" class="r_15pad" width="30%"><span class="qb-price14">' + formatCurrency(currencySymbol, subTotalDiscounted, language) + '</span></td></tr></table>';
		}
	}

	if (xSellSkusIdArray.length > 0){
		$('.xsellselectedskulist').html(str);

		$('#xSellSkus').val(xSellSkusIdArray.join(','));
	}
	else {
		xSellSkusIdArray = [];
		xSellSkusDataArray = [];
		$('.xsellselectedskulist').html("");

		$('#xSellSkus').val("");
	}
}


function formatCurrency(currencySymbol, number, language) {
	var str = number.toFixed(2).toString();
	var i = str.indexOf(".");

	if (i<1) {
		i=str.length;
	}

	while (i>3) {
		i-=3;
		var j = str.charAt(i-1);

		if (j>="0" && j<="9") {
			if (language == "fr"){
				str = str.substr(0,i) + " " + str.substr(i);
			}
			else {
				str = str.substr(0,i) + "," + str.substr(i);
			}
		}
	}

	if (language == "fr"){
		str = str.replace(/\./g, ',') + ' ' + currencySymbol;
	}
	else {
		str = currencySymbol + str;
	}

	return str;
}

function switchTabColor(name, color){
    $('#' + name + '_left').attr({src: '/en/images/tab_left_' + color + '.gif'});
    $('#' + name + '_right').attr({src: '/en/images/tab_right_' + color + '.gif'});
    $('#' + name + '_tab').css({backgroundImage: 'url(/en/images/tab_center_' + color + '.gif)'});
}

function postBuyNow(){
    var dataArray = {};
    //dataArray["task"] = "xml";
    var count = 0;

    $('.buynow').each(function(){
    	var primarySkuMediaType = this.value;
    	if (this.type == "radio" && $('div.related_' + primarySkuMediaType).css('display') != undefined){
    		$('div.related_' + primarySkuMediaType + ' .buyxsellnow').each(function(){
    			if (this.type == "image"){
    				var selectImageSrc = $('.select_ImagePath_' + this.value).val();
    				if (jQuery.trim(this.src) != jQuery.trim(selectImageSrc)){
    					this.click();
    				}

    				$('div.related_' + primarySkuMediaType).css('display', 'none');
    			}
    		});
    	}

        if ((this.type == "radio" && this.checked) || this.type == "hidden") {
        	if (this.type == "radio" && this.checked){
        		if ($('div.related_' + this.value).css('display') != undefined){
        			$('div.related_' + this.value).css('display', 'block');
        		}
        	}

        	dataArray[this.name] = this.value;

            $('#' + this.name + "_summary").html($(this).attr("alt") + "<br />");
        }
        else if (this.type != "radio") {
            dataArray[this.name] = this.value;
        }
    });

    $('sku', xmlDoc).each(function(id){
        var sku = $('sku', xmlDoc).get(id);

        var check = true;

        $('field', sku).each(function(fieldId){
            var field = $('field', sku).get(fieldId);

            var r = dataArray[$('name', field).text()];
            var val = $('value', field).text();
            if(r != val){
                check = false;
            }
        });

        if(check){
            var hide = $(sku).attr("hide");
            var select = $(sku).attr("select");
            var extra = $(sku).attr("extra");
            var attr = $(sku).attr("attr");
            var additionalSku = $(sku).attr("additionalsku");

            if(additionalSku == undefined){
                additionalSku = "";
            }

            $('.buynow_field').removeClass("disabled-field");
            $('.buynow_field input').removeAttr("disabled");
            $('.buynow_field input').removeAttr("readonly");

            if(hide != null && hide != ""){
                $('#' + hide).addClass("disabled-field");
                $('#' + hide + ' input').attr("disabled", true);
                $('#' + hide + ' input').attr("readonly", true);
            }

            if(select != null && select != ""){
                var selectedField = select.split("=");
                $("input[name='" + selectedField[0] + "'][value='" + selectedField[1] + "']").attr("checked", "checked");
            }

            if(extra != null && extra == "true"){
                $('.extra').show();
            }
            else{
                $('.extra').hide();
            }

            $('.listPrice').html(skuRef[attr]);
            $('#currentSku').val(attr);
            $('#additionalSku').val(additionalSku);
        }
    });
}

function getValue(xml, name){
    return xml.substring(xml.indexOf(name + ">") + name.length+1, xml.indexOf("</" + name));
}

// Cms Product Detail End

$(window).load(function(){
    if(self.location.href.indexOf("#jump") != -1){
        var targetOffset = $('#scrollTo').offset().top;
        $('html,body').animate({scrollTop: targetOffset}, 1000);
    }
});

//Gray out popup

jQuery.fn.center = function () {
 this.css("position","absolute");
 this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
 this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
 return this;
}

function getFullHeight(){
var d = document.getElementsByTagName("body")[0];
if(d.scrollHeight)
   return d.scrollHeight;
else
   return d.offsetHeight;
}

function getFullWidth(){
var d = document.getElementsByTagName("body")[0];
if(d.scrollWidth)
   return d.scrollWidth;
else
   return d.offsetWidth;
}

function intu_open(url){
 if(url.indexOf(".pdf") != -1){
     window.open(url.substring(0, url.lastIndexOf("?")), "pdf_popup");
 }
 else{
     if(document.getElementById("popup_screen") == null){
         // setup everything only if popup exists, which will happen the first time it is clicked

         $("body").append('<div id="popup_screen"></div>');
         $("body").append('<div id="popup_screen_wait"><img src="http://intuitglobal.intuit.com/delivery/cms/prod/sites/default/intuit.ca/images/qt-2010-images/bar.gif" /></div>');
         $("body").append('<div id="grayout_background"></div>');

         $(document).keypress(function(e){
             if(e.keyCode==27){
                 intu_close();
             }
         });

         $("#grayout_background").click(function(){
             intu_close();
         });
     }

     $("#grayout_background").css({"opacity" : "0.7", "height" : getFullHeight(), "width" : getFullWidth()}).fadeIn("slow");
     $("#popup_screen_wait").center().fadeIn("slow");
     $.get(url, function(data){
         $("#popup_screen_wait").hide();
         $("#popup_screen").html(data).center();
         $("#popup_screen").fadeIn("slow");
     });
 }
}

function intu_close(){
 $("#popup_screen_wait").hide();
 $("#grayout_background").fadeOut("slow");
 $("#popup_screen").fadeOut("slow");
 setTimeout("location.reload(true);",1500);
}