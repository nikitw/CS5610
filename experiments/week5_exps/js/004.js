var app = angular.module('PrimeBoxApp', [
  'ngRoute',
  'PrimeBoxApp.controllers',
  'PrimeBoxApp.services'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'data/004-home.html',
        controller: 'homeCtrl'
      }).
      when('/profile', {
        templateUrl: 'data/004-profile.html',
        controller: 'profileCtrl'
      }).
      when('/details/:artist', {
        templateUrl: 'data/004-details.html',
        controller: 'detailsCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);