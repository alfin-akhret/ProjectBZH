'use strict';

// MAP Services
// Provides Cable and TAPs installation map
// Author: Alfin Akhret [alfin.akhret@gmail.com]
// Company: Biznet
// Division: Digital Marketing

angular.module('BzApp')
	
	// map provider
	// create coverage area map
	// .factory('f_map', function(s_tap, s_cable, s_userPosition, s_nearestTap, s_install, s_radius){
	// 	return function (){ 
			
	// 		return {
	// 			initialize : function(showTap, showDistance, installLocation){ // TODO: add param client position
	// 				// map options
	// 				// if(typeof installLocation === 'undefined'){
	// 				// 	var iLat = -6.2297465;
	// 				// 	var iLng = 106.829518;
	// 				// } else {
	// 				// 	var iLat = installLocation.Lat;
	// 				// 	var iLng = installLocation.Lng;
	// 				// }
					
	// 				// var latLng = new google.maps.LatLng(iLat,iLng);
	// 	   //         var mapOptions = {
	// 	   //             // center: latLng,
	// 	   //             zoom: 18,
	// 	   //             mapTypeId: google.maps.MapTypeId.ROADMAP
	// 	   //         };
		   
	// 	   			if(navigator.geolocation){
	// 					navigator.geolocation.getCurrentPosition(function(position){
	// 						var userIcon = 'app/images/maps_street_view.png';
	// 						var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
							
	// 						// create map
	// 						var mapOptions = {
	// 			                center: pos,
	// 			                zoom: 18,
	// 			                mapTypeId: google.maps.MapTypeId.ROADMAP
	// 			            };
							
	// 	            		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
							
	// 						// add user marker
	// 						new google.maps.Marker({
	// 							position: pos,
	// 							map: map,
	// 							icon: userIcon,
	// 							title: "You are here"
	// 						});
							
	// 						// place KML overlay
	// 						// TODO: this overlay should be created when user select spesific region on drop down menu
	// 						// var mapUrl = "http://www.biznethome.net/temp/maps/BendunganHilir.kml";
	// 	     //           	var ctaLayer = new google.maps.KmlLayer({
	// 	     //               	url: mapUrl,
	// 	     //               	zoom: 50
	// 	     //           	});
	// 	     //           	ctaLayer.setMap(map);
		                	
		                	
	// 					});
	// 				}
		           
	// 	   //     	// place KML overlay
	// 	   //     	
		        	
		        
	// 	   //         // place the TAPs
	// 	   //         if(showTap == true){
	// 	   //         	s_tap.placeTapMarker(map);	
	// 	   //         }
		            
	// 	   //         if(showDistance == true){
	// 	   //         	// s_userPosition.getCurrentPos(map);
	// 	   //         	s_install.setLocation(map, iLat, iLng);
	// 				// 	// get nearest TAP
	// 				// 	s_nearestTap.getDistance(map, iLat, iLng);
	// 	   //         }
		            
	// 	   //         // draw the cable's line
	// 	   //         // s_cable.placeCableRouteMarker(map);
		            
	// 	   //         // draw the radius
	// 	   //         s_radius.placeRadius(map);
		            
	// 	   //         // click event
	// 	   //         google.maps.event.addListener(map, 'click', function(event) {
	// 				//   placeMarker(event.latLng);
	// 				// });
					
	// 				// var marker = new google.maps.Marker();
	// 			 //   var geocoder = new google.maps.Geocoder();
	// 			 //   var infowindow = new google.maps.InfoWindow();
					
	// 				// function placeMarker(location) {
	// 				//     geocoder.geocode({'location': location}, function(results, status) {
	// 				// 	    if (status == google.maps.GeocoderStatus.OK) {
	// 				// 	      if (results[1]) {
	// 				// 	        // map.setZoom(18);
	// 				// 	        marker.setPosition(location);
	// 				//     		marker.setMap(map);
	// 				// 	        infowindow.setContent(results[0].formatted_address);
	// 				// 	        infowindow.open(map, marker);
	// 				// 	      } else {
	// 				// 	        window.alert('No results found');
	// 				// 	      }
	// 				// 	    } else {
	// 				// 	      window.alert('Geocoder failed due to: ' + status);
	// 				// 	    }
	// 				// 	});
	// 				// }
	// 			},
	// 			selectRegion: function(region, map){
	// 				var mapUrl = "http://www.biznethome.net/temp/maps/BendunganHilir.kml";
	// 	            var ctaLayer = new google.maps.KmlLayer({
	// 	                url: mapUrl,
	// 	                zoom: 50
	// 	            });
	// 	            ctaLayer.setMap(map);
	// 			}
	// 		};
	// 	};
	// });
	
	.service('f_map', function(s_userPosition, s_tap, s_cable, s_radius, s_nearestTap){
		
		this.initialize = function(){
			var centerPos = new google.maps.LatLng(-6.2297465,106.829518);
			var mapOptions = {
				center: centerPos,
				zoom: 10,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			return new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		};
		
		this.setCenterToCurrentUserPosition = function(map){
			s_userPosition.getCurrentPos(map);
		};
		
		
		this.showCoverageArea = function(map){
			// TODO: need refactoring to spesific service
			var mapUrl = "http://www.biznethome.net/temp/maps/BendunganHilir.kml";
		    var ctaLayer = new google.maps.KmlLayer({
		    	url: mapUrl,
		        // zoom: 50
		    });
		    ctaLayer.setMap(map);
		};
		
		this.showTaps = function(map){
			s_tap.placeTapMarker(map);
		};
		
		this.showCables = function(map){
			s_cable.placeCableRouteMarker(map);
		};
		
		this.showCoverageRadius = function(map){
			s_radius.placeRadius(map);
		};
		
		this.addClickEvent = function(map){
			
			// TODO: refactor to new document :)
			
			var marker = new google.maps.Marker();
			marker.set('draggable', true);
			marker.setMap(map);
			
			var geocoder = new google.maps.Geocoder();
		    var infowindow = new google.maps.InfoWindow();
					
			function placeMarker(location) {
				geocoder.geocode({'location': location}, function(results, status) {
				    if (status == google.maps.GeocoderStatus.OK) {
				      if (results[1]) {
				      	// map.setZoom(18);
				        marker.setPosition(location);
			    		
				        infowindow.setContent(results[0].formatted_address);
				        infowindow.open(map, marker);
				      } else {
				        window.alert('No results found');
				      }
				    } else {
				      window.alert('Geocoder failed due to: ' + status);
				    }
				});
			}
			
			function geocodePosition(pos) {
			    geocoder.geocode({
			      'latLng': pos
			    }, function(responses) {
			      if (responses && responses.length > 0) {
			        updateMarkerAddress(responses[0].formatted_address);
			      } else {
			        updateMarkerAddress('Cannot determine address at this location.');
			      }
			    });
			}
			
			// click event
		    google.maps.event.addListener(map, 'click', function(event) {
		    	placeMarker(event.latLng);
			});
			
			// drag event
			google.maps.event.addListener(marker, 'dragend', function() {
				placeMarker(marker.getPosition());
			});
		};
		
		this.getNearestTap = function(map){
			
		}
	
	});