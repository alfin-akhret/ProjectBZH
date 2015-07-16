'use strict';

angular.module('BzApp')
    .service('m_tap', function($http, $q){
        return {
            tapCoordinate : function(){
                var d = $q.defer();
				$http.get("app/dummies/taps.json")			// TODO: this should called backend scripts
					.success(function(response){
						d.resolve(response);
				});
				return d.promise;   
            }
        };
    });