var TEMPLATE;
$(window).load( function (e) {
	TEMPLATE = $(".template");
	getWeather("Boston, US", "metric");
	getWeather("London, UK", "metric");

});

$(".add").click( function (e) {
	getWeather($("#cityname").val(), "metric");
});

function getWeather (city, units) {
	$.get("http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=60cecb8af5d1dbfa53a99e9ad494520a&units="+units, function (json) {
		var newCity = TEMPLATE.clone();
		newCity.find(".city").html(json.name + ", "+ json.sys.country);
		newCity.find(".temp").html(Math.round(json.main.temp)+"˚C");
		newCity.find(".wind").html(json.wind.speed+" kmph");
		newCity.appendTo(".cities");
	});
}
