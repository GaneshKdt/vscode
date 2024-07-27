import $ from 'jquery';
import 'jquery.animate';

$.fn.fbReaction = function(){
  $(".like-btn").hover(function() {
    console.log("-------------------------------->Reaction Hover Called")
    $(this).find(".reaction-box").fadeIn(100, function() {
      $(this).find(".reaction-icon").each(function(i, e) {
        setTimeout(function(){
          $(e).addClass("show");
        }, i * 100);
      });
    });
  }, function() {
    setTimeout(function(){
      $(".reaction-box").fadeOut(300, function(){ //300 initially
        $(".reaction-icon").removeClass("show")
      })
    }, 500); //500 initially
  });
}