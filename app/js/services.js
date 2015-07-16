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
		
		// place TAP's marker on map
		this.placeTapMarker = function(map){
			
			var tapIcon = 'app/images/calendar-blue-circle.png';
			
			m_tap.tapCoordinate().then(function(r){
				for(var i = 0; i < r.tapCoordinate.length; i++){
						
					var marker = new google.maps.Marker({
		       			position: new google.maps.LatLng(r.tapCoordinate[i][0], r.tapCoordinate[i][1]),
	                    map: map,
 	                    icon:tapIcon
		            });
				}
			});
		};
		
	})
	
	// s_cable service
	// connect all TAP's with cable line
	.service('s_cable', function(m_tap){
		
		// create cable route marker
		// and place it on the map
		this.placeCableRouteMarker = function(map){
			
			m_tap.tapCoordinate().then(function(r){
				var cables = [];
		
				for(var i = 0; i < r.tapCoordinate.length; i++){
					cables.push(new google.maps.LatLng(r.tapCoordinate[i][0], r.tapCoordinate[i][1]));
				}
				
				var cablePath = new google.maps.Polyline({
			        path: cables,
		            geodesic: true,
	                strokeColor: 'blue',
	                strokeOpacity: 1.0,
	                strokeWeight: 1,
		            map:map
		        });
			});
		};
		
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
		            };
		            
		            // create map
		            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		            
		            // place the TAPs
		            s_tap.placeTapMarker(map);
		            
		            // draw the cable's line
		            s_cable.placeCableRouteMarker(map);

				}	
			};
		};
	});