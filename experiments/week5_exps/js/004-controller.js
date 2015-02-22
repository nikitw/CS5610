var app = angular.module('PrimeBoxApp.controllers', []);

var $navScope;
app.controller('navCtrl', function($scope, $location, userService) {
	$navScope = $scope;
	$scope.homePage = "Home";
	$scope.currUser = null;

	$scope.setHome = function () {
		$scope.reset();
		$scope.home = "active";
	};

	$scope.setProfile = function () {
		$scope.reset();
		$scope.profile = "active";
	};

	$scope.setLogin = function () {
		$scope.reset();
		$scope.login = "active";
	};

	$scope.setUser = function () {
		$scope.reset();
		$scope.user = "active";
	};

	$scope.reset = function () {
		$scope.profile = "";
		$scope.home = "";
		$scope.login = "";
		$scope.user = "";
	};

	$scope.logout = function () {
		$scope.currUser = userService.logout();
		$location.path('/login');
	}
});

app.controller('homeCtrl', function($scope, $location, lfmAPIservice, userService) {
	$navScope.setHome();
	$scope.currUser = userService.currUser;

	if(!$scope.currUser)
		lfmAPIservice.unplugUser();

	$scope.search = lfmAPIservice.getArtists();

	
	$scope.searchArtist = function() {
		$scope.search = lfmAPIservice.getArtists();
	};

	$scope.removeArtist = function(artist) {
		$scope.search.artists.splice($scope.search.artists.indexOf(artist), 1);
	}

	$scope.addArtist = function(name, dob, albums) {
		var artist = {};
		artist.name = name;
		artist.dob = dob;
		artist.albums = albums.split(',');
		$scope.search.artists.push(artist);
		$location.path('/home');
	}

	$scope.followArtist = function(artist) {
		lfmAPIservice.followArtist(artist);
	};
  });

app.controller('profileCtrl', function($scope, $location, lfmAPIservice, userService) {
  		$navScope.setProfile();
  		$scope.currUser = userService.currUser;

  		if(!$scope.currUser)
			$location.path('/login');

  		$scope.follow = lfmAPIservice.getFollowing();
  		$scope.unfollowArtist = function (artist) {
  			lfmAPIservice.unfollowArtist(artist);
  		};
  })

app.controller('detailsCtrl', function($scope, $routeParams, $location,userService, lfmAPIservice) {
  		$navScope.setProfile();
  		$scope.currUser = userService.currUser;
  		if(!$scope.currUser) {
			$location.path('/login');
			return;
		}
		
  		$scope.details = lfmAPIservice.getArtistByName($routeParams.artist);
  });

app.controller('loginCtrl', function($scope, $location, lfmAPIservice, userService) {
  		$navScope.setLogin();
  		$scope.username = null;
  		$scope.password = null;
  		$scope.loginerror = null;

  		$scope.login = function () {
  			var currUser = userService.login($scope.username, $scope.password);
  			if(currUser) {
  				$navScope.currUser = currUser;
  				lfmAPIservice.plugUser(currUser);
  				$location.path('/home');
  			 } else
  			 	$scope.loginerror = "Invalid username or password";

  		};
  });

app.controller('userCtrl', function($scope, $location , userService) {
  		$navScope.setUser();
  		$scope.currUser = userService.currUser;

  		if(!$scope.currUser)
  			$location.path('/login');

  		if(userService.showPass)
  			$scope.passwd = $scope.currUser.password;
  		
  		$scope.showPass = function () {
  			userService.passVisible(true);
  			$scope.passwd = $scope.currUser.password;
  		};
  });