var app = angular.module('TripPlannerApp.controllers', []);


app.controller('mapCtrl', function($scope, $location, mapsAPIservice) {
    mapsAPIservice.load();

    $scope.addMarkerOnMap = function () {
        if($scope.address)
            mapsAPIservice.search($scope.address);
    }

}).directive('mapSpace', function() {
    initialize();
    return {};
});