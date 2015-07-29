angular.module('BzApp')
    .factory('s_area', function($http, $q){
       return {
           getRegion: function(){
               var d = $q.defer();
				$http.get("app/backend/area.php")			// TODO: this should called backend scripts
					.success(function(response){
						d.resolve(response);
				});
				return d.promise;
           },
           getZip: function(){
               var d = $q.defer();
				$http.get("app/backend/zip.php")			// TODO: this should called backend scripts
					.success(function(response){
						d.resolve(response);
				});
				return d.promise;
           }
       } 
    });