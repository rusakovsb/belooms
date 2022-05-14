(function ($) {   
    
    $(".page-title").lettering("words");

    $(".about__image-inner, .main-info__image-inner").each(function() {
        var imgUrl = $(this).attr("data-image-src");
        $(this).css("background-image", "url("+imgUrl+")");      
    });

    var showNav = function() {
        gsap.to( ".site-branding__logo", {
            duration: 1,
            ease: "expo.out",            
            x: "0" 
        });  
        gsap.to(".main-menu__item, .top-menu__item", {
            duration: 1,
            ease: "power1.out",
            delay: 0.2,
            opacity: "1",
            stagger: 0.05 
        });        
    };

    var showContent = function() { 
        $(".overlay").fadeOut(100);              
        $(".page-title").show();  
        gsap.to( ".page-title span", {
            duration: 1,
            ease: "expo.out",
            opacity: "1",  
            y: "0",
            stagger: 0.05
        });
        gsap.to( ".hero__image", {
            duration: 1,
            ease: "expo.out",   
            opacity: "1",         
            y: "0" 
        });
    };

    var showMobileNav = function() {
        $(".mobile-nav-toggle").addClass("mobile-nav-toggle--active");          
        $(".mobile-nav").fadeIn("200");  
        gsap.to(".mobile-menu__item", {
            duration: 0.5,
            ease: "power1.out",
            delay: 0.4,
            opacity: "1",  
            stagger: 0.02
        });     
    }; 

    var hideMobileNav = function() {
        $(".mobile-nav-toggle").removeClass("mobile-nav-toggle--active");
        $(".mobile-nav").fadeOut("200"); 
        gsap.to(".mobile-menu__item", {
            duration: 0.2,
            ease: "power1.in",           
            opacity: "0" 
        }); 
    }; 

    $(window).on("load", function() { 
        showNav();              
        showContent();
    });

    $(".region-header-right").append('<button class="mobile-nav-toggle"><span></span><span></span></button>');

    $(".mobile-nav-toggle").click(function() {               
        if(!$(this).hasClass("mobile-nav-toggle--active")) {  
            showMobileNav();
        }
        else {                    
            hideMobileNav();
        }
    });

    const counters = function() {
        $(".stat-counter__number").each(function() {
            var count = $(this),
                zero = {val:0};
            gsap.to(zero,{
                duration: 1.5,
                val: count.data("number"),
                onUpdate: countNumber
            })
            function countNumber() {
                var final = gsap.utils.snap(1, zero.val);
                count.text(final);
            }
        });
    }; 

    gsap.to(".stat-counter-list", {        
        scrollTrigger: {
            trigger: ".stat-counter-list",
            start: 'top bottom',
            onEnter: counters,
        }
    });

    gsap.utils.toArray(".about").forEach(about => {

        const aboutImg = about.querySelector(".about__image")
        const aboutImgInner = about.querySelector(".about__image-inner")

        gsap.to(aboutImg, {
            ease: "none",
            y: "-5vw",
            scrollTrigger: {
                trigger: about,
                start: "top 60%",
                end: "top top",
                scrub: 0.1
            }
        });
        gsap.to(aboutImgInner, {
            ease: "none",
            y: "5vw",     
            scrollTrigger: {
                trigger: about,
                start: "top 60%",
                end: "top top",
                scrub: 0.1
            }
        });
    });

    gsap.to(".main-info__image-inner", {
        ease: "none",
        y: "5vw",
        scrollTrigger: {
            trigger: ".main-info__image",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.1
        }
    });

})(jQuery);