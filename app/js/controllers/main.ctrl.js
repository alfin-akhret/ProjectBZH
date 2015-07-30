'use strict';
angular.module('BzApp')
	.controller('MainController', function($scope, f_map, h_haversine, s_area){
	
		// ============= AUTHORIZATION =======================================================
		// check user's role
		if (typeof userRole !== 'undefined') {
			$scope.userRole = userRole;
			
			var map = f_map.initialize();
			f_map.setCenterToCurrentUserPosition(map);
			f_map.showCoverageArea(map);
			f_map.showCoverageRadius(map);
			f_map.showTaps(map);
			f_map.targetInstallLocation(map);
			
		} else {
			var map = f_map.initialize();
			
			f_map.showCoverageRadius(map, isCover);
			//f_map.addClickEvent(map, cb);
			//f_map.activateSearchBox(map, cb);
			// f_map.showTaps(map);
		}
		
		// END OF AUTHORIZATION ===============================================================
	
		
		// callback for coverage radius
		$scope.coverage = 'false';
		function isCover(s){
			$scope.$apply(function(){
				$scope.coverage = s;
			});
		}
		
		
		// set install location
		$scope.setInstallationLocation = function(coordinate){
			var map = new f_map();
			map.initialize(true, true, coordinate);
		}
		// ====================================================================================
		
		
		// ONLOAD =============================================================================
		// these script called when first load
		// ====================================================================================
		// onload, fetch region data
        $scope.cityList;
        $scope.selectedCity = $scope.cityList;
        s_area.getCity()
            .then(function(r){
                $scope.cityList = r;	
            });
            
			
        // load zipcode data
        $scope.districtList;
        $scope.selectedDistrict = $scope.districtList;
        $scope.getDistrict = function(){
            s_area.getDistrict($scope.selectedCity['CITY_ID'])
                .then(function(d){
                    $scope.districtList = d;
					
					// get current selected city GPS and split them into lat and lng
					// then zoom the map to that location
					if ($scope.selectedCity['CENTER_GPS']){
						var selectedCityCoordinate = ($scope.selectedCity['CENTER_GPS']).split(",");
						f_map.setZoomToThisLocation(map, selectedCityCoordinate[0], selectedCityCoordinate[1]);
						//f_map.addClickEvent(map, cb);
					}
									
                });
        };
		
		// street
		$scope.street;
		$scope.findStreet = function(){
			var fullAddressStr = $scope.selectedCity['CITY_NAME'] + " " + $scope.selectedDistrict['DISTRICT_NAME'] + " " + $scope.street;
			f_map.getLatLngFromName(map, fullAddressStr, 17);
		}
		
		// Zoom Map function
		$scope.zoomDistrict = function(){
			f_map.getLatLngFromName(map, $scope.selectedDistrict['DISTRICT_NAME'], 16);
			//f_map.addClickEvent(map, cb);
		}
		
		// END OF ON LOAD =======================================================================
		
		
		
		
		
		//=======================================================================================
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
	




