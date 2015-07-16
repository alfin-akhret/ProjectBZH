'use strict';
angular.module('BzApp')
	.controller('MainController', function($scope, f_map){
	
	// map initialization (first page load)
	var map = new f_map();
	map.initialize(true);
 	
});




