'use strict';
(function(){
	angular.module('BzApp', ['BzApp.config']);
	
	angular.module('BzApp.config',[])
	.constant('REQHEADER', {'Content-type': 'application/x-www-form-urlencoded'});
// 	.constant('REQHEADER', {'Content-type': 'application/x-www-form-urlencoded',
//                     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//                   'X-Requested-With':'XMLHttpRequest'});
                  
})();