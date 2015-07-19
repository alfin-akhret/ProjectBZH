'use strict';

angular.module('BzApp')
    .factory('f_auth', function($http, Session){
        
        var authService = {};
        
        authService.login(function(credentials){
            return $http.post('app/backend/user.php')
                .then (function(r){
                    Session.create(r.data.id, r.data.user.id, r.data.user.role);
                    return r.data.user;
                });
        });
        
        authService.isAuthenticated = function(){
            return !!Session.userId;
        };
        
        authService.isAuthorized = function(){
            if(!angular.isArray(authorizedRoles)){
                authorizedRoles = [authorizedRoles];
            }
            
            return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
        };
        
        return authService;
        
        
        
    })
    .service('Session', function(){
       this.create = function(sessionId, userId, userRole){
           this.id = sessionId;
           this.userId = userId;
           this.userRoles = userRole;
       };
       
       this.destroy = function(){
            this.id = null;
            this.userId = null;
            this.userRoles = null;
       };
    });
    