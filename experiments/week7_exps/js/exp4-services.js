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

var User = function(name, username, password, hint, admin) {
  this.name = name;
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

    us.login = function (user) {
        $http.jsonp(URL+"login?username="+user.username
        +"&password="+user.password
        +"&callback=JSON_CALLBACK")
          .success(function(auser) {
            if(!auser.err) {
              user.success(auser);
              us.currUser = auser;
            } else
              user.error(new Error(auser.err, auser.errmsg));
          });
    };

    us.register = function (user) {
        $http.post(URL+"register", user)
          .success(function(auser) {
            if(!auser.err) {
              user.success(auser);
              us.currUser = auser;
            } else
              user.error(new Error(auser.err, auser.errmsg));
          });
    };

    us.updateUser = function (id, user) {
      $http.put(URL+"update/"+id, user)
        .success(function(auser) {
          if(!auser.err) {
            user.success(auser);
            us.currUser = auser;
          } else
            user.error(new Error(auser.err, auser.errmsg));
        });
    };

    us.chpass = function (request) {
      $http.post(URL+"chpassrequest", request)
      .success(function (response) {
        if(response.cstat > 400) {
          request.error(new Error(response.err, response.errmsg));
        } else {
          request.success(response);
        }
      });
    };

    us.chpassStatus = function (request) {
      $http.jsonp(URL+"chpass/"+request.username+"?callback=JSON_CALLBACK")
      .success(function (response) {
        if(response.cstat > 400) {
          request.error(new Error(response.err, response.errmsg));
        } else {
          request.success(response.cstat);
        }
      });
    };

    us.viewEmail = function (request) {
      $http.jsonp(URL+"chpassemail/"+request.username+"?callback=JSON_CALLBACK")
      .success(function (response) {
        if(response.cstat > 400) {
          request.error(new Error(response.err, response.errmsg));
        } else {
          request.success(response.body);
        }
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
