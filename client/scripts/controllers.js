/// @file controllers.js
/// @brief AngularJS controllers
// TODO refactoring controllers into separate modules
angular.module('checkerApp')
	.controller('aboutCtrl', //versions of system modules
				['$scope', '$timeout','serverApi',
				 function($scope, $timeout, serverApi) {

					 serverApi.getVersion(
					 	 function(data) {
					 		 $scope.server_ver = data;
					 	 });
				 	 var REFRESH_INTERVAL = 1000; //ms
					 var call = function() { //function called periodically
						 serverApi.getCurrent(
					 		 function(data) {
					 			 $scope.current = data;
								 $timeout(call, REFRESH_INTERVAL);
					 		 });
					 };
					 $timeout(call, 0); //start calling the service

				 }])
	.controller('playerCtrl',
				['$scope', '$timeout','serverApi', '$routeParams',
				 function($scope, $timeout, serverApi, $routeParams) {
					 var player_id = $routeParams['id'];
					 console.log(player_id);
					 serverApi.getPlayer(function(data){
						 $scope.player = data;
					 },player_id);
				 }])
	.controller('playersCtrl',	['$scope', '$timeout','serverApi',
				 function($scope, $timeout, serverApi) {
					 serverApi.getAllPlayers(function(data){
						 $scope.players = data;
					 });
				 }])


