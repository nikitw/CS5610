angular.module('WeathRFeedApp.services', []).
  factory('owmAPIservice', function($http) {

    var owmAPI = {};

    owmAPI.getWeather = function(city, units) {
      return $http({
        method: 'get', 
        url: 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units='+units
      });
    }

    return owmAPI;
  });