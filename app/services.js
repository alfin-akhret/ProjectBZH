'use strict';
angular.module('BzApp')
	.factory('s_area', function($http, $q){
		return {
			getArea: function(){
				var d = $q.defer();
				$http.get("app/area.json")			// TODO: this should called backend scripts
					.success(function(response){
						d.resolve(response);
					});
					return d.promise;
			}
		}
	});