'use strict';

// MAP Services
// Provides Cable and TAPs installation map
// Author: Alfin Akhret [alfin.akhret@gmail.com]
// Company: Biznet
// Division: Digital Marketing

angular.module('BzApp')
	
	// s_tap service
	// Fetch TAP position from backend API
	// and place TAP marker on map
	.service('s_tap', function(m_tap){
		
		// get TAP's coordinate
		this.getTapPos = function(){
			return m_tap.tapPos;
		}
		
		// place TAP's marker on map
		this.placeTapMarker = function(map){
			
			var tapIcon = 'app/images/calendar-blue-circle.png';
			
			var tapPos = this.getTapPos();
			
			// place TAP on the map
			for(var i = 0; i < tapPos.length; i++){
				var marker = new google.maps.Marker({
                   position: new google.maps.LatLng(tapPos[i][0], tapPos[i][1]),
                   map: map,
                   icon:tapIcon
                });
			}
            
		}
		
	})
	
	// s_cable service
	// connect all TAP's with cable line
	.service('s_cable', function(s_tap){
		
		// get cable coordinate based on TAP's position
		this.getCablesPos = function(){
			
			var cables = [];
			for(var i = 0; i < s_tap.getTapPos().length; i++){
				cables.push(new google.maps.LatLng(s_tap.getTapPos()[i][0], s_tap.getTapPos()[i][1]));
			}

			return cables;
		}
		
		// create cable route marker
		// and place it on the map
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
	
	
	// map provider
	// create coverage area map
	.factory('f_map', function(s_tap, s_cable){
		return function (){ // TODO: add param client position
			
			return {
				initialize : function(){
					// map options
					var latLng = new google.maps.LatLng(-6.2297465,106.829518);
		            var mapOptions = {
		                center: latLng,
		                zoom: 18
		            }
		            
		            // create map
		            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		            
		            // place the TAPs
		            s_tap.placeTapMarker(map);
		            
		            // draw the cable's line
		            s_cable.placeCableRouteMarker(map);

				}	
			}
		}
	});