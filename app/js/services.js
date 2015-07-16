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
	
	
	// geolocation service
	// add current user position to map
	.service('s_userPosition', function(){
		this.getCurrentPos = function(map){
			if(navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position) {
			      var pos = new google.maps.LatLng(position.coords.latitude,
			                                       position.coords.longitude);
			
			      var infowindow = new google.maps.InfoWindow({
			        map: map,
			        position: pos,
			        content: "You are here"
			      });
			
			      map.setCenter(pos);
			    }, function() {
			      handleNoGeolocation(true, map);
			    });
			  } else {
			    // Browser doesn't support Geolocation
			    handleNoGeolocation(false, map);
			  }
		        
		    function handleNoGeolocation(errorFlag, map){
		    	if (errorFlag) {
				    var content = 'Error: The Geolocation service failed.';
				} else {
				    var content = 'Error: Your browser doesn\'t support geolocation.';
				}
				var options = {
				    map: map,
				    position: new google.maps.LatLng(60, 105),
				    content: content
				  };
				
				  var infowindow = new google.maps.InfoWindow(options);
				  map.setCenter(options.position);
		    }
		}
	})
	
	// map provider
	// create coverage area map
	.factory('f_map', function(s_tap, s_cable, s_userPosition){
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
		            
		            // place current user marker
		            s_userPosition.getCurrentPos(map);

				}
			};
		};
	});