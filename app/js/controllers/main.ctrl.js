'use strict';
angular.module('BzApp')
	.controller('MainController', function($scope, f_map, h_haversine){
		// check user's role
		if (typeof userRole !== 'undefined') {
			$scope.userRole = userRole;
			
			var map = f_map.initialize();
			f_map.setCenterToCurrentUserPosition(map);
			f_map.showCoverageArea(map);
			f_map.showCoverageRadius(map);
			f_map.showTaps(map);
			
		} else {
			var map = f_map.initialize();
			f_map.setCenterToCurrentUserPosition(map);
			f_map.showCoverageArea(map); // TODO: this should be called based on user input
			f_map.showCoverageRadius(map);
			f_map.addClickEvent(map);
			f_map.activateSearchBox(map);
		}
		
		
		// set install location
		$scope.setInstallationLocation = function(coordinate){
			var map = new f_map();
			map.initialize(true, true, coordinate);
		}
		
		// users
		// $scope.currentUser = null;
		// $scope.userRoles = USER_ROLES;
		// $scope.isAuthorized = f_auth.isAuthorized();
		
		// $scope.setCurrentUser = function(user){
		// 	$scope.currentUser = user;
		// }
		
		// // map initialization (first page load)
		

		// s_isLogin.listen(function(){
		// 	console.log("Logged in");	
		// });

	})
	




