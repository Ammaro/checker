/// @file app.js
/// @brief main client module, AngularJS application with routing

angular.module('checkerApp', ['ngRoute'] )
    .config(['$routeProvider',
             function($routeProvider) {
                 $routeProvider.when('/about', {
                     templateUrl: 'views/about.html',
                     controller: 'aboutCtrl'
                 }).when('/player/:id', {
                         templateUrl: 'views/player.html',
                         controller: 'playerCtrl'
                 }).when('/players', {
                         templateUrl:'views/players.html',
                         controller: 'playersCtrl'
                 }).otherwise( {
                     templateUrl: 'views/about.html',
                     controller: ''
                 });
             }]);


