'use strict';
angular.module('BzApp')
	// Map provider
	.factory('s_map', function(){
		return null;
	})
	
	
	// TAP coordinate provider
	.factory('s_tap', function($http, $q){
		return {
			getTapPos: function(){
				var taps = [
	              [-6.2293465,106.829518, 3],
	              [-6.2296700,106.829518, 3],
	              [-6.2299900,106.829518, 3]
	            ];
			}
			
		}
	});