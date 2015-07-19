'use strict';
(function(){
	angular.module('BzApp', ['BzApp.config']);
	
	angular.module('BzApp.config',[])
	.constant('REQHEADER', {'Content-type': 'application/x-www-form-urlencoded'})
	.constant('AUTH_EVENTS', {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    })
    .constant('USER_ROLES', {
      all: '*',
      admin: 'engineer'
    });
// 	.constant('REQHEADER', {'Content-type': 'application/x-www-form-urlencoded',
//                     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//                   'X-Requested-With':'XMLHttpRequest'});
                  
})();