$(window).scroll($.debounce(0, true, function (e) {
            parallax();
        }));
        
        $(window).scroll($.debounce(0, function (e) {
            $('.debug').html("Stopped");
        }));
        
        function parallax() {
            var scrolled = $(window).scrollTop();
            $('.bg').css('top', -(scrolled * 0.2) + 'px');
            $('.debug').html("Scrolling");



            if (scrolled < 400) {
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

            $('.bootstrap_nav').text($('nav').html());
            $('.parallax').text($('.js_code').text());
            $('.about_focus').text($('.js_about_focus').text());
        });