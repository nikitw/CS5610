var app = angular.module('PrimeBoxApp.controllers', []);

app.controller('homeCtrl', function($scope, lfmAPIservice) {

    $scope.artists = lfmAPIservice.getAllArtists(function (data) {
        $scope.artists = data;
    });

  });
