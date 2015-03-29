var app = angular.module('PrimeBoxApp.controllers', []);


app.controller('homeCtrl', function($scope, $location, lfmAPIservice) {
    $scope.exp1 = true;
    $scope.exp2 = true;
    $scope.exp3 = true;
    $scope.exp5 = true;
    $scope.uiSearch = true;

    $scope.artist = new Artist();
    $scope.filter = lfmAPIservice.getFilter();

    $scope.artists = lfmAPIservice.getAllArtists(function (data) {
        $scope.artists = data;
    });

    $scope.addArtist = function () {
        if($scope.artist && $scope.editIndex != null) {
            lfmAPIservice.editArtist(new Request($scope.artist, function (data) {
                $scope.artists[$scope.editIndex] = data;
                $scope.artist = new Artist();
                $scope.editIndex = null;
            }, function (err) {
                console.log(err);
            }));
        } else {
            lfmAPIservice.addArtist(new Request($scope.artist, function (data) {
                $scope.artists.push(data);
                $scope.artist = new Artist();
            }, function (err) {
                console.log(err);
            }));
        }
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

    $scope.searchUI = function() {
        lfmAPIservice.searchArtistsUI($scope.filter, function(data) {
            $scope.artists = data;
            //$scope.artist = new Artist();
        });
    };

    $scope.editIndex = null;
    $scope.editArtist = function (artist, index) {
        $scope.editIndex = index;
        $scope.artist = artist.copy();
    };

    $scope.cancelEdit = function () {
        $scope.editIndex = null;
        $scope.artist = new Artist();
    };

    $scope.insertGenre = function (genre) {
        genre.push({type:null});
    };

    $scope.insertAlbum = function (albums) {
        albums.push({name:null, dor:null, songs:[{name:null, soundCloud:null}]});
    };

    $scope.insertSong = function (songs) {
        songs.push({name:null, soundCloud:null});
    };

    $scope.remGenre = function (genre, id) {
        genre.splice(id, 1);
    };

    $scope.remAlbum = function (albums, id) {
        albums.splice(id, 1);
    };

    $scope.remSong = function (songs, id) {
        songs.splice(id, 1);
    };
});