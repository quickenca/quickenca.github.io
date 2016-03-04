cssdropdown.startchrome("chromemenu")
 <!--
 var nav =document.getElementById("navigation");var arr =nav.getElementsByTagName("a");var selectedMenu ="Menu_1";for (var i=0;i<arr.length;i++){if (arr[i].href ==location.href){var temp =new Array();temp =arr[i].id.split("_");if (temp.length > 0){selectedMenu =temp[0] + "_"+ temp[1];break;}
 }
 }
 setActiveMenu(selectedMenu);