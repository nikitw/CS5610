var services = angular.module('PrimeBoxApp.services', []);

var Error = function(errno, message) {
  this.errno = errno;
  this.message = message;
};

Error.prototype.printConsole = function() {
  console.log("\terror\n");
  console.log("\t   ERRNO: "+this.errno+"\n");
  console.log("\t   MSG  : "+this.message+"\n");
  console.log("\tend");
};

var URL = "http://nodejs-cs6240nwaghela.rhcloud.com/primebox/";
//var URL = "http://localhost:8888/primebox/";

services.factory('lfmAPIservice', function($http) {

    var lfmAPI = {};

    lfmAPI.getAllArtists = function(callback) {
        $http.jsonp(URL+"artists?callback=JSON_CALLBACK")
          .success(function(data){
                for(var d in data.data) {
                    data.data[d].dob = new Date(data.data[d].dob).toDateString();
                    for(var dt in data.data[d].albums) {
                        data.data[d].albums[dt].dor = new Date(data.data[d].albums[dt].dor).toDateString();
                    }
                }
            callback(data.data);
          });
    };

    lfmAPI.getArtistById = function(id, callback) {
        $http.jsonp(URL+"artists/"+id+"?callback=JSON_CALLBACK")
          .success(function(data){
            callback(data);
          });
    };

    lfmAPI.addArtist = function(artist, callback) {
        $http.post(URL+"artists", artist)
          .success(function(data) {
            callback(data);
          });
    };

    lfmAPI.removeArtist = function(id, callback) {
        $http.delete(URL+"artists/"+id)
          .success(function(data) {
            callback(data);
          });
    };

    lfmAPI.editArtist = function(id, artist, callback) {
        $http.put(URL+"artists/"+id, artist)
          .success(function(data) {
            callback(data);
          });
    };

    return lfmAPI;
  });