'use strict';

// MAP Services
// Provides authentication subroutines
// Author: Alfin Akhret [alfin.akhret@gmail.com]
// Company: Biznet
// Division: Digital Marketing

angular.module('BzApp')
    .factory('f_auth', function($http, REQHEADER, s_session){
        return {
            login: function(credentials){
                // call the backend API
                return $http.post('app/backend/user.php', $.param(credentials), {headers: REQHEADER})
                    .success(function(data, status, headers, config){
                        // on success and we get a return
                        // check if user is authenticated
                        // the api will return user data if user is authenticated
                        // otherwise it will return nothing
                        if(data.user){
                            // create user session using s_session service
                            // we gonna use this later to access user spesific data from entire app
                            s_session.create(data.user.sessionId, data.user.id, data.user.role);
                            return data.user;    
                        }
                        
                    })
                    // just in case the communication to API returning unexpected error
                    // throw an exception here
                    .error(function(data, status, headers, config){
                        // TODO: exception due to server error or whatever
                    });
            },
            isAuthenticated: function(){
                return !!s_session.userId;
            },
            isAuthorized: function(authorizedRoles){
                // TODO: ini masih ngaco! damn
                
                // if(!angular.isArray(authorizedRoles)){
                //     authorizedRoles = [authorizedRoles];
                // }
                
                // this.isAuthenticated();
                
                // return (this.isAuthenticated() && authorizedRoles.indexOf(s_session.userRole) !== -1);
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
    
    // Authentication service event listener and broadcaster
    // this service will be use to broadcast user state to $rootScope (entire app)
    // we put it here to prevent bad practice for accessing rootscope from controller.
    // broadcasting and listening to $rootScope from controllers will lead to confusion
    // since rootScope is accessible to all apps under the hood.
    // by put it in a service we can make sure "which controller listen to what"
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
    