'use strict';
angular.module('BzApp')
	.controller('BzController', function($scope, f_map){
	
	// map initialization (first page load)
	var map = new f_map();
	map.initialize();
	
	
 	
});




