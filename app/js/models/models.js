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
    })
    .service('m_user', function($http, $q, REQHEADER){
        return {
            login: function(formData){
                var d = $q.defer();
                $http.post("app/backend/user.php", $.param(formData), {headers: REQHEADER})
                    .success(function(response){
                        d.resolve(response); 
                    });
                return d.promise;
            }
            
        }
    })