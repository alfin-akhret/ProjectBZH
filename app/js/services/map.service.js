'use strict';

// MAP Services
// Provides Cable and TAPs installation map
// Author: Alfin Akhret [alfin.akhret@gmail.com]
// Company: Biznet
// Division: Digital Marketing

angular.module('BzApp')
	
	.service('f_map', function(s_tap, s_nearestTap, s_install){
		// common vars
		var marker = new google.maps.Marker({
				//draggable: true,
				// map: map,
				// id:1
		});
		var infowindow = new google.maps.InfoWindow();
		
		function placeMarker(location, marker, map, geocoder, infowindow, callback){
		    	geocoder.geocode({'location': location}, function(results, status) {
				    if (status == google.maps.GeocoderStatus.OK) {
				      if (results[1]) {
				      	
				        marker.setPosition(location);
				        //callback(results[0].formatted_address, results[0].geometry.location);
				        
				      } else {
				        window.alert('No results found');
				      }
				    } else {
				      window.alert('Geocoder failed due to: ' + status);
				    }
				});
			
		    }
		
		this.initialize = function(){
			var centerPos = new google.maps.LatLng(-6.2297465,106.829518);
			var mapOptions = {
				center: centerPos,
				zoom: 8,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			return new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		};
		
		this.setCenterToCurrentUserPosition = function(map){
			s_userPosition.getCurrentPos(map);
		};
		
		this.setZoomToThisLocation = function(map, lat, lng, zoom){
			var centerPos = new google.maps.LatLng(lat,lng);
			
			map.setCenter(centerPos);
			if (zoom)
			{
				map.setZoom(zoom);
			} else {
				map.setZoom(12);
			}
			
		}
		
		this.getLatLngFromName = function(map, districtName, zoom){
			var geocoder =  new google.maps.Geocoder();
			geocoder.geocode( { 'address': districtName}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
										
					var centerPos = new google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng());
					map.setCenter(centerPos);
					if (zoom)
					{
						map.setZoom(zoom);
					} else {
						map.setZoom(15);
					}
				} else {
					return null;
				}
			});
		}
		
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
		
		this.showCoverageRadius = function(map, callback){
			// s_radius.placeRadius2(map);
			s_tap.tapCoordinate().then(function(r){
				var taps = [];
					for(var tap in r.tapCoordinate){
						taps.push(new google.maps.LatLng(r.tapCoordinate[tap][0], r.tapCoordinate[tap][1]));
					}
					
					
					var circles = [];
					for(var tap in taps){
						// radius options
						var radiusOptions = {
						    strokeOpacity: 0,
						    strokeWeight: 0,
						    fillColor: '#f48226',
						    fillOpacity: 0.5,
						    map: map,
						    center: taps[tap],
						    radius: 20,
							zIndex: tap
						};
						
						circles.push(new google.maps.Circle(radiusOptions));
					}
					
					var geocoder = new google.maps.Geocoder();
					
					marker.setMap(map);
					
					
					// check coverage area on CLICK
					// return true if its resides inside the circle marker
					for(var i=0; i < circles.length; i++){
						google.maps.event.addListener(circles[i], 'click', function(e) {
							placeMarker(e.latLng, marker, map, geocoder, infowindow, callback);
							callback(true);
							
						});
						
						/**
						google.maps.event.addListener(circles[i], 'dragend', function(e){
							placeMarker(e.latLng, marker, map, geocoder, infowindow, callback);
							callback(true);
						});
						**/
						
					}
					
					// return false if it resides outside the circle markers
					google.maps.event.addListener(map, 'click', function(e) {
					    placeMarker(e.latLng, marker, map, geocoder, infowindow, callback);
						callback(false);
					});
					
					
					// convert actual meter to google mapsPixel
					// using helper: mercantorProjection helper.
					google.maps.event.addListener(map, 'zoom_changed', function () {
						  for(var i=0; i<circles.length; i++){
							circles[i].set({radius:getNewRadius(map, 60)});
						  }
						  
					});
					 
					 
					
					
			});

		};

		
		
		// search box
		this.activateSearchBox = function(map, callback){
			// Create the search box and link it to the UI element.
			  var input = /** @type {HTMLInputElement} */(
			      document.getElementById('pac-input'));
			  
			  var searchMarker = marker;
		      
			  var markers = [];
			  var searchBox = new google.maps.places.SearchBox(
			    /** @type {HTMLInputElement} */(input));
			
			  // Listen for the event fired when the user selects an item from the
			  // pick list. Retrieve the matching places for that item.
			  google.maps.event.addListener(searchBox, 'places_changed', function() {
			    var places = searchBox.getPlaces();
			
			    if (places.length == 0) {
			      return;
			    }
			    for (var i = 0, marker; marker = markers[i]; i++) {
			      searchMarker.setMap(null);
			    }
			
			    // For each place, get the icon, place name, and location.
			    markers = [];
			    var bounds = new google.maps.LatLngBounds();
			    for (var i = 0, place; place = places[i]; i++) {
			
				  searchMarker.set('position', place.geometry.location);
				  searchMarker.set('map', map);
			
				  // infowindow.setContent(places[0].formatted_address);
				  // infowindow.setContent("Drag me to your exact location");
				  
				  // infowindow.open(map, searchMarker);
				  
				  callback(places[0].formatted_address, places[0].geometry.location);
				 
			      markers.push(searchMarker);
			
			      bounds.extend(place.geometry.location);
			    }
			
			    map.fitBounds(bounds);
				
			  });

		};
		
		this.getNearestTap = function(map){
			
		};
		
		this.targetInstallLocation = function(map){
			s_install.setLocation(map);
		}
	
	});