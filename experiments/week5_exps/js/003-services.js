angular.module('PrimeBoxApp.services', []).
  factory('lfmAPIservice', function($http) {

    var lfmAPI = {};
    lfmAPI.follow = {artists: [], albums: []};

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

    lfmAPI.getArtistByName = function (artist) {
    	for(var a in lfmAPI.follow.artists) {
    		
    		if(lfmAPI.follow.artists[a].name == artist) {
    			return lfmAPI.follow.artists[a];
    		}
    	}
		return null;
    };

    lfmAPI.getArtist = function(city, units) {
      return $http({
        method: 'get', 
        url: ''
      });
    };


    return lfmAPI;
  });