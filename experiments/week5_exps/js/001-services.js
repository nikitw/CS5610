angular.module('PrimeBoxApp.services', []).
  factory('lfmAPIservice', function($http) {

    var lfmAPI = {};

    lfmAPI.getArtist = function(city, units) {
      return $http({
        method: 'get', 
        url: ''
      });
    }

    return lfmAPI;
  });