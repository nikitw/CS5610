var app = angular.module('PrimeBoxApp.controllers', []);

app.controller('homeCtrl', function($scope, lfmAPIservice) {

    $scope.artist = {};

    $scope.artists = lfmAPIservice.getAllArtists(function (data) {
        $scope.artists = data;
    });

    $scope.addArtist = function () {
      lfmAPIservice.addArtist($scope.artist, function (data) {
        $scope.artists = data;
      });
      $scope.artist = {};
    };
  });
