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
    // TODO: For now this helper returns closest TAP position AND its distance.
    // this helper SHOULD ONLY return DISTANCE for more general uses. Need refactoring.
    .service('h_haversine', function(){
        this.getDistance = function(currentPos, targetPos){
            
            // convert numeric degrees (Latitude and longitude) to Radians degree
            if (typeof(Number.prototype.toRad) === "undefined") {
                Number.prototype.toRad = function() {
                    return this * Math.PI / 180;
                }
            }
            
            // TODO: output SHOULD NOT BE array. 
            // It SHOULD BE a numeric value (distance in meter with two decimal precision)
            var output = [];
            
            // The earth radius in Km
            var R = 6372.8;
            
            // TODO: this for loop is not neccessary because next time we will only calculate single value at a time
            for(var i = 0; i < targetPos.tapCoordinate.length; i++){
                
                // initialize radians version of the coordinate
                var lat1 = currentPos["A"], lon1 = currentPos["F"], lat2 = targetPos.tapCoordinate[i][0], lon2 = targetPos.tapCoordinate[i][1];
                var dLat = (lat2 - lat1).toRad();
                var dLon = (lon2 - lon1).toRad();
                
                // Implement the HAVERSINE
                var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
                var c = 2 * Math.asin(Math.sqrt(a));
                output[i] = R * c;
            }
            
            // TODO: this SHOULD NOT be here
            // this SHOULD BE in the caller
            Array.min = function( array ){
                return Math.min.apply( Math, array );
            };
            
            var minimum = (Array.min(output) * 1000).toFixed(2); // in meters with two decimal points
            var target = targetPos.tapCoordinate[output.indexOf(minimum)];
            
            // console.log(minimum);
            
            return {
                m : minimum
            }
        }
    })