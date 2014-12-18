/// @file services.js
/// @brief AngularJS services, AJAX communication with the server

angular.module('checkerApp')
    .service('serverApi', //current information from zsm server
             function($http) {
                 this.baseURL = client_server_prefix;

                 this.getVersion = function (callback) {
                     return $http.get(this.baseURL + 'version/get').success(callback);
                 };
                 this.getCurrent = function (callback) {
                     return $http.get(this.baseURL + 'current/get').success(callback);
                 };
                 this.getPlayer = function (callback, playerId) {
                     return $http({
                         'url': this.baseURL + 'game/players',
                         'method': 'GET',
                         params: {'id': playerId}
                     }).success(callback);
                 };
                 this.getAllPlayers = function (callback) {
                     return $http.get(this.baseURL + 'game/players').success(callback);
                 };
                 this.addPlayer = function (player, successf, errorf) {
                     $http.post(
                         this.baseURL + 'game/addPlayer/',
                         //method: "POST",
                         {'player': player}
                     ).success(successf).error(errorf);
                 }
             });
