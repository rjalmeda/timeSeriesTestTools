var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/index', {
        templateUrl: '/partials/index.html',
        controller: "indexController"
    })
    .when('/query', {
        templateUrl: '/partials/query.html',
        controller: 'queryController'
    })
    .when('/auth', {
        templateUrl: '/partials/auth.html',
        controller: 'authController'
    })
    .otherwise({
        redirectTo: '/index'
    })
})