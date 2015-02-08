$(window).scroll($.debounce(0, true, function (e) {
            parallax();
        }));

        function parallax() {
            var scrolled = $(window).scrollTop();
            $('.bg').css('top', -(scrolled * 0.2) + 'px');


            if (scrolled < 1332) {
                $('.nav li').removeClass('active');
                $('#nav_home').parent('li').addClass('active');
            }

            if (scrolled >= 1332) {
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
            $('.grid_info').text($('.grid_layout').html());
            $('.ajax_info').text($('.jq_ajax').html());

            $.get("data/data1.json", function (out) {
                $.each(out, function (k, v) {
                    $('.grid').append("<div class='row'>"+
                                      "<div class='col-md-4'>" + v.id + "</div>" +
                                      "<div class='col-md-4'>" + v.name + "</div>" +
                                      "<div class='col-md-4'>" + v.price + "</div>"+
                                      "</div>");
                });
            });

            $("#nav_home").click(function (e) {
                smoothScroll(0, 'slow');
            });

            $("#nav_code").click(function (e) {
                smoothScroll(1332, 'slow');
            });
        });