var app = angular.module('TripPlannerApp', [
  'ngRoute',
  'TripPlannerApp.controllers',
  'TripPlannerApp.services'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'ctrl'
      }).
      when('/features', {
        templateUrl: 'partials/features.html',
        controller: 'ctrl'
      }).
      when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ctrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
