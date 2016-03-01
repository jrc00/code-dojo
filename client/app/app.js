'use strict';

angular.module('codeDojoApp', [
  'codeDojoApp.auth',
  'codeDojoApp.admin',
  'codeDojoApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngAnimate',
  'ui.ace'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

