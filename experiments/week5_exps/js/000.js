var app = angular.module('PrimeBoxApp', [
  'ngRoute',
  'PrimeBoxApp.controllers',
  'PrimeBoxApp.services'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'data/000-home.html'
      }).
      when('/about', {
        templateUrl: 'data/000-about.html'
      }).
	  when('/contact', {
        templateUrl: 'data/000-contact.html'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);