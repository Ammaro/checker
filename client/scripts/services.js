/// @file services.js
/// @brief AngularJS services, AJAX communication with the server

angular.module('checkerApp')
    .service('serverApi', //current information from zsm server
             function($http) {
                 this.baseURL = client_server_prefix + '/ajax/'; //the prefix defined in version.js

                 this.getVersion = function(callback) {
                     return $http.get(this.baseURL + 'version/get').success(callback);
				 };
                 this.getCurrent = function(callback) {
                     return $http.get(this.baseURL + 'current/get').success(callback);
                 };
                 this.getPlayer = function(callback, playerId) {
                     return $http({'url': this.baseURL + 'game/players',
                                   'method':'GET',
                                   params:{'id':playerId}}).success(callback);
                 };
                 this.getAllPlayers = function(callback) {
                     return $http.get(this.baseURL + 'game/players').success(callback);
                 };
             });
