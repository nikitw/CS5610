var services = angular.module('PrimeBoxApp.services', []);

services.factory('lfmAPIservice', function($http) {

    var lfmAPI = {};

    lfmAPI.follow = null;
    lfmAPI.search = {artists: [
				{name: "Coldplay", dob: "3-2-1977", albums: ["Ghost Stories", "X and Y", "Parachutes"]},
				{name: "Daniel Powter", dob: "2-25-1971", albums: ["Bad day", "Under the Radar", "Turn On the Lights"]},
				{name: "Gareth Emery", dob: "3-2-1977", albums: ["Get Wet", "Northern Lights", "Drive"]},
				{name: "Armin Van Buuren", dob: "3-2-1977", albums: ["Intense", "Imagine", "A State of Trance"]},
				{name: "Skrillex", dob: "3-2-1977", albums: ["Dirty Vibe", "Scary Monsters", "Bangarang"]},
				{name: "Dash Berlin", dob: "3-2-1977", albums: ["#musicislife", "Man on the Run", "Never Cry Again"]},
				{name: "Above & Beyond", dob: "3-2-1977", albums: ["We need it all", "Sun and moon", "Oceans"]},
				{name: "Thomas Bergersen", dob: "3-2-1977", albums: ["Final Frontier", "Sun"]},
				{name: "Hans Zimmer", dob: "3-2-1977", albums: ["Inception", "Rush", "Gladiator"]}
			], albums:[], genres:[]};

    lfmAPI.followArtist = function (artist) {
    	if(lfmAPI.getArtistByName(artist.name))
    		return;
    	lfmAPI.follow.artists.push(artist);
    };

    lfmAPI.unfollowArtist = function (artist) {
    	lfmAPI.follow.artists.splice(lfmAPI.follow.artists.indexOf(artist), 1);
    };

    lfmAPI.getFollowing = function () {
    	return lfmAPI.follow;
    };

    lfmAPI.plugUser = function (user) {
    	lfmAPI.follow = user.follow;
    };

    lfmAPI.unplugUser = function () {
    	lfmAPI.follow = null;
    };

    lfmAPI.getArtistByName = function (artist) {
    	for(var a in lfmAPI.follow.artists) {
    		
    		if(lfmAPI.follow.artists[a].name == artist) {
    			return lfmAPI.follow.artists[a];
    		}
    	}
		return null;
    };

    lfmAPI.getArtists = function() {
      	return lfmAPI.search;
    };


    return lfmAPI;
  });

services.factory('userService', function($http) {
  	var authService = {};
  	authService.currUser = null;
  	authService.showPass = false;

  	authService.users = [
  		{name: "Alice", username: "alice@neu.edu", password: "alice", follow: {artists: [], albums: []}},
  		{name: "Bob", username: "bob@neu.edu", password: "bob", follow: {artists: [], albums: []}},
  		{name: "Admin", username: "admin@neu.edu", password: "admin", follow: null, admin: true}
  	];
	
  	authService.login = function (username, password) {
  		var users = authService.users;
  		for(var u in users) {
  			if(users[u].username == username && users[u].password == password) {
  				authService.currUser = users[u];
  				break;
  			}
  		}
  		return authService.currUser;
  	};

  	authService.logout = function () {
  		authService.currUser = null;
  		authService.passVisible(false);
  		return authService.currUser;
  	};

  	authService.passVisible = function (bool) {
  		authService.showPass = bool;
  	};

  	return authService;
  });