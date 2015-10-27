'use strict';

angular.module('cordova-boilerplate')
.config(function ($stateProvider) {
  $stateProvider
    .state('content', {
      url: '/content/:folder',
      templateUrl: 'app/content/content.html',
      controller: 'ContentCtrl',
      resolve: {
        currentFolder: function(exp, $stateParams) {
          // default to 'root' folder if no uuid provided
          var folderUuid = $stateParams.folder || 'root';

          // fetch the folder before loading the controller
          return exp.api.getContentNode(folderUuid);

        }
      }
    });
});
