angular.module('dbmsgram')
    .controller('LoginCtrl', function($scope, $window, $location, $rootScope, $auth) {
/*
Satellizer has two sign-in methods: authenticate and login.
The former is for the OAuth 1.0 and OAuth 2.0 sign-in and
the latter is for the email (or username) and password sign-in.
*/

        $scope.instagramLogin = function() {
            $auth.authenticate('dbmsgram')
                .then(function(response) {
                    $window.localStorage.currentUser = JSON.stringify(response.data.user);
                    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                })
                .catch(function(response) {
                    console.log(response.data);
                });
        };

        $scope.emailLogin = function() {
            $auth.login({ email: $scope.email, password: $scope.password })
                .then(function (response) {
                    $window.localStorage.currentUser = JSON.stringify(response.data.user);
                    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                })
                .catch(function(response) {
                    $scope.errorMessage = {};
                    angular.forEach(response.data.message, function(message, field) {
                        $scope.loginForm[field].$setValidity('server', false);
                        $scope.errorMessage[field] = response.data.message[field];
                    });
                });
        };

    })
