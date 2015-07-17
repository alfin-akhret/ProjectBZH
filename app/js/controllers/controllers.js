'use strict';
angular.module('BzApp')
	.controller('MainController', function($scope, f_map, h_haversine){
	
	// map initialization (first page load)
	var map = new f_map();
	map.initialize(true);
	
	
 	
});




