var app = angular.module('TripPlannerApp.controllers', []);

var $navScope = null;
app.controller('nav', function($scope) {
    $navScope = $scope;
    $navScope.page = null;
});

app.controller('ctrl', function($scope, $location, $routeParams) {
    $scope.message = null;
    $scope.email = null;

    $scope.leaveAMessage = function() {
        if ($scope.message == '' || $scope.message == null || $scope.email == null || $scope.email == '') {
            $scope.info = {message: "* marked fields are mandatory"};
            return;
        }
        $scope.info = {message: "your message has been sent successfully, we will get back to you as soon as possible"};
        $scope.message = null;
        $scope.email = null;

    };

    $scope.nav = function(page) {
        $navScope.page = page;
    }
});