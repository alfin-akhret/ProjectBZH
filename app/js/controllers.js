'use strict';
angular.module('BzApp')
	.controller('BzController', function($scope){
	
	$scope.mapFirstLoad = function(){
	    function initialize(){
            var latLng = new google.maps.LatLng(-6.2297465,106.829518);
            var mapOptions = {
                center: latLng,
                zoom: 18
            }
            
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            setMarkers(map, taps);
            
        }
        

        // TAP object declaration and initialization
        var taps = [
              ['tap1', -6.2293465,106.829518, 3],
              ['tap2', -6.2296700,106.829518, 3],
              ['tap3', -6.2299900,106.829518, 3]
            ];
            
        // Cable object declaration and initialization    
        var cables = [
            new google.maps.LatLng(-6.2293465,106.829518),
            new google.maps.LatLng(-6.2296700,106.829518),
            new google.maps.LatLng(-6.2299900,106.829518)
        ];
            
        function setMarkers(map, locations){
            // icons
            // TODO : this should be from local file
            var iconImg = "http://www.kh-uia.org.il/PublishingImages/calendar-blue-circle.png";
            
            // for each tap in taps
            // place new marker on the map
            for (var i = 0; i < taps.length; i++){
                var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
                var marker = new google.maps.Marker({
                   position: myLatLng,
                   map: map,
                   icon:iconImg
                });
                
                
            }
            
            // place the cable troudh markers
            var cablePath = new google.maps.Polyline({
                path: cables,
                geodesic: true,
                strokeColor: 'blue',
                strokeOpacity: 1.0,
                strokeWeight: 3,
                map:map
            });
        }
        
        google.maps.event.addDomListener(window, 'load', initialize);
	}
	
	$scope.mapFirstLoad();
 	
});




