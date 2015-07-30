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