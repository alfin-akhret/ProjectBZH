'use strict';

angular.module('BzApp')
    // s_tap service
	// Fetch TAP position from backend API
	// and place TAP marker on map
	.service('s_tap', function($http, $q){
		
		
		// place TAP's marker on map
		this.placeTapMarker = function(map){
			
			// var tapIcon = 'app/images/calendar-blue-circle.png';
			
			this.tapCoordinate().then(function(r){
				for(var tap in r.tapCoordinate){
		   
		   			var markerOptions = {
		   				strokeOpacity: 0,
						strokeWeight: 0,
						fillColor: '#f48226',
						fillOpacity: 1,
						map: map,
						center: new google.maps.LatLng(r.tapCoordinate[tap][0], r.tapCoordinate[tap][1]),
						radius: 3.5
		   			}
		   			new google.maps.Circle(markerOptions);
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
	
	// coverage radius
	.factory('s_radius', function(s_tap, h_circle){
		return{
			placeRadius: function(map){
				// get s_tap position
				var circles = [];
				
				s_tap.tapCoordinate().then(function(r){
					
					// since we cannot combine google.maps.Circle without flushing their overlap alpha
					// we must create cicrle manually using below algorithm
					
					// create circle for each tap
					var radius = [];
					for(var i = 0; i < r.tapCoordinate.length; i++){
						var tap = new google.maps.LatLng(r.tapCoordinate[i][0], r.tapCoordinate[i][1]);
						radius.push(h_circle.drawCircle(tap, 0.025, 1));
					}
				
					
					// set polygon options
					// and combine all circles into single polygon
					var joined = new google.maps.Polygon({
						paths: radius,
		                 strokeColor: "#f48226",
		                 strokeOpacity: 0.0,
		                 strokeWeight: 0,
		                 fillColor: "#f48226",
		                 fillOpacity: 0.5,
		                 clickable: false
					});
					joined.setMap(map);
					
					// click events
					google.maps.event.addListener(map, 'click', function(e) {
					    if (google.maps.geometry.poly.containsLocation(e.latLng, joined)) {
					      console.log("you are coveraged my man!");
					    } else {
					      console.log("not coverage");
					    }
					});
					
				});
			}
		};		
	})

	
	// cable line.
	.factory('s_cable', function(s_tap, h_haversine){
		
		return {
			placeCableRouteMarker: function(map){
			
				s_tap.tapCoordinate().then(function(r){
					var ori= [];
					var dest = [];
				
					// generate origin coordinate 
					for(var i = 0; i < r.tapCoordinate.length; i++){
						ori.push(new google.maps.LatLng(r.tapCoordinate[i][0], r.tapCoordinate[i][1]));
					}
					
					// generate destination coordinate
					for(var i = 1; i < r.tapCoordinate.length; i++){
						dest.push(new google.maps.LatLng(r.tapCoordinate[i][0], r.tapCoordinate[i][1]));
					}
					
					// generate destination coordinate
					// for(var i = 1; i < r.tapCoordinate.length; i++){
					// 	dest.push(new google.maps.LatLng(r.tapCoordinate[i][0], r.tapCoordinate[i][1]));
					// }
					
					//distance.sort(function(a, b){return a-b});
					
					
					for (var i=0; i < dest.length; i++){
				    	calcRoute(ori[i], dest[i]);
				    }
				    
				    // best route calculation
				    function calcRoute(source,destination){
						var polyline = new google.maps.Polyline({
					        path: [],
					        strokeColor: '#f48226',
					        strokeWeight: 5,
					        strokeOpacity: .65,
					        map:map
					    });
					    
					    // http://jsfiddle.net/cnwMG/7/
						var bounds = new google.maps.LatLngBounds();
					    
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
					            // $(dirRenderer).each(function(index, item) {
					                polyline.getPath().push(item);
					                // bounds.extend(item);
					            })
					            
					            polyline.setMap(map);
					            map.fitBounds(bounds); // auto zoom
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
					
					map.set('zoom', 16);
					map.setCenter(pos);
				});
			}
		};
	})
	
	// install location
	.service('s_install', function($http, $q, s_nearestTap){
		this.getLocation = function(){
			var d = $q.defer();
				$http.get("app/backend/installLocation.php")			// TODO: this should called backend scripts
					.success(function(response){
						d.resolve(response);
				});
				return d.promise; 
		};

		this.setLocation = function(map){
			var userIcon = 'app/images/residential-places.png';
					
			this.getLocation().then(function(r){
						
				for(var i = 0; i < r.length;i++ ){
					var pos = new google.maps.LatLng(r[i][3], r[i][4]); // need refactoring when used with real DB
					var marker = new google.maps.Marker({
						position: pos,
						map: map,
						icon: userIcon
					});
					
					
					// google.maps.event.addListener(marker, 'click', function(){
						
					// }).then(function(){});
					
					
							 
					// get nearest tap
					s_nearestTap.getDistance(map, pos);
				}
			
			});
		};
		
		// this.addListener = function(map, marker, pos){
		// 			// google.maps.event.addListener(marker, 'click', function() {
		// 			//     infowindows.push(new google.maps.InfoWindow({
		// 			//         map: map,
		// 			//         position: pos,
		// 			//         content: "tes"
		// 			//     }));
		// 		 //   });
		// };	
		
		
		
	})
	
	// get nearest TAP
	.service('s_nearestTap', function(h_haversine, s_tap){
		this.getDistance = function(map, pos){
			// if(navigator.geolocation){
				// navigator.geolocation.getCurrentPosition(function(position){
					// var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					// var pos = new google.maps.LatLng(lat, lng);
					
					// var pos = new google.maps.LatLng(-6.2878500,106.8059844);
					
            
					s_tap.tapCoordinate().then(function(r){
						var distance = [];
						for(var i = 0; i < r.tapCoordinate.length; i++){
							// call the r_haversine helper
							// distance.push(h_haversine.getDistance([pos["A"], pos["F"]], r.tapCoordinate[i]));
							distance.push(h_haversine.getDistance([pos['A'], pos['F']], r.tapCoordinate[i]));
						}
						// console.log();
						// console.log(r.tapCoordinate[0]);
						
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
						// var infowindow = new google.maps.InfoWindow({
					 //       map: map,
					 //       position: new google.maps.LatLng(target[0], target[1]),
					 //       content: 'Closest TAP: ' + minimum + ' m'
					 //     });
						
					});
				// });
			// }
		};
	})