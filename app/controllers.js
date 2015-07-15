'use strict';
angular.module('BzApp')
	.controller('BzController', function($scope, s_area){
		// vars
		$scope.area;

		// get all coverage area
		$scope.getArea = function(){
      s_area.getArea()
      .then(function(response){
        $scope.area = response;
      });  
    }
    // load area imediately
    $scope.getArea();

    $scope.displayMap = function(){
    	var chicago = new google.maps.LatLng(41.875696,-87.624207);
		  var mapOptions = {
		    zoom: 11,
		    center: chicago
		  }

		  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		  // var geoXml = new geoXML3.parser({
		  //     map: map,
		  //     singleInfoWindow: true,
		  //     // afterParse: useTheData
		  // });
		  // geoXml.parse('maps/cta.kml' /*'google_earth_tutorial_files.kml'*/);


			
		  var ctaLayer = new google.maps.KmlLayer({
		    url: 'http://gmaps-samples.googlecode.com/svn/trunk/ggeoxml/cta.kml'
		  });
		  ctaLayer.setMap(map);
		  
    }
 	
});




