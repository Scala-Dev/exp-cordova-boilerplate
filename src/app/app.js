'use strict';

angular.module('cordova-boilerplate', [
  'ngAnimate',
  'ui.router',
  'ngAria',
  'ngMaterial',
  'ngResource',
  'ngMessages'
])
.run(function($rootScope) {

  console.log('angular started');

  $rootScope.$on('$stateChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$stateChangeSuccess', function(){
    $rootScope.loading = false;
  });

})
.config(function($mdThemingProvider, $mdIconProvider, $animateProvider, $httpProvider, $urlRouterProvider) {
  // setup theme colors
  $mdThemingProvider
    .theme('default')
    .primaryPalette('indigo')
    .accentPalette('pink');

  // setup icons
  $mdIconProvider
    .icon('account', 'img/ic_account_circle_white_24px.svg')
    .icon('app', 'img/ic_web_24px.svg')
    .icon('back', 'img/ic_arrow_back_24px.svg')
    .icon('bluetooth', 'img/ic_bluetooth_searching_black_24px.svg')
    .icon('devices', 'img/ic_devices_black_24px.svg')
    .icon('error', 'img/ic_error_24px.svg')
    .icon('file', 'img/ic_insert_drive_file_24px.svg')
    .icon('folder', 'img/ic_folder_24px.svg')
    .icon('gps', 'img/ic_gps_fixed_24px.svg')
    .icon('menu', 'img/ic_menu_white_24px.svg')
    .icon('url', 'img/ic_language_24px.svg');

  //disable animation on certain elements. Animation causes problems on a list
  $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);

  $httpProvider.useApplyAsync(true);

  $urlRouterProvider.otherwise('/content/root');

});
