$(function () {
    /* 마우스 휠 이벤트 */
    $('main>section').on('wheel', function (e) {
        e.preventDefault();
        let nav;
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
            nav = $(this).prev();
        } else {
            nav = $(this).next();
        }

        if (nav.length) {
            let moveTop = nav.offset().top;
            // console.log(moveTop);
            $('html,body').stop().animate({
                scrollTop: moveTop,
            }, 500);
        }

    });
    /* 마우스 휠 이벤트 끝 */




    $('ul.gnb li').click(function () {
        let i = $(this).index();
        $('ul.gnb li').removeClass('on');

        let secionTop = $('main>section').eq(i).offset().top;
        $('html,body').stop().animate({
            scrollTop: secionTop,
        }, 500, function () {
            $('ul.gnb li').eq(i).addClass('on');
        });

    });


    var dot = $("#dot > ul > li");


    dot.click(function (e) {
        e.preventDefault();
        var target = $(this);
        var index = target.index();
        var section = $(`#section${index + 1}`);
        var offset = section.offset().top;
        $("html,body").animate({ scrollTop: offset }, 600, function () {
            dot.removeClass("active");
            dot.eq(index).addClass("active");
        });
    });

    $(window).scroll(function () {
        let st = $(this).scrollTop();
        for (let i = 0; i < dot.length; i++) {
            let sectionI = $(`#section${i + 1}`).offset().top;
            let sectionII = $(`#section${i + 2}`).offset().top;
            if (st >= sectionI && st < sectionII) {
                dot.removeClass("active");
                dot.eq(i).addClass("active");
            }
        }

    });
});


document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.gnb li[data-index]');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = item.getAttribute('data-index');
            console.log(`Clicked item index: ${index}`);
            // 클릭된 항목의 인덱스를 이용하여 원하는 동작을 수행할 수 있습니다.
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.gnb li');

    menuItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const sectionId = this.getAttribute('id');
            const section = document.getElementById('section-' + sectionId);

            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

/* 배너 */
document.addEventListener("DOMContentLoaded", function () {
    fetch('./img/Vector2.svg')
        .then(response => response.text())
        .then(svgText => {
            document.getElementById('svg-container').innerHTML = svgText;

            var svgDoc = document.getElementById('svg-container').querySelector('svg');
            var paths = svgDoc.querySelectorAll('path');

            paths.forEach(path => {
                var length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                path.style.animation = "draw 4s linear forwards";

                // 애니메이션이 끝난 후 고정
                path.addEventListener('animationend', () => {
                    path.style.strokeDashoffset = '0';
                });
            });
        })
        .catch(error => console.error('Error loading the SVG:', error));
});