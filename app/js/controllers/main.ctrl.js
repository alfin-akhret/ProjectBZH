'use strict';
angular.module('BzApp')
	.controller('MainController', function($scope, f_map, h_haversine){
		if (typeof userRole !== 'undefined') {
			$scope.userRole = userRole;
			
			var map = new f_map();
			if($scope.userRole.role == 'engineer'){
				map.initialize(true);
			}
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
	




