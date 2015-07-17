'use strict';
// HAVERSINE FORMULA
angular.module('BzApp')
    .service('h_haversine', function(){
        this.getDistance = function(currentPos, targetPos){
            var output = [];
            var R = 6372.8; // km
            for(var i = 0; i < targetPos.tapCoordinate.length; i++){
              
                var lat1 = currentPos["A"], lon1 = currentPos["F"], lat2 = targetPos.tapCoordinate[i][0], lon2 = targetPos.tapCoordinate[i][1];
                var dLat = lat2 - lat1;
                var dLon = lon2 - lon1;
                var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
                var c = 2 * Math.asin(Math.sqrt(a));
                output[i] = R * c;
            }
            
            Array.min = function( array ){
                return Math.min.apply( Math, array );
            };
            
            var minimum = Array.min(output);
            var target = targetPos.tapCoordinate[output.indexOf(minimum)];
            return target;
        }
    })