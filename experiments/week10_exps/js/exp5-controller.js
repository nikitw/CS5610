var app = angular.module('TripPlannerApp.controllers', []);


app.controller('photosCtrl', function($scope, $location, photosAPI) {
    $scope.delEnable = true;

    $scope.files = photosAPI.getUploads(function(files) {
        $scope.files = files;
    });

    $scope.onComplete = function(content) {
        console.log(JSON.parse(content));
        $location.path('photos');
    };

    $scope.deletePhoto = function(name) {
        photosAPI.deletePhoto(name, function(data) {
            $scope.files.splice($scope.files.indexOf(name), 1);
        });
    };
});