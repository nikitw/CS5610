var services = ﻿angular.module('PrimeBoxApp.services', []);

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

var User = function(username, password, hint, admin) {
  this.username = username;
  this.password = password;
  this.hint = hint;
  this.admin = admin;
};

var URL = "http://nodejs-cs6240nwaghela.rhcloud.com/app/";
//var URL = "http://localhost:8888/app/";

services.factory('lfmAPIservice', function($http) {

    var lfmAPI = {};

    lfmAPI.getAllArtists = function(callback) {
        $http.jsonp(URL+"artists?callback=JSON_CALLBACK")
          .success(function(data){
            callback(data);
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

services.factory('userService', function($http) {
    var us = {};
    us.currUser = null;
    us.showPass = false;

    us.getCurrUser = function () {
        return this.currUser;
    };

    us.login = function (request) {
        $http.jsonp(URL+"login?username="+request.username
        +"&password="+request.password
        +"&callback=JSON_CALLBACK")
          .success(function(data) {
            if(data) {
              request.success(data);
              us.currUser = data;
            } else
              request.error(new Error(701, "login failed!"));
          });
    };

    us.logout = function () {
      us.currUser = null;
    };

    us.passVisible = function (status) {
        us.showPass = status;
    };

    us.isPassVisible = function () {
      return us.showPass;
    };

    return us;
  });
