'use strict';

angular.module('BzApp')
    .controller('RevisionController', function($scope, s_area){
        // onload, fetch region data
        $scope.regionList;
        $scope.regions = $scope.regions;
        s_area.getRegion()
            .then(function(regions){
                $scope.regionList = regions;
            });
            
        // load zipcode data
        $scope.zipList;
        $scope.zip = $scope.zipList;
        $scope.getZipCode = function(){
            s_area.getZip()
                .then(function(zip){
                    $scope.zipList = zip[0]["zip"];            
                });
        };
        
        
        
        
    });