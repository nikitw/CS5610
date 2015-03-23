var app = angular.module('PrimeBoxApp.controllers', []);

app.controller('homeCtrl', function($scope, $location, lfmAPIservice) {
    $scope.exp1 = true;
    $scope.artists = lfmAPIservice.getAllArtists(function (data) {
        $scope.artists = data;
    });
});
