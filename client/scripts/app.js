/// @file app.js
/// @brief main client module, AngularJS application with routing

angular.module('checkerApp', ['ngRoute'] )
    .config(['$routeProvider',
             function($routeProvider) {
                 $routeProvider.when('/about', {
                     templateUrl: 'views/about.html',
                     controller: 'aboutCtrl'
                 }).when('/profile', {
                         templateUrl: 'views/player_profile.html',
                         controller: 'playerCtrl'
                 }).otherwise( {
                     templateUrl: '/404.html',
                     controller: ''
                 });
             }]);


