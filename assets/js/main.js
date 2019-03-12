$(function() {
    
    var animations = [];
    var bgAnimations = [];
    
    var controller;
        
    controller = new ScrollMagic.Controller();

    var scrollToOffset = 0;
        
    $(".js-scroll-to").bind("click", function(e){
        e.preventDefault();
        var tg = $(this).attr("href") ||  $(this).attr("data-target");
        if(tg){
            $('html, body').animate({
                scrollTop: $(tg).offset().top - scrollToOffset
            }, 1000);
        }
    });
    
    $(".bg-animation").each(function(index){
        var path = $(this).attr("data-path");
        var params = {
            container: this,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: path
        };  

        bgAnimations[index] = bodymovin.loadAnimation(params);
    });
    
    $(".main-content").each(function(index) {
        var section = $(this)

        // Parallasse testi e immagini di ogni sezione
        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook:0.3,
            duration: "150%"
        })
        .on("progress", function (e) {
            var val = e.progress.toFixed(3);
            section.find(".text-parallax").css("transform", "translate3d(0,"+val*(200)+"px, 0)");
            section.find(".js-parallax").css("transform", "translate3d(0,-"+val*(75)+"px, 0)");
        })
        .addTo(controller);
    });
    
    //kpi slider
    var sliderSwiperKpi = new Swiper('.kpi-swiper', {
        slidesPerView: 3,
        spaceBetween: 30,
        slideToClickedSlide: true,
        speed: 300,
        autoplay: false,
        breakpoints: {
            769: {
                slidesPerView: 'auto',
                spaceBetween: 15
            }
        }
    });
    
    //kpi slider
    var sliderSwiperKpi = new Swiper('.main-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        parallax:true,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },
        navigation: {
            nextEl: '.mobile-swiper-nav.next',
            prevEl: '.mobile-swiper-nav.prev',
        },
        on: {
            slideChange: function(){
                var thisSlide = sliderSwiperKpi.activeIndex;
                $( ".fraction-number" ).text(thisSlide + 1);
                $(".agile-swiper-outer").attr('class','agile-swiper-outer background-change'+thisSlide);
                
            },
        },
        slideToClickedSlide: true,
        speed: 600,
        autoplay: false
    });
    
    var totalSlides = sliderSwiperKpi.slides.length;
    $( ".total-slides-number" ).text(totalSlides);
    
    for(var i = 1; i < 10; i++) {
        var sceneNumber = 'scene'+i;
        var scene = document.getElementById(sceneNumber);
        var parallaxInstance = new Parallax(scene, {
          relativeInput: true
        });
    }
    
    $('body').on('click', '.js-show-more', function () {
        var searchEl = $(this).data('target');
        $(searchEl + ' .sessionize-table-row.content:hidden').slice(0, 2).fadeIn();
        if ($(searchEl + ' .sessionize-table-row.content').length == $(searchEl + ' .sessionize-table-row.content:visible').length) {
            console.log('ciao');
            $('.js-show-more').hide();
        }
        return false;
    });
    
})