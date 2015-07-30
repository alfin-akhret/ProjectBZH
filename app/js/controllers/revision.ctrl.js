'use strict';

angular.module('BzApp')
    .controller('RevisionController', function($scope, s_area){
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
            s_area.getDistrict($scope.selectedCity)
                .then(function(d){
                    $scope.districtList = d;            
                });
        };
		
        
        
        
        
    });