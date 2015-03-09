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
  $scope.chpass = true;
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


  $scope.forgotPassword = function () {
      if(!$scope.user.username) {
        $scope.err = new Error(702, "Please provide the username");
      } else {
        $location.path('/chpass/'+$scope.user.username);
      }

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
      $scope.err = new Error(704, 'Passwords did not match try again!');
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

  $scope.cpassword = null;
  $scope.edit = null;

	if(!$scope.currUser) {
		$location.path('/login');
    return;
  }

  $scope.user = new User(
    $scope.currUser.name,
    $scope.currUser.username,
    $scope.currUser.password,
    $scope.currUser.hint,
    $scope.currUser.admin
  );


	if(userService.isPassVisible())
		$scope.passwd = $scope.currUser.password;

	$scope.showPass = function () {
		userService.passVisible(true);
		$scope.passwd = $scope.currUser.password;
	};

  $scope.editUser = function () {
    $scope.edit = true;
    $scope.showPass();
  };

  $scope.cancelEdit = function () {
    $scope.edit = null;
    $scope.cpassword = null;
    $scope.err = null;
  };

  $scope.update = function () {
    if($scope.cpassword != $scope.user.password) {
      $scope.err = new Error(704, 'Passwords did not match try again!');
      return;
    }
    $scope.loading = true;
    $scope.user.success= function (currUser) {
        $scope.currUser = currUser;
        $navScope.currUser = currUser;
        $scope.loading = null;
        $scope.edit = null;
        $scope.showPass();
        $scope.cpassword = null;
        $scope.err = null;
    };

    $scope.user.error= function (err) {
        $scope.err = err;
        err.printConsole();
        $scope.loading = null;
    };

    userService.updateUser($scope.currUser.username, $scope.user);
  };
});

app.controller('detailsCtrl', function($scope, $routeParams, lfmAPIservice) {
    $scope.artist = lfmAPIservice.getArtistById($routeParams.id, function (data) {
      $scope.artist = data;
    });
});

app.controller('chpassCtrl', function($scope, $location, $routeParams, userService) {
  $scope.username = $routeParams.id;
  $scope.response = null;
  $scope.chpassDaemon = null;
  $scope.confirmed = null;
  $scope.user = new User(
    null, $scope.username,
    null, null, null
  );

  $scope.chpassDaemonFn = function () {
    userService.chpassStatus({
      username: $scope.username,
      success: function (cstat) {
        $scope.err = null;
        if(cstat == 301) {
          $scope.response = null;
          $scope.confirmed = true;
          clearInterval($scope.chpassDaemon);
          return;
        }
      },
      error: function (err) {
        $scope.err = err;
        clearInterval($scope.chpassDaemon);
      }
    });
  };

  userService.chpassStatus(
    {
      username: $scope.username,
      success: function (cstat) {
        $scope.err = null;
        if(cstat == 302) {
          $scope.response = {body: {username: $scope.username}};
          $scope.chpassDaemon = setInterval($scope.chpassDaemonFn, 5000);
          return;
        }
        if(cstat == 301) {
          $scope.response = null;
          $scope.confirmed = true;
          return;
        }
      },
      error: function (err) {
        //$scope.err = err;
      }
    }
  );

  $scope.chpass = function () {
    userService.chpass({
      email: $scope.username,
      success: function (response) {
        $scope.response = response;
        $scope.err = null;
      },
      error: function (err) {
        $scope.err = err;
      }
    });

    $scope.chpassDaemon = setInterval($scope.chpassDaemonFn, 5000);
  };

  $scope.viewEmail = function (username) {
    userService.viewEmail({
      username: $scope.username,
      success: function (email) {
        $scope.response.body.email = email;
      },
      error: function (err) {
        $scope.err = err;
      }
    });
  };

  $scope.updatePassword = function () {
    if($scope.user.password == null) {
      $scope.err = new Error(703, 'all feilds are mandatory');
      return;
    }
    if($scope.cpassword != $scope.user.password) {
      $scope.err = new Error(704, 'Passwords did not match try again!');
      return;
    }
    $scope.loading = true;
    $scope.user.success= function (currUser) {
      $scope.loading = null;
      $navScope.currUser = currUser;
      $location.path('/home');
    };
    $scope.user.error= function (err) {
      $scope.err = err;
      err.printConsole();
      $scope.loading = null;
    };
    userService.updateUser($scope.user.username, $scope.user);
  };

});
