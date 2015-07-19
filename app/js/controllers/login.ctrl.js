'use strict';

angular.module('BzApp')
    .controller('LoginController', function($rootScope, $scope, f_auth, s_isLogin){
        $scope.login = function(credentials){
            // call the login service
            f_auth.login(credentials).then(function(user){
                if(user.data.login){
                    s_isLogin.broadcastLoginSuccess();
                } else {
                    s_isLogin.broadcastLoginFailed();
                }
            }, function(){
                s_isLogin.broadcastLoginFailed();
            });
        }
    });