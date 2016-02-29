'use strict';

angular.module('codeDojoApp.auth', [
  'codeDojoApp.constants',
  'codeDojoApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
