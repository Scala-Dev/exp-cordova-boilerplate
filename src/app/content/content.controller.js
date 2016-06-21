'use strict';

angular.module('cordova-boilerplate')
.controller('ContentCtrl', function ($scope, $state, $mdDialog, currentFolder) {
  console.log('currentFolder is', currentFolder);

  $scope.folders = [];
  $scope.files = [];

  $scope.showList = function(nodes) {
    nodes.forEach(function(node) {
      // set content type
      if (node.document.subtype) {
        node.contentType = node.document.subtype.split(':').pop();
      }

      if (node.contentType === 'folder') {
        $scope.folders.push(node);
      } else {
        $scope.files.push(node);
      }
    });

    $scope.$apply();
  };


  $scope.showDialog = function($event, content) {
    $mdDialog.show({
      templateUrl: 'app/content/dialog.html',
      targetEvent: $event,
      locals: {
        item: content
      },
      controller: function($scope, exp, contentService, item) {
        $scope.item = item;
        $scope.showOpenButton = contentService.canOpen(item);
        $scope.showFlingButton = item.document.mimeType && (item.document.mimeType.indexOf('image') === 0 || item.document.mimeType.indexOf('video') === 0);

        $scope.fling = function() {
          // fling content to organization channel
          exp.channels.organization.fling($scope.item.uuid);
          $mdDialog.hide();
        };

        $scope.open = function() {
          // open file in external app
          contentService.open($scope.item);
          $mdDialog.hide();
        };

        $scope.close = function() {
          $mdDialog.hide();
        };
      }
    });
  };


  if (currentFolder) {
    // show the folder's name
    $scope.currentFolder = currentFolder;

    // show the folder's children
    currentFolder.getChildren().then(function(children) {
      $scope.showList(children);
    });
  }

});
