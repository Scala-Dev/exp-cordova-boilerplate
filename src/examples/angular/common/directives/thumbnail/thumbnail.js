'use strict';

angular.module('cordova-boilerplate')
.directive('thumbnail', function(){
  return function(scope, element, attrs) {
    var url = attrs.thumbnail;
    element.css({
      'background-image': 'url(' + url +')'
    });
  };
});
