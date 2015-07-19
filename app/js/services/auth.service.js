'use strict';

angular.module('BzApp')
    .factory('f_auth', function($http, REQHEADER, s_session){
        return {
            login: function(credentials){
                return $http.post('app/backend/user.php', $.param(credentials), {headers: REQHEADER})
                    .success(function(data, status, headers, config){
                        // create user session
                        if(data.user){
                            s_session.create(data.user.sessionId, data.user.id, data.user.role);
                            return data.user;    
                        }
                        
                    })
                    .error(function(data, status, headers, config){
                        // TODO: exception due to server error or whatever
                    });
            }
        };
    })

    .service('s_session', function(){
        return {
            create: function(sessionId, userId, userRole){
                this.sessionId = sessionId;
                this.userId = userId;
                this.userRole = userRole;
            },
            destroy: function(){
                this.sessionId = null;
                this.userId = null;
                this.userRole = null;
            }
        }; 
    })
    
    // Authentication service event listener and dispatcher
    .service('s_isLogin', function($rootScope, AUTH_EVENTS){
        return {
            broadcastLoginSuccess: function(){
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            },
            broadcastLoginFailed: function(){
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            },
            listen: function(callback){
                $rootScope.$on(AUTH_EVENTS.loginSuccess, callback);
            }
        }
    });
    