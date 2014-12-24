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
                         controller: 'PlayCtrl'
                 }).when('/rooms', {
                         templateUrl: 'views/rooms.html',
                         controller: 'RoomsCtrl'
                 }).when('/register', {
                         templateUrl:'views/register.html',
                         controller: 'addPlayerCtrl'
                 }).when('/login', {
                         templateUrl: 'views/login.html',
                         controller: ''
                 }).when('/tutorial', {
                         templateUrl: 'views/tutorial.html',
                         controllers:"TutorialCtrl"
                 }).otherwise( {
                     templateUrl: 'views/about.html',
                     controller: ''
                 });
             }]);


