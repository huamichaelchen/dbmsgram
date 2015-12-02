angular.module('dbmsgram')
    .factory('API', function($http) {
        return {
            getFeed: function() {
                return $http.get('http://localhost:3000/api/v1/p');
            },
            getHashtag: function(hashtag) {
                return $http.get('http://localhost:3000/api/v1/explore/' + hashtag);
            },
            getMediaById: function(id) {
                return $http.get('http://instagram-server.herokuapp.com/api/media/' + id);
            },
            likeMedia: function(id) {
                return $http.post('http://instagram-server.herokuapp.com/api/like', { mediaId: id });
            },
            postPhoto: function() {
                return $http.post('http://localhost:3000/api/v1/photo');
            }
        }
    });
