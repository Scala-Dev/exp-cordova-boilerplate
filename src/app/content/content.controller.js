'use strict';

angular.module('cordova-boilerplate')
.controller('ContentCtrl', function ($scope, $state, $mdDialog, currentFolder) {
  console.log('currentFolder is', currentFolder);

  $scope.currentFolder = currentFolder.folder;

  $scope.folders = currentFolder.folders;
  $scope.files = currentFolder.files;

  $scope.showDialog = function(event, content) {
    $mdDialog.show({
      templateUrl: 'app/content/dialog.html',
      fullscreen: true,
      targetEvent: event,
      locals: {
        item: content
      },
      controller: function(scope, contentService, item) {
        scope.item = item;
        scope.showOpenButton = contentService.canOpen(item);
        scope.showFlingButton = item.document.mimeType && (item.document.mimeType.indexOf('image') === 0 || item.document.mimeType.indexOf('video') === 0);

        scope.fling = function() {
          // fling content to organization channel
          exp
            .getChannel('fling-demo', { consumer: true })
            .fling({
              content: scope.item.uuid
            });

          $mdDialog.hide();
        };

        scope.open = function() {
          // open file in external app
          contentService.open(scope.item);
          $mdDialog.hide();
        };

        scope.close = function() {
          $mdDialog.hide();
        };
      }
    });
  };

});
