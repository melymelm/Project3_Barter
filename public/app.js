$("footer .social li").hover(function(){
  $("footer .social li").not(this).stop(true).animate({opacity: ".6"},250);
},function(){
  $("footer .social li").not(this).stop(true).animate({opacity: "1"},250);
});

$(".responsive span").click(function() {
  $(this).next("ul").slideToggle(250);
});

// db.traders.insert({"name": "Azim Uddin", "business": "Wraith Wranglers", "category": "paranormal investigation", "address": "1234 Fear Not Hwy, Durham, NC 27517", "phone": "234-567-8910", "rating": 9})