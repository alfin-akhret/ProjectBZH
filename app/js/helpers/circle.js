'use strict';

// Helpers
// Provides function for common task
// Author: Alfin Akhret [alfin.akhret@gmail.com]
// Company: Biznet
// Division: Digital Marketing

angular.module('BzApp')

    // s_circle helper
    // draw circle on map
    .service('h_circle', function(){
        this.drawCircle = function(point, radius, dir){
            
            var d2r = Math.PI / 180;   // degrees to radians 
		    var r2d = 180 / Math.PI;   // radians to degrees 
		    var earthsradius = 3963; // 3963 is the radius of the earth in miles
			var points = 32; 
					
			 // find the raidus in lat/lon 
			var rlat = (radius / earthsradius) * r2d; 
			var rlng = rlat / Math.cos(point.lat() * d2r); 
					
			var extp = new Array(); 
			if (dir==1) {var start=0;var end=points+1} // one extra here makes sure we connect the
			else{var start=points+1;var end=0}
		    for (var i=start; (dir==1 ? i < end : i > end); i=i+dir)  
		    {
			    var theta = Math.PI * (i / (points/2)); 
			    var ey = point.lng() + (rlng * Math.cos(theta)); // center a + radius x * cos(theta) 
				var ex = point.lat() + (rlat * Math.sin(theta)); // center b + radius y * sin(theta) 
			    extp.push(new google.maps.LatLng(ex, ey));
			}
		    return extp;
        }
    })