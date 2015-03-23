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

var Request = function(body, success, error) {
    this.body= body;
    this.success= success;
    this.error= error;
};

var Artist = function() {
    this.name = null;
    this.dob = null;
    this.albums = [{name:null, dor:null, songs:[{name: null, soundCloud:null}]}];
    this.genre = [{type: null}];
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

    lfmAPI.addArtist = function(request) {
        $http.post(URL+"artists", request.body)
          .success(function(data) {
                if(data.err)
                    request.error(data.err);
                else {
                    for(var dt in data.data.albums) {
                        data.data.albums[dt].dor = new Date(data.data.albums[dt].dor).toDateString();
                    }
                    request.success(data.data);
                }
          });
    };

    lfmAPI.removeArtist = function(request) {
        $http.delete(URL+"artists/"+request.body)
          .success(function(data) {
                if(data.err)
                    request.error(data.err);
                else {
                    request.success(data.data);
                }
          });
    };

    lfmAPI.removeAlbum = function(request) {

        $http.delete(URL+"artists/"+request.body.artist+"/albums/"+request.body.album)
            .success(function(data) {
                if(data.err)
                    request.error(data.err);
                else {
                    request.success(data.data);
                }
            });
    };

    lfmAPI.removeSong = function(request) {
        $http.delete(URL+"artists/"+request.body.artist+"/albums/"+request.body.album+"/songs/"+request.body.song)
            .success(function(data) {
                if(data.err)
                    request.error(data.err);
                else {
                    request.success(data.data);
                }
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