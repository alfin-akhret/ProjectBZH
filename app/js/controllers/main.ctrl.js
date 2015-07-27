'use strict';
angular.module('BzApp')
	.controller('MainController', function($scope, f_map, h_haversine){
		
		// search form component
		$scope.searchForm = {};
		
		// display result
		$scope.displayResult = false;
		$scope.resetDisplayResult = function(){
			$scope.displayResult = false;	
		};
		
		// modal box
		$scope.showModal = false;
	    $scope.toggleModal = function(){
	        $scope.showModal = !$scope.showModal;
	    };
		
		
		// check user's role
		if (typeof userRole !== 'undefined') {
			$scope.userRole = userRole;
			console.log(userRole);
			
			var map = f_map.initialize();
			f_map.setCenterToCurrentUserPosition(map);
			f_map.showCoverageArea(map);
			f_map.showCoverageRadius(map);
			f_map.showTaps(map);
			f_map.targetInstallLocation(map);
			
		} else {
			var map = f_map.initialize();
			f_map.setCenterToCurrentUserPosition(map);
			f_map.showCoverageArea(map); // TODO: this should be called based on user input
			f_map.showCoverageRadius(map);
			f_map.addClickEvent(map, cb);
			f_map.activateSearchBox(map, cb);
			f_map.showTaps(map);
		}
		
		// click event callback
		function cb(a, latLng){
			$scope.$apply(function(){			// important!
				// $scope.searchForm.street = s;
				// $scope.searchForm.streetNum = sn;
				// $scope.searchForm.region = r;
				$scope.searchForm.address = a;
				$scope.searchForm.lat = latLng['A'];
				$scope.searchForm.lon = latLng['F'];
				$scope.displayResult = true;
			});
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
	




