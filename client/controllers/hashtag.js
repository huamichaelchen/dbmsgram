angular.module('dbmsgram')
    .controller('HashtagCtrl', function($scope, $rootScope, $location, API) {

        var hashtag = $location.path().split('/').pop();

        API.getHashtag().success(function(data) {
            $scope.hashtag = data;
        })
    });
