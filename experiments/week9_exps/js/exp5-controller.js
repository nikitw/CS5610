angular.module('PrimeBoxApp')
    .controller('homeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function($rootScope, $scope, $location, $localStorage, Main) {

        $scope.signin = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }

            Main.signin(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    $location.path('me');
                }
            }, function() {
                $rootScope.error = 'Failed to signin';
            })
        };

        $scope.signup = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            Main.save(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    $location.path('me');
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };

        $scope.me = function() {
            Main.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };

        $scope.token = $localStorage.token;

        if($scope.token){
            $scope.user = Main.getUser();
            $location.path('me');
        }
    }])
    .controller('meCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function($rootScope, $scope, $location, $localStorage, Main) {
        $scope.token = $localStorage.token;

        $scope.logout = function() {
            Main.logout(function() {
                $location.path('signin');
            }, function() {
                alert("Failed to logout!");
            });
        };

        if($scope.token){
            $scope.user = Main.getUser();
            $location.path('me');
        } else {
            $location.path('signin');
        }
    }]);