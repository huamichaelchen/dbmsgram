angular.module('dbmsgram')
    .controller('UserPersonalFeedCtrl', function($scope, $rootScope, $location, API) {

        API.getFeed().success(function(data) {
            $scope.photos = data;
            console.log(data);
        });
    });
