'use strict';

// Helpers
// Provides function for common task
// Author: Alfin Akhret [alfin.akhret@gmail.com]
// Company: Biznet
// Division: Digital Marketing

angular.module('BzApp')

    // h_haversine helper
    // implementation of Haversine formula (https://en.wikipedia.org/wiki/Haversine_formula) 
    // to calculate distance between two points
    // @param : intallPos, targtePos
    // TODO: for now we mock install position from current user position, 
    // later it will defined by user input on the map
    .service('h_haversine', function(){
        this.getDistance = function(startPos, targetPos){
            
            // convert numeric degrees (Latitude and longitude) to Radians degree
            if (typeof(Number.prototype.toRad) === "undefined") {
                Number.prototype.toRad = function() {
                    return this * Math.PI / 180;
                }
            }
            
            var output;
            var R = 6372.8;
            
            // initialize radians version of the coordinate
            var lat1 = startPos["A"], lon1 = startPos["F"], lat2 = targetPos[0], lon2 = targetPos[1];
            var dLat = (lat2 - lat1).toRad();
            var dLon = (lon2 - lon1).toRad();
            // Implement the HAVERSINE
            var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
            var c = 2 * Math.asin(Math.sqrt(a));
            output = R * c;
            
            // TODO: this SHOULD NOT be here
            // this SHOULD BE in the caller
            
            // console.log(minimum);
            
            return output;
        }
    })