'use strict';

// MAP Services
// Provides Cable and TAPs installation map
// Author: Alfin Akhret [alfin.akhret@gmail.com]
// Company: Biznet
// Division: Digital Marketing

angular.module('BzApp')
	
	// map provider
	// create coverage area map
	.factory('f_map', function(s_tap, s_cable, s_userPosition, s_nearestTap, s_install, s_radius){
		return function (){ 
			
			return {
				initialize : function(showTap, showDistance, installLocation){ // TODO: add param client position
					// map options
					if(typeof installLocation === 'undefined'){
						var iLat = -6.2297465;
						var iLng = 106.829518;
					} else {
						var iLat = installLocation.Lat;
						var iLng = installLocation.Lng;
					}
					
					var latLng = new google.maps.LatLng(iLat,iLng);
		            var mapOptions = {
		                center: latLng,
		                zoom: 18,
		                mapTypeId: google.maps.MapTypeId.ROADMAP
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
		            	// s_userPosition.getCurrentPos(map);
		            	s_install.setLocation(map, iLat, iLng);
						// get nearest TAP
						s_nearestTap.getDistance(map, iLat, iLng);
		            }
		            
		            // draw the cable's line
		            // s_cable.placeCableRouteMarker(map);
		            
		            // draw the radius
		            s_radius.placeRadius(map);
		           
					
				}
			};
		};
	});