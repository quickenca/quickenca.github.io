$(document).ready(function(){$('.micetypeheader').click(function(){if ($('.micetypecontent').css('display') =='none'){$('.micetypecontent').slideDown();$('.micetypeheader').removeClass('mt_closed').addClass('mt_open');}
 else{$('.micetypecontent').slideUp();$('.micetypeheader').removeClass('mt_open').addClass('mt_closed');}
 });if ($(".micetype-sup").length > 0) {$(".micetypeWrapper").css('display','block');}
 });