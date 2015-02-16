angular.module('WeathRFeedApp.controllers', []).
  controller('cityController', function($scope, owmAPIservice) {
	$scope.cityName = "";
	$scope.metric = "metric";
	$scope.imperial = "imperial";
	$scope.cityList = [{"name":"Boston, US", "units":"metric", "response":null}, {"name":"London, UK", "units":"metric", "response": null}];
    
    $scope.getWeather = function (obj) {
    	owmAPIservice.getWeather(obj.name, obj.units).success(function (response) {
    		if(response.weather[0].main.match(/cloud/ig))
    			response.icon = "cloud";
    		else if(response.weather[0].main.match(/rain|shower/ig))
    			response.icon = "rain";
			else if(response.weather[0].main.match(/snow/ig))
			    response.icon = "snow";
			else 
				response.icon = "clear";
			
			response.main.temp = parseInt(Math.round(response.main.temp));
			obj.name = response.name + ", " + response.sys.country; 
			obj.response = response;
    	});
    };

    $scope.removeCity = function (city) {
    	var index = $scope.cityList.indexOf(city);
    	if(index != -1)
    		$scope.cityList.splice(index, 1);
    };

    $scope.addCity = function () {
    	var newCity = {"name":$scope.cityName, "units":"metric", "response": null};
    	$scope.getWeather(newCity);

    	$scope.cityList.push(newCity);
    };

    $scope.changeCityUnits = function (city, units) {
    	city.units = units;
		$scope.getWeather(city);
    };

    $scope.refreshCity = function (city) {
    	$scope.getWeather(city);
    };

    $($scope.cityList).each(function (index) {
    	$scope.getWeather(this);
    });
  });
