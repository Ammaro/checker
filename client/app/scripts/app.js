/// @file app.js
/// @brief main client module, AngularJS application with routing

angular.module('checkerApp', ['ngRoute'])
    .config(['$routeProvider','$httpProvider',
             function($routeProvider, $httpProvider)  {
                    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
                    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
                    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

                 $routeProvider.when('/about', {
                     templateUrl: 'views/about.html',
                     controller: 'aboutCtrl'
                 }).when('/player/:id', {
                         templateUrl: 'views/player.html',
                         controller: 'playerCtrl'
                 }).when('/players', {
                         templateUrl:'views/players.html',
                         controller: 'playersCtrl'
                 }).when('/play', {
                         templateUrl: 'views/game.html',
                         controller: ''
                 }).when('/register', {
                         templateUrl:'views/register.html',
                         controller: 'addPlayerCtrl'
                 }).otherwise( {
                     templateUrl: 'views/about.html',
                     controller: ''
                 });
             }]);


