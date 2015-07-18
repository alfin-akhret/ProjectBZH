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
						
					new google.maps.Marker({
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
				
				new google.maps.Polyline({
			        path: cables,
		            geodesic: true,
	                strokeColor: 'blue',
	                strokeOpacity: 1.0,
	                strokeWeight: 2,
		            map:map
		        });
			});
		};
		
	})
	
	
	// geolocation service
	// add current user position to map
	.service('s_userPosition', function(){
		this.getCurrentPos = function(map){
			
			// The Navigator.geolocation read-only property returns a Geolocation object 
			// that gives Web content access to the location of the device
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function(position){
					var userIcon = 'app/images/maps_street_view.png';
					
					var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					
					new google.maps.Marker({
						position: pos,
						map: map,
						icon: userIcon,
						title: "You"
					});
					
					map.setCenter(pos);
				});
			}
		};
	})
	
	// get nearest TAP
	.service('s_nearestTap', function(h_haversine, m_tap){
		this.getDistance = function(map){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function(position){
					var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					// var pos = new google.maps.LatLng(-6.2878500,106.8059844);
					
            
					m_tap.tapCoordinate().then(function(r){
						var distance = [];
						for(var i = 0; i < r.tapCoordinate.length; i++){
							// call the r_haversine helper
							distance.push(h_haversine.getDistance(pos, r.tapCoordinate[i]));
						}
						// calculate minimum distance
						Array.min = function( array ){
			                return Math.min.apply( Math, array );
			            };
			            
			            var minimum = (Array.min(distance)); // in meters with two decimal points
			            var target = r.tapCoordinate[distance.indexOf(minimum)];
			            // convert distance to meter
			            minimum = (minimum * 1000).toFixed(2);
			            
			            // put red dot on target
			            new google.maps.Marker({
			            	position: new google.maps.LatLng(target[0], target[1]),
			            	icon: "app/images/Red-circle.png",
			            	map:map
			            })
			            
						
						var lineCoordinates = [
						    pos,
						    new google.maps.LatLng(target[0], target[1])
						  ];
						
						var line = new google.maps.Polyline({
						    path: lineCoordinates,
						    geodesic: true,
			                strokeColor: 'red',
			                strokeOpacity: 0.75,
			                strokeWeight: 1,
				            map:map
						  });
						  
						var infowindow = new google.maps.InfoWindow({
					        map: map,
					        position: new google.maps.LatLng(target[0], target[1]),
					        content: 'Closest TAP: ' + minimum + ' m'
					      });
						
					});
				});
			}
		};
	})
	
	// map provider
	// create coverage area map
	.factory('f_map', function(s_tap, s_cable, s_userPosition, s_nearestTap){
		return function (){ 
			
			return {
				initialize : function(showTap){ // TODO: add param client position
					// map options
					var latLng = new google.maps.LatLng(-6.2297465,106.829518);
		            var mapOptions = {
		                center: latLng,
		                zoom: 18
		            };
		            
		            // create map
		            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		            
		            // place the TAPs
		            if(showTap == true){
		            	s_tap.placeTapMarker(map);	
		            }
		            
		            // draw the cable's line
		            s_cable.placeCableRouteMarker(map);
		           
					s_userPosition.getCurrentPos(map);
					
					// get nearest TAP
					s_nearestTap.getDistance(map);
				}
			};
		};
	});