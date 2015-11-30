angular.module('dbmsgram', ['ngRoute', 'ngMessages', 'satellizer'])
    .config(function($routeProvider, $authProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
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
            .when('/user', {
                templateUrl: 'views/user.html',
                controller: 'UserCtrl'
            })
            .otherwise('/');
/*
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
    });
