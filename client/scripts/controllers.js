/// @file controllers.js
/// @brief AngularJS controllers

angular.module('checkerApp')
	.controller('aboutCtrl', //versions of system modules
				['$scope', '$timeout','serverApi',
				 function($scope, $timeout, serverApi) {

					 serverApi.getVersion(
					 	 function(data) {
					 		 $scope.server_ver = data;
					 	 });
					 $scope.client_ver = client_ver_major.toString() + '.' + client_ver_minor.toString() + '.' + client_ver_compilation.toString(); //from version.js file
					// TODO hardcoded number to check if the host server work
					 serverApi.getPlayer(function(){

					},1);
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
				['$scope', '$timeout','serverApi',
				 function($scope, $timeout, serverApi) {
					// TODO hardcoded number to check if the host server work
					 serverApi.getPlayer(function(){

					},1);
				 }]);


