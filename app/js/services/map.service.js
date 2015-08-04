'use strict';

// MAP Services
// Provides Cable and TAPs installation map
// Author: Alfin Akhret [alfin.akhret@gmail.com]
// Company: Biznet
// Division: Digital Marketing

angular.module('BzApp')
	
	.service('f_map', function(s_tap, s_nearestTap, s_install, s_property, $rootScope){
		// =================================================================================
		// global vars
		// =================================================================================
		var marker = new google.maps.Marker({
				//draggable: true,
				// map: map,
				// id:1
		});
		
		// use this variable for location and tap marker
		var coverageMarker =[];
		var circles = []; // used by tap coverage radius
		
		var infowindow = new google.maps.InfoWindow();
		// =================================================================================
		
		
		// global functions ================================================================
		//==================================================================================
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
		
		//====================================================================================
		
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
		
		
		// show apartment location
		this.showApartmentCoverage = function(map){
			// first, remove the circles
			if(typeof circles !== 'undefined' && circles != "" && circles != null){
				for(var i =0; i<circles.length; i++){
					circles[i].setMap(null);
				}
				circles = [];
			}
		
		
			// check if coverageMarker is null
			if(typeof coverageMarker === 'undefined' || coverageMarker === null || coverageMarker == "" ){
			
				// call property coordinate
				// with the type of aprtement.
				// apartemen has an property id 1
				s_property.getCoordinate(1) // 1: apartment, kedepannya harus di refactor
					.then(function(r){
					
						var gpsNoSpaceChar = [];
						var sanitizedCoordinate = [];
						var temp = [];
						
						$rootScope.propCoordinate = [];
						
						
						
						for(var i=0; i<r.length; i++){
							
							// check if GPS coordinate is not:
							// - null
							// - contain only whitespace
							// - empty
							// - undefined
							if(r[i]['PROPERTY_GPS'] !== null && r[i]['PROPERTY_GPS'] !== /^ *$/ && r[i]['PROPERTY_GPS'] != " " && r[i]['PROPERTY_GPS'] != "" && typeof r[i]['PROPERTY_GPS'] !== 'undefined')
							{
								// our database data is not quite sanitize yet
								// some of the coordinate are in DMS (degree, minute, second) format
								// others are in decimal coordinate
								// we must convert them to decimal coordinate in order to use them as google maps marker object
								
								// remove all space from string
								gpsNoSpaceChar[i] = r[i]['PROPERTY_GPS'].replace(/ /g,'');
								
								// split it into lat and lng
								temp[i] = gpsNoSpaceChar[i].split(/[\,\\;]+/);
								var tmpLat = temp[i][0];
								var tmpLng = temp[i][1];
								
									
								// let see if the given coordinate is in DMS format
								// by checking if its contain degree ('\u00B0') character
								if(gpsNoSpaceChar[i].indexOf('\u00B0') !== -1){
									
									// sanitize each of latitude and longitude
									// and put it on correspondence variables
									// latitude
									var latDesignator = (tmpLat.indexOf("S") === 1 || tmpLat.indexOf("W") === 1) ? 1 : -1;
									var splittedDMSLat = tmpLat.split(/[\u00B0\'"S\\"E\\"T]+/);
									var lat = (parseInt(splittedDMSLat[0]) + (parseInt(splittedDMSLat[1])/60) + (parseInt(splittedDMSLat[2])/3600)) * latDesignator;
									
									// longitude
									var lngDesignator = (tmpLng.indexOf("S") === 1 || tmpLng.indexOf("W") === 1) ? 1 : -1;
									var splittedDMSLng = tmpLng.split(/[\u00B0\'"S\\"E\\"T]+/);
									var lng = (parseInt(splittedDMSLng[0]) + (parseInt(splittedDMSLng[1])/60) + (parseInt(splittedDMSLng[2])/3600)) * lngDesignator;
									
									
									
									// push the latitude and longitude into sanitized coordinate array
									sanitizedCoordinate[i] = [r[i]["PROPERTY_ID"], lat, lng];
									
								} else {
									// put the rest of coordinate (those which already in decimal format)
									// into sanitized coordinate array
									// we will use this variable in creating google marker for apartment below
									sanitizedCoordinate[i] = [r[i]["PROPERTY_ID"], parseFloat(tmpLat), parseFloat(tmpLng)];
									
								}
								
								
								// push coordinate of these property to $rootScope
								// we gonna use this to zoom in (or displaying any information related this prop)
								// when user selecting spesific prop
								$rootScope.propCoordinate[i] = sanitizedCoordinate[i];
								
								
								// create the marker
								var pos = new google.maps.LatLng(sanitizedCoordinate[i][1], sanitizedCoordinate[i][2]);
								var apartmentIcon = 'coverage/images/hotels.png';
								coverageMarker.push(new google.maps.Marker({
									position: pos,
									map: map,
									title: r[i]['PROPERTY_NAME'],
									icon: apartmentIcon
								}));
								
							}
							
						}
					
					});
				
			} else {
				for(var i=0; i<coverageMarker.length; i++){
					coverageMarker[i].setMap(map);
				}
			}
		
		}
		
		// show tap coverage radius
		this.showCoverageRadius = function(map, callback){
			
			// first, hide the apartment markers if any
			
			if(typeof coverageMarker !== 'undefined' && coverageMarker != "" && coverageMarker != null){
				for(var i =0; i<coverageMarker.length; i++){
					coverageMarker[i].setMap(null);
				}
				coverageMarker = [];
			}
			
			
			if(typeof circles === 'undefined' || circles == "" || circles == null){
				// s_radius.placeRadius2(map);
				s_tap.tapCoordinate().then(function(r){
					
					
					var taps = [];
						for(var i=0; i<r.length; i++){
							// sanitize coordinate data
							r[i]["COORDINATE"] = (r[i]["COORDINATE"]).replace(/\s/g, '');
							var coord = (r[i]["COORDINATE"]).split(',');
					
							// add tap coordinate to array
							taps.push(new google.maps.LatLng(coord[0], coord[1]));
						
						}
						
						for(var tap in taps){
							// radius options
							var radiusOptions = {
								strokeOpacity: 0,
								strokeWeight: 0,
								fillColor: '#f48226',
								fillOpacity: 0.15,
								map: map,
								center: taps[tap],
								radius: 60,
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
						} 
						
						// return false if it resides outside the circle markers
						google.maps.event.addListener(map, 'click', function(e) {
							placeMarker(e.latLng, marker, map, geocoder, infowindow, callback);
							callback(false);
						}); 
						
						
				});

			} else {
				for(var i=0; i<circles.length; i++){
					circles[i].setMap(map);
				}
			}
			
			
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