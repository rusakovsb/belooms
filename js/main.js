(function ($) {

    // Search form

    $(".top-search-form").focusin(function() {
        $(this).addClass("top-search-form_focused");
    }); 

    $(".top-search-form" ).focusout(function() {
        $(this).removeClass("top-search-form_focused");
    }); 
    
    $(".block").removeClass("container-inline");
    
    // Sidebar

    $(".sidebar-left").prepend('<button class="sidebar-toggle"><span></span><span></span><span></span></button>');
	
    $(".sidebar-toggle").click(function() {               
        if(!$(this).hasClass("is-active")) {  
            $(this).addClass("is-active");          
            TweenMax.to(".sidebar-left", 1, {
                ease: Expo.easeInOut,
                x: "0"     
            })       
        }
        else {      
            $(this).removeClass("is-active");      
            TweenMax.to(".sidebar-left", 1, {                
                ease: Expo.easeInOut,
                x: "-20rem"
            })     
        }
    });

    // Files
	
    $(".file--x-office-document a").attr("target","_blank");
    $(".file--application-pdf a").attr("target","_blank");

    // Structure menu
	
    $(".taxonomy-menu > .taxonomy-menu__item_expanded > a").contents().unwrap().wrap('<h5 class="taxonomy-menu__subtitle">');

    // Masonry
    
    $(".masonry").imagesLoaded( function() {
        $(".masonry .view-content").masonry({      
          itemSelector: '.masonry-item',
        })         
    });

    // Mobile menu

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

    // Map link

    $(".map-link").attr({
        "data-colorbox-inline": "#block-map",
        "data-width": "1550px"
    });
    
})(jQuery);