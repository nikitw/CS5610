var app = angular.module('PrimeBoxApp', [
  'ngRoute',
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
      when('/home', {
        templateUrl: 'partials/home1.html',
        controller: 'homeCtrl'
      }).
      when('/profile', {
        templateUrl: 'partials/profile1.html',
        controller: 'userCtrl'
      }).
      when('/artists/:id', {
        templateUrl: 'partials/details.html',
        controller: 'detailsCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);
