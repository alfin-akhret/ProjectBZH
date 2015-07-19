'use strict';

angular.module('BzApp')
    .controller('LoginController', function($rootScope, $scope, f_auth, s_isLogin){
        $scope.login = function(credentials){
            // call the login service
            f_auth.login(credentials).then(function(user){
                if(user.data.login){
                    
                    // if user is authenticated
                    // broadcast the login status using s_login
                    // so entire app can listen to it
                    s_isLogin.broadcastLoginSuccess();
                    
                } else {
                    s_isLogin.broadcastLoginFailed();
                }
            }, function(){
                // exception for unexpected error
                s_isLogin.broadcastLoginFailed();
            });
        }
    });