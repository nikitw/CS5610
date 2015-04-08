var app = angular.module('TripPlannerApp.controllers', []);


app.controller('mapCtrl', function($scope, $location, mapsAPIservice) {
    mapsAPIservice.load();
}).directive('mapSpace', function() {
    initialize();
    return {};
});