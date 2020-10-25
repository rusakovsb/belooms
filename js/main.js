(function ($) {

    var showContent = function() { 
        $(".content").fadeIn(200); 
        TweenMax.staggerTo(".news-item", 1, {
            ease: Power3.easeOut,
            delay: 0.5,
            opacity: "1"   
        }, 0.1);            
    };

    var hideContent = function() { 
        $(".content").fadeOut(200); 
        TweenMax.staggerTo(".news-item", 1, {
            ease: Power3.easeOut,
            opacity: "0"   
        }, 0.1);            
    };

    $(".menu a, .site-branding__logo").addClass("ajax-link");

    $(window).on("load", function() {                
        showContent();
    });

    $(document).on("click", ".ajax-link", function(event) {
        event.preventDefault();
        $(".ajax-link").not(this).removeClass("is-active");
        $(this).addClass("is-active");   
        hideContent(); 
        if ($(this).hasClass("site-branding__logo")) {
            setTimeout(function () {
                $("body").addClass("path-frontpage");
            }, 200);
        } else {
            setTimeout(function () {
                $("body").removeClass("path-frontpage");
            }, 200);
        }        
        var ajaxUrl = $(this).attr("href");        
        $.ajax({
            url: ajaxUrl,
            type: "POST",
            cache: "false",
            dataType: "html",
            success: function(data) {
                $(".content").html($(data).find(".content").html());  
                showContent();              
                document.title = $(data).find(".page__title").text();      
                window.history.pushState(null, null, ajaxUrl);            
                $(window).scrollTop(0);       
            }
        });    
  
    });
    window.onpopstate = function() {
        location.reload();
    };
    
})(jQuery);