$(".add_widget").click( function (e) {
	$(this).hide();
	$(".add_new_city").show();
});

$(".cancel").click( function (e) {
	$(".add_new_city").hide();
	$(".add_widget").show();
});
	
$(".add_city").click( function (e) {
	$(".city_name").val("");
	$(".cancel").click();
});

function changeUnits(dom) {
	$(dom).closest(".temperature").find(".selected").removeClass("selected");
	$(dom).addClass("selected");
	if($(dom).data("units") == "metric")
		$(dom).closest(".info").find(".wind .units").html("kmph");
	else
		$(dom).closest(".info").find(".wind .units").html("mph");
}

$(window).scroll($.debounce(0, true, function (e) {
	parallax();
}));

function parallax() {
    var scrolled = $(window).scrollTop();
    $('.bg').css('top', -(scrolled * 0.2) + 'px');


    if (scrolled < $(".about").position().top) {
        $('.nav li').removeClass('active');
        $('#nav_home').parent('li').addClass('active');
    }

    if (scrolled >= $(".about").position().top) {
        $('.nav li').removeClass('active');
        $('#nav_code').parent('li').addClass('active');
    }
}

function smoothScroll(top, speed) {
    $('html,body').animate({
        scrollTop: top
    }, speed);
}

$(window).load( function (e) {
	$("#nav_home").click(function (e) {
        smoothScroll(0, 'slow');
    });

    $("#nav_code").click(function (e) {
        smoothScroll($(".about").position().top, 'slow');
    });
});
