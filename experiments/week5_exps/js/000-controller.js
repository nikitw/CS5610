var app = angular.module('PrimeBoxApp.controllers', []);

app.controller('homeCtrl', function($scope, lfmAPIservice) {
  	$scope.home = "home";
  });

app.controller('aboutCtrl', function($scope, lfmAPIservice) {
  	$scope.about = "about";
  })

app.controller('contactCtrl', function($scope, lfmAPIservice) {
  	$scope.contact = "contact";
  });