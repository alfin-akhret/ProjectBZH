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
           },
		   getCityDetail: function(selectedCity){
				var d= $q.defer();
				$http.get("coverage/backend/area.asp?city_id=" + selectedCity)
					.success(function(response){
						d.resolve(response);
				});
				return d.promise;
		   },
		   getSubDistrictDetail: function(subDistrictId){
				
				// get subdistrict detail based on district id and city id
				
				var d= $q.defer();
				$http.get("coverage/backend/area.asp?subdistrict_id="+ subDistrictId)
					.success(function(response){
						d.resolve(response);
				});
				return d.promise;
		   },
		   getPropDetail: function(propId){
				var d = $q.defer();
				$http.get("coverage/backend/area.asp?prop_id="+ propId)
					.success(function(response){
						d.resolve(response);
				});
				return d.promise;	
		   }
       } 
    });
	
	
	