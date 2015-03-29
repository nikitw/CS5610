var app = angular.module('PrimeBoxApp', [
  'ngRoute',
  'PrimeBoxApp.controllers',
  'PrimeBoxApp.services'
]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'homeCtrl'
            }).
            when('/albums', {
                templateUrl: 'partials/albums.html',
                controller: 'homeCtrl'
            }).
            when('/songs', {
                templateUrl: 'partials/songs.html',
                controller: 'homeCtrl'
            }).
            when('/about', {
                templateUrl: 'partials/about4.html'
            }).
            otherwise({
                redirectTo: '/home'
            });
        }]);