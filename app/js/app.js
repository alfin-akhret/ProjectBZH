'use strict';
(function(){
	angular.module('BzApp', ['BzApp.config']);
	
	angular.module('BzApp.config',[])
	.constant('REQHEADER', {'Content-type': 'application/x-www-form-urlencoded'});
     
})();