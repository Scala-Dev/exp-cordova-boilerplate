'use strict';

angular.module('mobile-boilerplate')
.config(function ($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    });
});
