var app = angular.module('PrimeBoxApp.controllers', []);

app.controller('homeCtrl', function($scope, lfmAPIservice) {
  	$scope.page = "home";
  });

app.controller('aboutCtrl', function($scope, lfmAPIservice) {
  	$scope.page = "about";
  })

app.controller('contactCtrl', function($scope, lfmAPIservice) {
  	$scope.page = "contact";
  });