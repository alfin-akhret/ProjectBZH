'use strict';
// HAVERSINE FORMULA
angular.module('BzApp')
    .service('h_haversine', function(){
        this.getDistance = function(currentPos, targetPos){
            
            /** Converts numeric degrees to radians */
            if (typeof(Number.prototype.toRad) === "undefined") {
                Number.prototype.toRad = function() {
                    return this * Math.PI / 180;
                }
            }
            
            var output = [];
            var R = 6372.8; // km
            for(var i = 0; i < targetPos.tapCoordinate.length; i++){
                
                var lat1 = currentPos["A"], lon1 = currentPos["F"], lat2 = targetPos.tapCoordinate[i][0], lon2 = targetPos.tapCoordinate[i][1];
                var dLat = (lat2 - lat1).toRad();
                var dLon = (lon2 - lon1).toRad();
                var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
                var c = 2 * Math.asin(Math.sqrt(a));
                output[i] = R * c;
            }
            
            Array.min = function( array ){
                return Math.min.apply( Math, array );
            };
            
            var minimum = (Array.min(output) * 1000).toFixed(2); // in meters with two decimal points
            var target = targetPos.tapCoordinate[output.indexOf(minimum)];
            
            console.log(minimum);
            
            // return {
            //     t : target,
            //     m : minimum
            // }
        }
    })