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
      when('/login', {
        templateUrl: 'data/004-login.html',
        controller: 'loginCtrl'
      }).
      when('/user/:username', {
        templateUrl: 'data/004-user.html',
        controller: 'userCtrl'
      }).
      when('/artist/add', {
        templateUrl: 'data/004-artistadd.html',
        controller: 'homeCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);