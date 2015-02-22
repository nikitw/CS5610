var app = angular.module('PrimeBoxApp', [
  'ngRoute',
  'PrimeBoxApp.controllers',
  'PrimeBoxApp.services'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'data/002-home.html',
        controller: 'homeCtrl'
      }).
      when('/profile', {
        templateUrl: 'data/002-profile.html',
        controller: 'profileCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);