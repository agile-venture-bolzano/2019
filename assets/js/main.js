$(function() {
    /*$.getJSON('https://sessionize.com/api/v2/kdrcj1sr/view/gridtable',function(data){
        console.log('success');
        console.log(data);
        var sessionizeHtml = '<div class="sessionize-container">';
        $.each(data,function(i,item){
            sessionizeHtml += '<div class="sessionize-item date"><strong>'+item.date+'</strong>';
            $.each(item.rooms,function(i,item){
                sessionizeHtml += '<div class="sessionize-rooms">'+item.name+'</div>';
                $.each(item.sessions,function(i,item){
                    sessionizeHtml += '<div class="sessionize-events"><div class="sessionize-events-hours">'+item.startsAt+'</div>';
                    sessionizeHtml += '</div>';
                });
            });
            sessionizeHtml += '</div>';
        });
        sessionizeHtml += '</div>';
        $('#sessionizeData').html(sessionizeHtml);
    }).error(function(){
        console.log('error');
    });*/
    
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
                console.log(thisSlide);
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
        
        console.log(sceneNumber);
        var parallaxInstance = new Parallax(scene, {
          relativeInput: true
        });
    }

    
    
})