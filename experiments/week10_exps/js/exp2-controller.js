var app = angular.module('TripPlannerApp.controllers', []);


app.controller('mapCtrl', function($scope, $location, mapsAPIservice) {
    $scope.multiDest = true;
    mapsAPIservice.load();
}).directive('mapSpace', function() {
    initialize();
    return {};
});