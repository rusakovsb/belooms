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
        $(".page-title").lettering("words");
        TweenMax.staggerTo(".page-title span", 1, {
            ease: Expo.easeOut,
            opacity: "1",  
            y: "0" 
        }, 0.05);  
        $(".page-header").imagesLoaded( function() {
            TweenMax.to( ".page-header__image", 1, {
                ease: Expo.easeOut,   
                opacity: "1",         
                y: "0" 
            }); 
        });
        $(".about__image, .join__image").each(function() {
            var imgUrl = $(this).attr("data-image-src");
            $(this).css("background-image", "url("+imgUrl+")");      
        });
    };

    var hideContent = function() {        
        TweenMax.to( ".page-header__image", 1, {
            ease: Expo.easeOut,    
            opacity: "0",         
            y: "50px" 
        }); 
        TweenMax.staggerTo(".page-title span", 0.5, {
            ease: Expo.easeOut,
            opacity: "0"
        }, 0.05);         
    };

    var showMobileNav = function() {
        $(".mobile-nav-toggle").addClass("is-active");          
        $(".mobile-nav").fadeIn("200");  
        TweenMax.staggerTo(".mobile-menu__item", 0.5, {
            ease: Power1.easeOut,
            delay: 0.4,
            opacity: "1"   
        }, 0.02); 
    }; 

    var hideMobileNav = function() {
        $(".mobile-nav-toggle").removeClass("is-active");
        $(".mobile-nav").fadeOut("200"); 
            TweenMax.to(".mobile-menu__item", 0.2, {
            ease: Power1.easeIn,            
            opacity: "0" 
        }); 
    }; 

    $(".menu a, .site-branding__logo").addClass("ajax-link");

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
        if ( $(this).hasClass("mobile-menu__link") || $(this).hasClass("site-branding__logo") ) {
            hideMobileNav();
        }             
        var ajaxUrl = $(this).attr("href");        
        $.ajax({
            url: ajaxUrl,
            type: "POST",
            cache: "true",
            dataType: "html",  
            beforeSend: function() {
                hideContent();
            },         
            success: function(data) {
                setTimeout(function(){
                    $(".content").html($(data).find(".content").html());                                  
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

    $(".region-header-right").append('<button class="mobile-nav-toggle"><span></span><span></span></button>');

    $(".mobile-nav-toggle").click(function() {               
        if(!$(this).hasClass("is-active")) {  
            showMobileNav();
        }
        else {                    
            hideMobileNav();
        }
    });
    
})(jQuery);