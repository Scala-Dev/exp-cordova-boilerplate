'use strict';

angular.module('mobile-boilerplate')
.controller('MainwrapCtrl', function ($scope, $mdSidenav) {

  this.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };

  this.navIsOpen = function (menuId) {
    return $mdSidenav(menuId).isOpen();
  };

});

