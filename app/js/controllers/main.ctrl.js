'use strict';
angular.module('BzApp')
	.controller('MainController', function($scope, f_map, h_haversine, s_area, $rootScope){
	
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
			
			//f_map.showCoverageRadius(map, isCover);
			
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
		
		// ZOOM TO CITY
		// when user select a spesific region/city, zoom the map to that location
		$scope.selectedCity;
		$scope.zoomRegion = function(){
			if(typeof $scope.selectedCity !== 'undefined' && $scope.selectedCity !== null && $scope.selectedCity !== ""){
				
				// get this city detail
				// param ID
				s_area.getCityDetail($scope.selectedCity)
					.then(function(r){
						
						// sanitize GPS data
						if(typeof r[0]["CENTER_GPS"] !== 'undefined' && r[0]["CENTER_GPS"] !== null){
							r[0]["CENTER_GPS"] = (r[0]["CENTER_GPS"]).replace(/\s+/g,'');
							var coord = (r[0]["CENTER_GPS"]).split(',');
						
							// zoom the map
							f_map.setZoomToThisLocation(map, coord[0], coord[1]);
						} else {
							alert("Coordinate data is unavailable. Cannot find the location");
						}
						
					});
				
			} else {
				alert("Theres something wrrong");
			}
		}
		
		
		// ZOOM DISTRICT
		$scope.selectedSubDistrict;
		$scope.zoomSubDistrict = function(){
			if(typeof $scope.selectedSubDistrict !== 'undefined' && $scope.selectedDistrict !== null && $scope.selectedDistrict !== ""){
				s_area.getSubDistrictDetail($scope.selectedSubDistrict)
					.then(function(r){
						f_map.getLatLngFromName(map, r[0]['AREA_SUBDISTRICT'], 16);
					});
			}
		}
		
		
		// LOAD COVERAGE AREA BASED ON PROPERTY TYPE
		$scope.propertyType;
		$scope.showCoverage = function(){
			if(typeof $scope.propertyType !== 'undefined' && $scope.propertyType !== null && $scope.propertyType !== ""){
				
				if($scope.propertyType == "apartment"){
					// call apartmen coordinate
					f_map.showApartmentCoverage(map);
				} else {
					// call tap and coverage radius
					f_map.showCoverageRadius(map, isCover);
				}
				
				
			}
		}
		
		// ZOOM TO PROPERTY BUILDING
		$scope.selectedProp;
		$scope.showProp = function(){
			if(typeof $scope.selectedProp !== 'undefined' && $scope.selectedProp !== null && $scope.selectedProp !== ""){
				
				var lat,lng;
				for(var i = 0; i < $rootScope.propCoordinate.length; i++){
					if(typeof $rootScope.propCoordinate[i] !== 'undefined' && $rootScope.propCoordinate[i] != null){
						if($rootScope.propCoordinate[i][0] == $scope.selectedProp){
						
							lat = $rootScope.propCoordinate[i][1];
							lng = $rootScope.propCoordinate[i][2];
							console.log(lat+ ", " +lng);
						
							break;
						}
					}
				}
				console.log(lat+ ", " +lng);
				
				f_map.setZoomToThisLocation(map, lat, lng);
			}
		}
		
		
		
		
		// ONLOAD =============================================================================
		// these script called when first load
		// ====================================================================================
		// onload, fetch region data
		
		/**
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
		$scope.streetNum = 0;
		$scope.info = false;
		$scope.findStreet = function(){
			var fullAddressStr = $scope.selectedCity['CITY_NAME'] + " " + $scope.selectedDistrict['DISTRICT_NAME'] + " " + $scope.street + $scope.streetNum;
			f_map.getLatLngFromName(map, fullAddressStr, 17);
		}
		
		// Zoom Map function
		$scope.zoomDistrict = function(){
			f_map.getLatLngFromName(map, $scope.selectedDistrict['DISTRICT_NAME'], 16);
			//f_map.addClickEvent(map, cb);
		}
		
		// residential Type
		$scope.residentialType;
		
		**/
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
	




