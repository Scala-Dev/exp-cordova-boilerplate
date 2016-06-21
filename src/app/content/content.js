'use strict';

angular.module('cordova-boilerplate')
.config(function ($stateProvider) {
  $stateProvider
    .state('content', {
      url: '/content/:folder',
      templateUrl: 'app/content/content.html',
      controller: 'ContentCtrl',
      resolve: {
        currentFolder: function($stateParams) {
          // default to 'root' folder if no uuid provided
          var folderUuid = $stateParams.folder || 'root';

          return exp.getContent(folderUuid);
        }
      }
    });
});
