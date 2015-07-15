'use strict';
angular.module('BzApp')
	
	// TAP getter
	.service('s_tap', function(){
		
		this.getTapPos = function(){
			
			var taps = [
              [-6.2293465,106.829518],
              [-6.2296700,106.829518],
              [-6.2299900,106.829518]
            ];
            
            return taps;
		}
		
		
	})
	
	// Cable getter
	.service('s_cable', function(s_tap){
		
		this.getCablesRoute = function(){
			
			var cables = [];
			for(var i = 0; i < s_tap.getTapPos().length; i++){
				cables.push(new google.maps.LatLng(s_tap.getTapPos()[i][0], s_tap.getTapPos()[i][1]));
			}

			return cables;
		}
		
	})
	
	// Marker
	.service('s_marker', function(s_cable){
		
		this.placeMarker = function(){
			var iconImg = "app/images/calendar-blue-circle.png";
			
			// return s_cable.getCablesRoute()[0];
			
			
			// for(var i = 0; i < s_cable.getCablesRoute().length; i++){
			// 	var cableRoute = 
				
			// 	var marker = new google.maps.Marker({
			// 		position : new google.maps.LatLng()
			// 	});
			// }
		}
		
	})
	
	
	// TAP coordinate provider
	.factory('f_map', function(s_marker){
		return function (){ // TODO: add param client position
			
			
			
			return {
				marker: s_marker.placeMarker()
			}
		}
	});