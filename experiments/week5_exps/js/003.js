var app = angular.module('PrimeBoxApp', [
  'ngRoute',
  'PrimeBoxApp.controllers',
  'PrimeBoxApp.services'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'data/003-home.html',
        controller: 'homeCtrl'
      }).
      when('/profile', {
        templateUrl: 'data/003-profile.html',
        controller: 'profileCtrl'
      }).
      when('/details/:artist', {
        templateUrl: 'data/003-details.html',
        controller: 'detailsCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);