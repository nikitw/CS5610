        $(window).scroll($.debounce(0, true, function (e) {
            parallax();
        }));

        function parallax() {
            var scrolled = $(window).scrollTop();
            $('.bg').css('top', -(scrolled * 0.2) + 'px');


            if (scrolled < 400) {
                $('.nav li').removeClass('active');
                $('#nav_home').parent('li').addClass('active');
            }

            if (scrolled >= 400) {
                $('.nav li').removeClass('active');
                $('#nav_code').parent('li').addClass('active');
            }
        }

        function smoothScroll(top, speed) {
            $('html,body').animate({
                scrollTop: top
            }, speed);
        }

        $(window).load(function (e) {
            $('.table_info').text($('.bs_table').text());

            $("#nav_home").click(function (e) {
                smoothScroll(0, 'slow');
            });

            $("#nav_code").click(function (e) {
                smoothScroll(471, 'slow');
            });
        });