var app = angular.module('PrimeBoxApp.controllers', []);


app.controller('homeCtrl', function($scope, $location, lfmAPIservice) {
    $scope.exp1 = true;
    $scope.exp2 = true;
    $scope.artist = new Artist();

    $scope.artists = lfmAPIservice.getAllArtists(function (data) {
      $scope.artists = data;
    });

    $scope.addArtist = function () {
        lfmAPIservice.addArtist(new Request($scope.artist, function(data) {
            $scope.artists.push(data);
        }, function(err) {
            console.log(err);
        }));
    }
});