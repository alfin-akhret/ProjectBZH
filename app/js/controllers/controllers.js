'use strict';
angular.module('BzApp')
	.controller('MainController', function($scope, f_map, h_haversine, USER_ROLES, f_auth){
	
		// users
		$scope.currentUser = null;
		$scope.userRoles = USER_ROLES;
		$scope.isAuthorized = f_auth.isAuthorized();
		
		$scope.setCurrentUser = function(user){
			$scope.currentUser = user;
		}
		
		// map initialization (first page load)
		// var map = new f_map();
		// map.initialize(true);
	})
	
	// Auth Controller 
	.controller('AuthController', function($scope, $rootScope, AUTH_EVENTS, m_user,f_auth){
		
		$scope.credentials = {
			username: '',
			password: ''
		};
		
		$scope.login = function(credentials){
		
			m_user.login(credentials)
				.then(function(user){
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
					$scope.setCurrentUser(user);
					console.log(user);
				}, function(){
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				});
		};
				
	});




