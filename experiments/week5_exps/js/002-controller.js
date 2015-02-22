var app = angular.module('PrimeBoxApp.controllers', []);

app.controller('homeCtrl', function($scope, lfmAPIservice) {
  	$scope.page = "home";
	$scope.details = {};
	$scope.search = {artists: [
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
	$scope.searchArtist = function() {
		
	};

	$scope.followArtist = function(artist) {
		lfmAPIservice.followArtist(artist);
	};
  });

app.controller('profileCtrl', function($scope, lfmAPIservice) {
  		$scope.follow = lfmAPIservice.getFollowing();
  		$scope.unfollowArtist = function (artist) {
  			lfmAPIservice.unfollowArtist(artist);
  		};
  })