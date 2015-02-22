var app = angular.module('PrimeBoxApp', [
  'ngRoute',
  'PrimeBoxApp.controllers',
  'PrimeBoxApp.services'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'data/001-home.html',
        controller: 'homeCtrl'
      }).
      when('/about', {
        templateUrl: 'data/001-about.html',
        controller: 'aboutCtrl'
      }).
	  when('/contact', {
        templateUrl: 'data/001-contact.html',
        controller: 'contactCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);