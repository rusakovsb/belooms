(function ($) {
	
  $(".mobile-nav-toggle").click(function() {               
    if(!$(this).hasClass("is-active")) {  
        $(this).addClass("is-active");          
        TweenMax.to(".mobile-nav", 0.3, {
            ease: Power1.easeOut,
            visibility: "visible",
            opacity: "1"     
        })       
    }
    else {      
        $(this).removeClass("is-active");      
        TweenMax.to(".mobile-nav", 0.3, {                
            ease: Power1.easeOut,
            opacity: "0",
            onComplete: function() {
                $(".mobile-nav").css("visibility", "hidden");
        }});      
    }
});
	
})(jQuery);



