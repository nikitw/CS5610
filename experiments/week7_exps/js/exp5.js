var app = angular.module('PrimeBoxApp', [
  'ngRoute',
  'ngCookies',
  'PrimeBoxApp.controllers',
  'PrimeBoxApp.services'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
      }).
      when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'registerCtrl'
      }).
      when('/home', {
        templateUrl: 'partials/home1.html',
        controller: 'homeCtrl'
      }).
      when('/profile', {
        templateUrl: 'partials/profile2.html',
        controller: 'userCtrl'
      }).
      when('/artists/:id', {
        templateUrl: 'partials/details.html',
        controller: 'detailsCtrl'
      }).
      when('/chpass/:id', {
        templateUrl: 'partials/chpass.html',
        controller: 'chpassCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);
