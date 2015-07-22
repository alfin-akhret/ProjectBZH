'use strict';
angular.module('BzApp')
	.controller('MainController', function($scope, f_map, h_haversine, s_isLogin, USER_ROLES, f_auth){
		
	
		// users
		$scope.currentUser = null;
		$scope.userRoles = USER_ROLES;
		$scope.isAuthorized = f_auth.isAuthorized();
		
		$scope.setCurrentUser = function(user){
			$scope.currentUser = user;
		}
		
		// map initialization (first page load)
		var map = new f_map();
		map.initialize(true);

		s_isLogin.listen(function(){
			console.log("Logged in");	
		});

	})
	




