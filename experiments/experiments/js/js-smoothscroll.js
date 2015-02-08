$(window).scroll($.debounce(0, true, function (e) {
            parallax();
        }));

        $(window).scroll($.debounce(250, function (e){
            var scrolled = $(window).scrollTop();
            if (scrolled < 30)
                smoothScroll(30, 'slow');
        }));

        function smoothScroll(top, speed) {
            $('html,body').animate({
                scrollTop: top
            }, speed);
        }

        function parallax() {
            var scrolled = $(window).scrollTop();
            $('.bg').css('top', -(scrolled * 0.2) + 'px');
            $('.debug').html(scrolled);
            
            

            if (scrolled >= 30 && scrolled < 400) {
                $('.nav li').removeClass('active');
                $('#nav_home').parent('li').addClass('active');
            }
            if (scrolled >= 400 && scrolled < 1030) {
                $('.nav li').removeClass('active');
                $('#nav_code').parent('li').addClass('active');
            }
            if (scrolled >= 1030) {
                $('.nav li').removeClass('active');
                $('#nav_about').parent('li').addClass('active');
            }
        }

        $(window).load(function (e) {
            
            $('.bootstrap_exp').text($('.exp').html());
            $('.smoothscroll').text($('.js_code').text());
            $('.about_focus').text($('.js_about_focus').text());

            $("#nav_home").click(function (e) {
                smoothScroll(30, 'slow');
            });

            $("#nav_code").click(function (e) {
                smoothScroll(608, 'slow');
            });

            $("#nav_about").click(function (e) {
                smoothScroll(1312, 'slow');
            });

            if($(window).scrollTop() == 0)
                smoothScroll(30, 1000); 
        });