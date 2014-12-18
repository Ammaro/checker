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
	.controller('addPlayerCtrl', ['$scope', 'serverApi', '$location',
				function($scope, serverApi, $location) {
					$scope.newplayer = {};
					$scope.showErrors = false;
					$scope.errorMessages = [];
					$scope.validator = function(form) {
						$scope.errorMessages = [];
						forms = [form.password, form.confirmPassword, form.name];
						names = ['passowrd', 'password-confirm', 'name']
						var error = false
						for(var i=0;i<forms.length;i++) {
							if (!forms[i]) {
								$scope.errorMessages.push(names[i] + " cant be empty");
								error = true;
							} else if (forms[i].length < 5) {
								$scope.errorMessages.push(names[i] + " has to be at least 5 characters");
								error = true;
							}
						}

						if (form.password != form.confirmPassword && !error) {

							$scope.errorMessages.push('password and confirm password has to be the same ');
							error = true;
						}
						return error;
					}
					$scope.addPlayer = function() {
						if($scope.validator($scope.newplayer)) {
							$scope.showError = true;
							return;
						}
						serverApi.addPlayer($scope.newplayer, function(){
							$location.path('/');
						}, function(data, status, headers, config) {
								$scope.showError = true;
								$scope.errorMessages.push(data+" " +data);
								$scope.errorMessages.push(status+" " + status)
								$scope.errorMessages.push(config+" "+config);
								$scope.errorMessages.push(headers+" "+headers);
						});
					}
				}]);


