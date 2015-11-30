angular.module('dbmsgram')
    .controller('UserPersonalFeedCtrl', function($scope, $rootScope, $location, API) {

/*
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
              $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
              API.getFeed().success(function(data) {
                $scope.photos = data;
              });
*/
        API.getFeed().success(function(data) {
            $scope.photos = data;
            console.log(data);
        });
    });
