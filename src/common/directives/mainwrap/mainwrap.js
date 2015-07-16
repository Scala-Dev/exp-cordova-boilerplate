'use strict';

angular.module('mobile-boilerplate')
.directive('mainWrap', function () {
  return {
    templateUrl: 'common/directives/mainwrap/mainwrap.html',
    restrict: 'EA',
    transclude: true,
    controller: 'MainwrapCtrl',
    controllerAs: 'mainwrapCtrl'
  };
});
