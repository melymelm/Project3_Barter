$("footer .social li").hover(function(){
  $("footer .social li").not(this).stop(true).animate({opacity: ".6"},250);
},function(){
  $("footer .social li").not(this).stop(true).animate({opacity: "1"},250);
});

$(".responsive span").click(function() {
  $(this).next("ul").slideToggle(250);
});