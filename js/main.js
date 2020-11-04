(function ($) {

    var showHeader = function() {
        TweenMax.to( ".site-branding__logo", 1, {
            ease: Expo.easeOut,            
            x: "0" 
        });  
        TweenMax.to( ".region-header, .region-topbar", 0.5, {
            ease: Power1.easeOut,            
            opacity: "1" 
        });  
        TweenMax.staggerTo(".main-menu__item", 1, {
            ease: Power1.easeOut,
            delay: 0.2,
            opacity: "1"   
        }, 0.05); 
        TweenMax.staggerTo(".top-menu__item", 1, {
            ease: Power1.easeOut,
            delay: 0.2,
            opacity: "1"   
        }, 0.05);        
    };

    var showContent = function() {
        TweenMax.to(".region-content", 0.2, {
            ease: Power1.easeIn,            
            opacity: "1" 
        }); 
        TweenMax.to(".intro__title", 1, {
            ease: Power1.easeOut,
            delay: 0.2,            
            opacity: "1" 
        }); 
        TweenMax.to(".intro__slogan", 1, {
            ease: Power1.easeOut, 
            delay: 0.3,           
            opacity: "1"
        });   
    };

    var hideContent = function() {
        TweenMax.to(".region-content", 0.2, {
            ease: Power1.easeOut,            
            opacity: "0" 
        });           
    };

    $(".main-menu a, .top-menu a, .site-branding__logo").addClass("ajax-link");

    $(window).on("load", function() { 
        showHeader();              
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
                    $(".ajax-content").html($(data).find(".ajax-content").html());  
                    showContent();              
                    document.title = ( $(data).find(".title").text() + " " + "|" + " " + "БелООМС" );                       
                    window.history.pushState(null, null, ajaxUrl);            
                    $(window).scrollTop(0); 
                },200);    
            }
        });    
  
    });
    window.onpopstate = function() {
        location.reload();
    };

    $(".region-header").append('<button class="mobile-nav-toggle"><span></span><span></span><span></span></button>');

    $(".mobile-nav-toggle").click(function() {               
        if(!$(this).hasClass("is-active")) {  
            $(this).addClass("is-active");          
            $(".mobile-nav").fadeIn("200");     
        }
        else {      
            $(this).removeClass("is-active");      
            $(".mobile-nav").fadeOut("200");     
        }
    });
    
})(jQuery);