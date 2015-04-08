var app = angular.module('TripPlannerApp', [
  'ngRoute',
  'ngUpload',
  'TripPlannerApp.controllers',
  'TripPlannerApp.services'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/photos', {
        templateUrl: 'partials/photos.html',
        controller: 'photosCtrl'
      }).
      when('/upload', {
        templateUrl: 'partials/upload.html',
        controller: 'photosCtrl'
      }).
      when('/about', {
        templateUrl: 'partials/about4.html'
      }).
      otherwise({
        redirectTo: '/photos'
      });
  }]);
