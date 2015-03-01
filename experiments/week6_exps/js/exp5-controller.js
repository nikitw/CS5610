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

    $scope.removeArtist = function (artistid) {
      lfmAPIservice.removeArtist(artistid, function (data) {
        $scope.artists = data;
      });
    };

    $scope.selectArtist = function (artistid) {
      $scope.artist = $scope.artists[artistid];
      $scope.edit = "edit";
      $scope.selArtist = artistid;
    };

    $scope.editArtist = function () {
      lfmAPIservice.editArtist($scope.selArtist, $scope.artist, function (data) {
        $scope.artists = data;
      });
      $scope.edit = undefined;
      $scope.artist = {};
    };
  });

app.controller('detailsCtrl', function($scope, $routeParams, lfmAPIservice) {
    $scope.artist = lfmAPIservice.getArtistById($routeParams.id, function (data) {
      $scope.artist = data;
    });
});
