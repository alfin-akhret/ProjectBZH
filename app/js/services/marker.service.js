'use strict';

angular.module('BzApp')
    // s_tap service
	// Fetch TAP position from backend API
	// and place TAP marker on map
	.service('s_tap', function($http, $q){
		
		
		// place TAP's marker on map
		this.placeTapMarker = function(map){
			
			var tapIcon = 'app/images/calendar-blue-circle.png';
			
			this.tapCoordinate().then(function(r){
				for(var i = 0; i < r.tapCoordinate.length; i++){
						
					new google.maps.Marker({
		       			position: new google.maps.LatLng(r.tapCoordinate[i][0], r.tapCoordinate[i][1]),
	                    map: map,
 	                    icon:tapIcon
		            });
				}
			});
		};
		
		this.tapCoordinate = function(){
                var d = $q.defer();
				$http.get("app/dummies/taps.json")			// TODO: this should called backend scripts
					.success(function(response){
						d.resolve(response);
				});
				return d.promise;   
            };
		
	})
	
	// s_cable service
	// connect all TAP's with cable line
	.service('s_cable', function(s_tap){
		
		// create cable route marker
		// and place it on the map
		this.placeCableRouteMarker = function(map){
			
			s_tap.tapCoordinate().then(function(r){
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
	
	// alternate cable service.
	.factory('s_cable2', function(s_tap){
		
		return {
			placeCableRouteMarker: function(map){
			
				s_tap.tapCoordinate().then(function(r){
					var ori= [];
					var dest = [];
				
					// http://jsfiddle.net/cnwMG/7/
					var bounds = new google.maps.LatLngBounds();
				
					// generate origin coordinate 
					for(var i = 0; i < r.tapCoordinate.length; i++){
						ori.push(new google.maps.LatLng(r.tapCoordinate[i][0], r.tapCoordinate[i][1]));
					}
					
					// generate destination coordinate
					for(var i = 1; i < r.tapCoordinate.length; i++){
						dest.push(new google.maps.LatLng(r.tapCoordinate[i][0], r.tapCoordinate[i][1]));
					}
					
					for (var i=0; i < dest.length; i++){
				    	calcRoute(ori[i], dest[i]);
				    }
				    
				    function calcRoute(source,destination){
						var polyline = new google.maps.Polyline({
					        path: [],
					        strokeColor: '#00B7FF',
					        strokeWeight: 10,
					        strokeOpacity: .65,
					        map:map
					    });
					    
					   var directionsService = new google.maps.DirectionsService();
					   var dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
					   dirRenderer.setMap(map);
					   
					   var request = { 
					        origin:source, 
					        destination: destination, 
					        travelMode: google.maps.DirectionsTravelMode.WALKING, 
					    //     travelMode: google.maps.DirectionsTravelMode.DRIVING,
  							unitSystem: google.maps.DirectionsUnitSystem.METRIC
					    };
					    
					    directionsService.route(request, function(result, status) { 
					        if (status == google.maps.DirectionsStatus.OK) {
					            var path = result.routes[0].overview_path;
					            
					            // dirRenderer.setDirections(result);
					            
					            // $(path)....
					            $(path).each(function(index, item) {
					                polyline.getPath().push(item);
					                bounds.extend(item);
					            })
					            
					            // polyline.setMap(map);
					            map.fitBounds(bounds);
					        }
					    });
						
					}
					
				});
			},
		};
		
	})
	
	// TODO: need one more function to get user address based on input.
	
	
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
	
	// install location
	.service('s_install', function(){
		this.setLocation = function(map, lat, lng){
			var userIcon = 'app/images/maps_street_view.png';
					
					var pos = new google.maps.LatLng(lat, lng);
					
					new google.maps.Marker({
						position: pos,
						map: map,
						icon: userIcon,
						title: "Install location"
					});
					
					map.setCenter(pos);
		}	
	})
	
	// get nearest TAP
	.service('s_nearestTap', function(h_haversine, s_tap){
		this.getDistance = function(map, lat, lng){
			// if(navigator.geolocation){
				// navigator.geolocation.getCurrentPosition(function(position){
					// var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					var pos = new google.maps.LatLng(lat, lng);
					
					// var pos = new google.maps.LatLng(-6.2878500,106.8059844);
					
            
					s_tap.tapCoordinate().then(function(r){
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
			            
						// put red line to see the connection between target and current user position
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
						
						// display info window
						// containing target distance information
						var infowindow = new google.maps.InfoWindow({
					        map: map,
					        position: new google.maps.LatLng(target[0], target[1]),
					        content: 'Closest TAP: ' + minimum + ' m'
					      });
						
					});
				// });
			// }
		};
	})