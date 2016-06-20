'use strict';

angular.module('cordova-boilerplate')
.controller('MainCtrl', function ($scope, $mdSidenav) {

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.navIsOpen = function(menuId) {
    return $mdSidenav(menuId).isOpen();
  };

});

