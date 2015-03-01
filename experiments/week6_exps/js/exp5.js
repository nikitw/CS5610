var app = angular.module('PrimeBoxApp', [
  'ngRoute',
  'PrimeBoxApp.controllers',
  'PrimeBoxApp.services'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/artists', {
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl'
      }).
      when('/artists/:id', {
        templateUrl: 'partials/details.html',
        controller: 'detailsCtrl'
      }).
      otherwise({
        redirectTo: '/artists'
      });
  }]);
