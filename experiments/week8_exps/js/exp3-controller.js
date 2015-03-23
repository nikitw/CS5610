var app = angular.module('PrimeBoxApp.controllers', []);


app.controller('homeCtrl', function($scope, $location, lfmAPIservice) {
    $scope.exp1 = true;
    $scope.exp2 = true;
    $scope.exp3 = true;
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
    };

    $scope.removeArtist = function (id, index) {
        lfmAPIservice.removeArtist(new Request(id, function(data) {
            $scope.artists.splice(index, 1);
        }, function(err) {
            console.log(err);
        }));
    };

    $scope.removeAlbum = function (id, aid, albums, index) {
        lfmAPIservice.removeAlbum(new Request({artist: id, album: aid}, function(data) {
            albums.splice(index, 1);
        }, function(err) {
            console.log(err);
        }));
    };

    $scope.removeSong = function (id, aid, sid, songs, index) {
        lfmAPIservice.removeSong(new Request({artist: id, album: aid, song: sid}, function(data) {
            songs.splice(index, 1);
        }, function(err) {
            console.log(err);
        }));
    };
});