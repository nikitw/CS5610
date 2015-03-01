angular.module('PrimeBoxApp.services', []).
  factory('lfmAPIservice', function($http) {

    var lfmAPI = {};
    var url = "http://nodejs-cs6240nwaghela.rhcloud.com/app/";


    lfmAPI.getAllArtists = function(callback) {
        $http.jsonp(url+"artists?callback=JSON_CALLBACK")
          .success(function(data){
            callback(data);
          });
    };

    lfmAPI.getArtistById = function(id, callback) {
        $http.jsonp(url+"artists/"+id+"?callback=JSON_CALLBACK")
          .success(function(data){
            callback(data);
          });
    };

    lfmAPI.addArtist = function(artist, callback) {
        $http.post(url+"artists", artist)
          .success(function(data) {
            callback(data);
          });
    };

    lfmAPI.removeArtist = function(id, callback) {
        $http.delete(url+"artists/"+id)
          .success(function(data) {
            callback(data);
          });
    };

    lfmAPI.editArtist = function(id, artist, callback) {
        $http.put(url+"artists/"+id, artist)
          .success(function(data) {
            callback(data);
          });
    };



    return lfmAPI;
  });
