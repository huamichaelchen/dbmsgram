angular.module('dbmsgram', ['ngRoute', 'ngMessages', 'auth0', 'angular-storage',
'angular-jwt', 'satellizer'])
    .config(function($routeProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            /*.when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })*/
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/photo/:id', {
                tempalteUrl: 'views/detail.html',
                controller: 'DetailCtrl'
            })
            .when('/userpersonalfeed', {
                templateUrl: 'views/user-personal-feed.html',
                controller: 'UserPersonalFeedCtrl'
            })
            .when('/explore/:hashtag', {
                tempalteUrl: 'views/hashtag.html',
                controller: 'HashtagCtrl'
            })
            .when('/upload', {
                templateUrl: 'views/upload.html',
                controller: 'UploadCtrl'
            })
            .otherwise('/');

        authProvider.init({
            domain: 'huamichaelchen.auth0.com',
            clientID: 'SqmMynRgebyi0qVElcRg2mbDvZItfjD4'
        });

        // We're annotating this function so that the `store` is injected correctly when this file is minified
        jwtInterceptorProvider.tokenGetter = ['store', function(store) {
            // Return the saved token
            return store.get('token');
        }];

        $httpProvider.interceptors.push('jwtInterceptor');
    })
    .run(function(auth, $rootScope, store, jwtHelper, $location) {
        // This hooks al auth events to check everything as soon as the app starts
        auth.hookEvents();

        $rootScope.$on('$locationChangeStart', function() {
            var token = store.get('token');
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                } else {
                    $location.path('/');
                }
            }
        })
    });


/* TODO: instagram authentication
        $authProvider.loginUrl = 'http://localhost:3000/auth/login';
        $authProvider.signupUrl = 'http://localhost:3000/auth/signup';
        $authProvider.oauth2({
            name: 'dbmsgram',
            url: 'http://localhost:3000/auth/dbmsgram',
            redirectUri: 'http://localhost:8000',
            clientId: '0a574443109943a8ace18890906a5d1a',
            requiredUrlParams: ['scope'],
            scope: ['likes'],
            scopeDelimiter: '+',
            authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
        });
*/
