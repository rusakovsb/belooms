(function ($) {

    var showNav = function() {
        TweenMax.to( ".site-branding__logo", 1, {
            ease: Expo.easeOut,            
            x: "0" 
        });  
        TweenMax.staggerTo(".main-menu__item, .top-menu__item", 1, {
            ease: Power1.easeOut,
            delay: 0.2,
            opacity: "1"   
        }, 0.05);        
    };

    var showContent = function() {
        TweenMax.to(".overlay", 0.2, {
            ease: Power1.easeIn,            
            opacity: "1" 
        });   
    };

    var hideContent = function() {
        TweenMax.to(".overlay", 0.2, {
            ease: Power1.easeOut,            
            opacity: "0" 
        });           
    };

    $(".main-menu a, .top-menu a, .footer-menu a, .site-branding__logo").addClass("ajax-link");

    $(window).on("load", function() { 
        showNav();              
        showContent();
    });

    $(document).on("click", ".ajax-link", function(event) {
        event.preventDefault();
        $(".ajax-link").not(this).removeClass("is-active");
        $(this).addClass("is-active"); 
        if ($(this).hasClass("site-branding__logo")) {
            $(".top-menu__item:first-child a").addClass("is-active");
        }
        hideContent();     
        var ajaxUrl = $(this).attr("href");        
        $.ajax({
            url: ajaxUrl,
            type: "POST",
            cache: "true",
            dataType: "html",            
            success: function(data) {
                setTimeout(function(){
                    $(".content").html($(data).find(".content").html());
                    $(".featured").html($(data).find(".featured").html());  
                    showContent();              
                    document.title = ( $(data).find(".page-title").text() + " " + "|" + " " + "БелООМС" );                       
                    window.history.pushState(null, null, ajaxUrl);            
                    $(window).scrollTop(0); 
                },200);    
            }
        });    
  
    });
    window.onpopstate = function() {
        location.reload();
    };

    $(".region-header-right").append('<button class="mobile-nav-toggle"><span></span><span></span><span></span></button>');

    $(".mobile-nav-toggle").click(function() {               
        if(!$(this).hasClass("is-active")) {  
            $(this).addClass("is-active");          
            $(".mobile-nav").fadeIn("200");  
            TweenMax.staggerTo(".mobile-menu__item", 0.5, {
                ease: Power1.easeOut,
                delay: 0.2,
                opacity: "1"   
            }, 0.02);    
        }
        else {      
            $(this).removeClass("is-active");      
            $(".mobile-nav").fadeOut("200"); 
            TweenMax.to(".mobile-menu__item", 0.2, {
                ease: Power1.easeIn,            
                opacity: "0" 
            });     
        }
    });
    
})(jQuery);