angular.module('BzApp')
    .factory('s_area', function($http, $q){
       return {
           getCity: function(){
               var d = $q.defer();
				$http.get("app/backend/area.asp?t=city&q=all")
					.success(function(response){
						d.resolve(response);
				});
				return d.promise;
           },
		   
           getDistrict: function(selectedCity){
               var d = $q.defer();
				$http.get("app/backend/area.asp?t=district&q=all&city_id=" + selectedCity)
					.success(function(response){
						d.resolve(response);
				});
				return d.promise;
           }
       } 
    });