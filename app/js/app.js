'use strict';
(function(){
	angular.module('BzApp', ['BzApp.config', 'ui.router']);
	
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
	  	admin: 'admin',
	  	engineer: 'engineer'
	})
// 	.constant('REQHEADER', {'Content-type': 'application/x-www-form-urlencoded',
//                     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//                   'X-Requested-With':'XMLHttpRequest'});
    
    angular.module('BzApp').config(function ($stateProvider) {

	  $stateProvider
	    .state('welcome', {
	      url: '/',
	      // ...
	      data: {
	        requireLogin: false
	      }
	    })
	    .state('app', {
	      abstract: true,
	      // ...
	      data: {
	        requireLogin: true // this property will apply to all children of 'app'
	      }
	    })
	    .state('app.dashboard', {
	      // child state of `app`
	      // requireLogin === true
	    })
	
	}); 
     
})();