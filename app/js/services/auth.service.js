'use strict';

angular.module('BzApp')
    .factory('s_auth', function($http, $cookieStore, $rootScope, $timeOut, m_user){
        var service = {};
        service.login = login;
        service.setCredential = setCredential;
        service.clearCredential = clearCredential;
        
        return service;
        
        function login(username, password, callback){
            // dummy auth for testing
            $timeOut(function(){
                var response;
                s_user.getUsername(username)
                    .then(function(user){
                        if(user !== null && user.password === password){
                            response = {success: true};
                        } else {
                            response = {success: false, message:"username or password is incorrect"};
                        }
                        callback(response);
                    });
            }, 1000);
            
            // real authentication
            // $http.post('/api/authenticate', { username: username, password: password })
            //     .success(function (response) {
            //         callback(response);
            //     });
        
        }
        
        function setCredential(){
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.default.headers.common.Authorization = 'Basic';
        }
        
    })