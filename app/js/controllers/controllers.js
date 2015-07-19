'use strict';
angular.module('BzApp')
	.controller('MainController', function($scope, f_map, h_haversine){
	
		// map initialization (first page load)
		var map = new f_map();
		map.initialize(true);
	})
	
	// Auth Controller 
	.controller('AuthController', function($scope, m_user){
		
		$scope.formData = {};
		
		$scope.login = function(){
			m_user.login($scope.formData)
				.then(function(response){
					console.log(response);
				})
		};
				
	});




