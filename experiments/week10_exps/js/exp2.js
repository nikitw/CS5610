var app = angular.module('TripPlannerApp', [
  'ngRoute',
  'TripPlannerApp.controllers',
  'TripPlannerApp.services'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/map', {
        templateUrl: 'partials/map.html',
        controller: 'mapCtrl'
      }).
      when('/about', {
        templateUrl: 'partials/about2.html'
      }).
      otherwise({
        redirectTo: '/map'
      });
  }]);
