var CITY = "Boston, US";
var TEMPLATE;
var ADD;

$(window).scroll($.debounce(0, true, function (e) {
	parallax();
}));

$(window).load(function (e) {
	TEMPLATE = $(".widget");
	ADD = $(".add_widget_div");
	TEMPLATE.update = function (data) {
		updater(this, data);
	};
	activateWidgetActions(TEMPLATE);
	activateAdderWidget(ADD);
	refreshWeather(TEMPLATE, "metric");

	$("#nav_home").click(function (e) {
        smoothScroll(0, 'slow');
    });

    $("#nav_code").click(function (e) {
        smoothScroll($(".about").position().top, 'slow');
    });
});

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

function activateWidgetActions(widget) {
	widget.find(".refresh .button").click( function (e) {
		var parent = $(this).closest(".template");
	
		parent.update = function (data) {
			updater(this, data);
		};

		refreshWeather(parent, parent.find(".temperature .selected").data("units"));
	});

	widget.find(".temperature .units").click(function (e) {
		var parent = $(this).closest(".template");
		var units = $(this).data("units");
		parent.find(".temperature .units").removeClass("selected");

		$(this).addClass("selected");

		parent.update = function (data) {
			updater(this, data);
		};
		if(units == "imperial")
			parent.find(".wind .units").html("mph");
		else
			parent.find(".wind .units").html("kmph");

		refreshWeather(parent, units);
	});

	widget.find(".location .delete").click(function (e) {
		$(this).closest(".widget").remove();

	});
}

function activateAdderWidget(widget) {
	widget.find(".city_name").val("");
	widget.find(".add_widget").show();
	widget.find(".add_new_city").hide();
	widget.find(".add_widget").click( function (e) {
		$(this).hide();
		$(this).closest(".template").find(".add_new_city").show();
	});
	
	widget.find(".cancel").click(function (e) {
		$(this).parent().hide();
		$(this).closest(".template").find(".add_widget").show();
	});

	widget.find(".add_city").click(function (e) {
		var city = $(".city_name").val();
		var newWid = TEMPLATE.clone();
		var adder = ADD.clone();
		newWid.closest(".template").attr("data-city", city);
		newWid.hide();
		newWid.appendTo(".WeathRApp");
		$(".add_widget_div").remove();
		adder.appendTo(".WeathRApp");

		newWid.update = function (data) {
			updater(this, data);
		};
		activateWidgetActions(newWid);
		activateAdderWidget(adder);
		refreshWeather(newWid, "metric");
		newWid.fadeIn();
	});
}

function refreshWeather (dom, units) {
	var city = dom.data("city");

	if(! city) {
		city = CITY;
		dom.attr("data-city", city);
	}

	$.get("http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=60cecb8af5d1dbfa53a99e9ad494520a&units="+units, function (json) {
		return dom.update(json); 
	});
}

function updater(dom, data) {
	try {
	dom.find(".city").html(data.name +", "+data.sys.country);
	dom.find(".temperature .num").html(parseInt(data.main.temp));
	dom.find(".humidity .num").html(data.main.humidity);
	dom.find(".wind .num").html(data.wind.speed);
	var desc = data.weather[0].main+", "+data.weather[0].description;
	dom.find(".description .text").html(desc);

	if(desc.match(/cloud/ig))
		dom.find(".temperature .icon").css("background", "url(images/cloud.png) no-repeat");
	else if(desc.match(/rain/ig))
		dom.find(".temperature .icon").css("background", "url(images/rain.png) no-repeat");
	else if(desc.match(/snow/ig))
		dom.find(".temperature .icon").css("background", "url(images/snow.png) no-repeat");
	else
		dom.find(".temperature .icon").css("background", "url(images/clear.png) no-repeat");

	dom.find(".temperature .icon").css("background-size", "contain");
	} catch (err){
		dom.remove();
	}
}
