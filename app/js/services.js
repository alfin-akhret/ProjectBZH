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
		
		var taps = s_tap.getTapPos();
		var cables = [];
		
		this.getCablesRoute = function(){
			for(var i = 0; i < taps.length; i++){
				cables.push(new google.maps.LatLng(taps[i][0], taps[i][1]));
			}

			return cables;
		}
		
	})
	
	
	// TAP coordinate provider
	.factory('f_map', function(s_tap, s_cable){
		return function (client_position){
			
			
			
			return {
				taps : s_tap.getTapPos(),
				cables : s_cable.getCablesRoute() 
			}
		}
	});