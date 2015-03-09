var app = angular.module('PrimeBoxApp.controllers', []);

var $navScope = null;
app.controller('navCtrl', function($scope, $location, userService) {
  $scope.currUser = userService.getCurrUser();
  $navScope = $scope;

  if($scope.currUser)
    $location.path('/home');

  $scope.logout = function () {
    userService.logout();
    $scope.currUser = null;
  };

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
});

app.controller('homeCtrl', function($scope, $location, lfmAPIservice, userService) {
  $scope.currUser = userService.getCurrUser();
  $scope.artist = {};

  $navScope.setHome();
  if(!$scope.currUser) {
    $location.path('/login');
  }

  $scope.loading = true;
  $scope.artists = lfmAPIservice.getAllArtists(function (data) {
      $scope.artists = data;
      $scope.loading = null;
  });

  $scope.addArtist = function () {
    lfmAPIservice.addArtist($scope.artist, function (data) {
      $scope.artists = data;
    });
    $scope.artist = {};
  };

  $scope.removeArtist = function (artistid) {
    lfmAPIservice.removeArtist(artistid, function (data) {
      $scope.artists = data;
    });
  };

  $scope.selectArtist = function (artistid) {
    $scope.artist = $scope.artists[artistid];
    $scope.edit = "edit";
    $scope.selArtist = artistid;
  };

  $scope.editArtist = function () {
    lfmAPIservice.editArtist($scope.selArtist, $scope.artist, function (data) {
      $scope.artists = data;
    });
    $scope.edit = undefined;
    $scope.artist = {};
  };
});

app.controller('loginCtrl', function($scope, $location, userService) {
  $scope.currUser = userService.getCurrUser();
  $scope.signup = true;
  $scope.loading = null;
  $scope.user = new User(null, null, null, null, null);
  $navScope.setLogin();

  if($scope.currUser) {
    $navScope.currUser = $scope.currUser;
    $location.path('/home');
  }

  $scope.login = function () {
    $scope.loading = true;
    $scope.user.success= function (currUser) {
        $scope.currUser = currUser;
        $navScope.currUser = currUser;
        $location.path('/home');
        $scope.loading = null;
    };

    $scope.user.error= function (err) {
        $scope.err = err;
        err.printConsole();
        $scope.loading = null;
    };
    userService.login($scope.user);
  };
});

app.controller('registerCtrl', function($scope, $location, userService) {
  $scope.currUser = userService.getCurrUser();
  $scope.loading = null;
  $scope.user = new User(null, null, null, null, null);
  $scope.cpassword = null;
  $scope.hint = null;

  $navScope.setLogin();

  if($scope.currUser) {
    $navScope.currUser = $scope.currUser;
    $location.path('/home');
  }

  $scope.register = function () {
    if($scope.user.password != $scope.cpassword) {
      $scope.err = new Error(703, 'Passwords did not match try again!');
      return;
    }

    $scope.loading = true;

    $scope.user.success= function (currUser) {
        $scope.currUser = currUser;
        $navScope.currUser = currUser;
        $location.path('/home');
        $scope.loading = null;
    };

    $scope.user.error= function (err) {
        $scope.err = err;
        err.printConsole();
        $scope.loading = null;
    };

    userService.register($scope.user);
  };
});

app.controller('userCtrl', function($scope, $location , userService) {
	$navScope.setUser();
	$scope.currUser = userService.getCurrUser();

	if(!$scope.currUser)
		$location.path('/login');

	if(userService.isPassVisible())
		$scope.passwd = $scope.currUser.password;

	$scope.showPass = function () {
		userService.passVisible(true);
		$scope.passwd = $scope.currUser.password;
	};
});

app.controller('detailsCtrl', function($scope, $routeParams, lfmAPIservice) {
    $scope.artist = lfmAPIservice.getArtistById($routeParams.id, function (data) {
      $scope.artist = data;
    });
});
