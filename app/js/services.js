'use strict';
angular.module('BzApp')
	
	// TAP getter
	.service('s_tap', function(){
		
		this.getTapPos = function(){
			
			var tapPos = [
              [-6.2293465,106.829518],
              [-6.2296700,106.829518],
              [-6.2299900,106.829518]
            ];
            
    		return tapPos;
		}
		
		this.placeTapMarker = function(map){
			
		
			
			// get icons
			var tapIcon = 'app/images/calendar-blue-circle.png';
			
			// get tap position
			var tapPos = this.getTapPos();
			
			// place tap on the map
			for(var i = 0; i < tapPos.length; i++){
				var marker = new google.maps.Marker({
                   position: new google.maps.LatLng(tapPos[i][0], tapPos[i][1]),
                   map: map,
                   icon:tapIcon
                });
			}
            
		}
		
		
	})
	
	// Cable getter
	.service('s_cable', function(s_tap){
		
		this.getCablesPos = function(){
			
			var cables = [];
			for(var i = 0; i < s_tap.getTapPos().length; i++){
				cables.push(new google.maps.LatLng(s_tap.getTapPos()[i][0], s_tap.getTapPos()[i][1]));
			}

			return cables;
		}
		
		this.placeCableRouteMarker = function(map){
			
			var cables = this.getCablesPos();
			
			var cablePath = new google.maps.Polyline({
                path: cables,
                geodesic: true,
                strokeColor: 'blue',
                strokeOpacity: 1.0,
                strokeWeight: 1,
                map:map
            });
		}
		
	})
	
	
	// TAP coordinate provider
	.factory('f_map', function(s_tap, s_cable){
		return function (){ // TODO: add param client position
			
			return {
				initialize : function(){
					
					var latLng = new google.maps.LatLng(-6.2297465,106.829518);
		            var mapOptions = {
		                center: latLng,
		                zoom: 18
		            }
		            
		            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		            s_tap.placeTapMarker(map);
		            s_cable.placeCableRouteMarker(map);

				}	
			}
		}
	});