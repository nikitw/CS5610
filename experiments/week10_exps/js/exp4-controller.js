var app = angular.module('TripPlannerApp.controllers', []);


app.controller('photosCtrl', function($scope, $location, photosAPI) {
    $scope.files = photosAPI.getUploads(function(files) {
        $scope.files = files;
    });

    $scope.onComplete = function(content) {
        console.log(JSON.parse(content));
    }
});