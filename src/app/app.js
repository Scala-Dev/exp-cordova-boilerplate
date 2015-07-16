'use strict';

var app = {
  bootstrap: function(sdk) {
    angular.module('mobile-boilerplate').value('scala', sdk);
    angular.bootstrap(document, ['mobile-boilerplate']);
  }
};


angular.module('mobile-boilerplate', [
  'ngAnimate',
  'ui.router',
  'ngAria',
  'ngMaterial',
  'ngTouch',
  'ngResource',
  'ngMessages'
])
.run(['$rootScope', 'scala', function($rootScope, scala) {
  var onPause = function() {
    console.log('onPause');
    $rootScope.$broadcast('pause', 'test');
  };

  var onResume = function() {
    console.log('onResume');
    $rootScope.$broadcast('resume', 'test');
  };

  document.addEventListener('pause', onPause, false);
  document.addEventListener('resume', onResume, false);

  console.log('angular started');

  // login
  scala.authenticate({
    'uuid': '1f6060b0-4330-407e-b4b1-cd8b0d3efbf6',
    'secret': 'DEVICE-SECRET'
  });

}])
.directive('expclick', function() {
  return function(scope, element, attrs) {

    element.bind('click', function(event) {
      event.preventDefault();
      event.stopPropagation();

      scope.$apply(attrs.expclick);
    });
  };
})
.config(function ($animateProvider, $mdThemingProvider, $urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('pink');

  //disable animation on certain elements. Animation causes problems on a list
  $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);

  $httpProvider.useApplyAsync(true);

  $urlRouterProvider.otherwise('/main');
});
