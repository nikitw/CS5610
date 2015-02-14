$(window).scroll($.debounce(0, true, function (e) {
            parallax();

        }));

        var timer;
        var py;
        var width;
        var element;
        var mirror;
        function draggables() {
            $('.draggable').mousedown(function (e) {
                py = e.pageY - $(this).position().top;
                width = $(this).css('width');
                element = $(this);
                timer = setTimeout(function (e) {
                    mirror = element.clone();
                    mirror.addClass('mirror');
                    $('.d-list').append(mirror);
                    saveShuffle();
                    $('.mirror').unbind('mousedown');
                    element.css('box-shadow', '0px 0px 20px #333');
                    element.css('position', 'absolute').css('width', width);
                    element.css('margin', 0).css('z-index', 100).css('pointer-events', 'none');
                    element.addClass('dragged');
                    dragDom(element);
                }, 200);

            });

            $('.draggable').mouseup(function (e) {

                clearInterval(interval);
                $('.dragged').removeAttr('style');
                $('.dragged').removeClass('dragged');
                clearTimeout(timer);
                $('.mirror').remove();
                saveShuffle();
                element = undefined;
                return false;
            });

            $('.draggable').mouseover(function (e) {
                if ($(this).is('.dragged'))
                    return false;
                if (element) {
                    var id = element.data('id');
                    element.attr('data-id', $(this).data('id'));
                    mirror.attr('data-id', $(this).data('id'));
                    $(this).attr('data-id', id);
                    saveShuffle();
                }
                return true;
            });
        }

        function saveShuffle() {
            var dlist = $(".draggable").sort(function (a, b) {
                if (parseInt($(a).data('id')) <=
                    parseInt($(b).data('id'))) {
                    return -1;
                } else {
                    return 1;
                }
            });
            $('.d-list').html("");
            dlist.each(function () { $('.d-list').append($(this)) });
            draggables();
        }

        var interval;
        var moff;
        function dragDom(ele) {

            moff = window.mouseY - ele.position().top;

            interval = setInterval(function (e) {
                ele.css('top', window.mouseY - moff);
            }, 10);
        }

        $(window).mousemove(function (e) {
            window.mouseX = e.pageX;
            window.mouseY = e.pageY;
        });


        function smoothScroll(top, speed) {
            $('html,body').animate({
                scrollTop: top
            }, speed);
        }

        function parallax() {
            var scrolled = $(window).scrollTop();
            $('.bg').css('top', -(scrolled * 0.2) + 'px');
            $('.debug').html(scrolled);

            if (scrolled < 500) {
                $('.nav li').removeClass('active');
                $('#nav_home').parent('li').addClass('active');
            }

            if (scrolled >= 500) {
                $('.nav li').removeClass('active');
                $('#nav_code').parent('li').addClass('active');
            }
        }

        
        $(window).load(function (e) {
            $('.js_draggables').text($('.draggables_info').text());
            $('.js_saveshuffle').text($('.saveshuffle_info').text());
            $('.js_drag').text($('.drag_info').text());
            $('.js_mousepos').text($('.mousepos_info').text());

            $("#nav_home").click(function (e) {
                smoothScroll(0, 'slow');
            });

            $("#nav_code").click(function (e) {
                smoothScroll(512, 'slow');
            });
        });

        draggables();