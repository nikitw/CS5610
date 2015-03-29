angular.module('PrimeBoxApp', [
    'ngStorage',
    'ngRoute'
])
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

        $routeProvider.
            when('/signin', {
                templateUrl: 'partials/signin.html',
                controller: 'homeCtrl'
            }).
            when('/signup', {
                templateUrl: 'partials/signup.html',
                controller: 'homeCtrl'
            }).
            when('/me', {
                templateUrl: 'partials/me.html',
                controller: 'meCtrl'
            }).
            when('/about', {
                templateUrl: 'partials/about5.html'
            }).
            otherwise({
                redirectTo: '/signin'
            });

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }]
);