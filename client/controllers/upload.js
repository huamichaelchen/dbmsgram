angular.module('dbmsgram')
    .controller('UploadCtrl', function($scope, API) {
        API.postPhoto().success(function(data) {
            console.log(data);
        });
    });
