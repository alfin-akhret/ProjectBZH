'use strict';

// MAP Services
// Provides Cable and TAPs installation map
// Author: Alfin Akhret [alfin.akhret@gmail.com]
// Company: Biznet
// Division: Digital Marketing

angular.module('BzApp')
	
	// map provider
	// create coverage area map
	.factory('f_map', function(s_tap, s_cable2, s_userPosition, s_nearestTap){
		return function (){ 
			
			return {
				initialize : function(showTap, showDistance){ // TODO: add param client position
					// map options
					var latLng = new google.maps.LatLng(-6.2297465,106.829518);
		            var mapOptions = {
		                center: latLng,
		                zoom: 18
		            };
		           
		        
		            // create map
		            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		            
		        	// place KML overlay
		        	var mapUrl = "http://www.biznethome.net/temp/maps/BendunganHilir.kml";

                	// add KML layer
                	var ctaLayer = new google.maps.KmlLayer({
                    	url: mapUrl
                	});
                	ctaLayer.setMap(map);
		        	
		        
		            // place the TAPs
		            if(showTap == true){
		            	s_tap.placeTapMarker(map);	
		            }
		            
		            if(showDistance == true){
		            	s_userPosition.getCurrentPos(map);
						// get nearest TAP
						s_nearestTap.getDistance(map);
		            }
		            
		            // draw the cable's line
		            s_cable2.placeCableRouteMarker(map);
		           
					
				}
			};
		};
	});