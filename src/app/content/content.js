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

          return exp.getContent(folderUuid).then(function(content) {
            // hide splash screen after fetching first folder
            navigator.splashscreen.hide();

            return content.getChildren().then(function(children) {
              var folders = [], files = [];

              // split children into two arrays by type
              children.map(function(node) {
                // set content type
                if (node.document.subtype) {
                  node.contentType = node.document.subtype.split(':').pop();
                }

                if (node.contentType === 'folder') {
                  folders.push(node);
                } else {
                  files.push(node);
                }
              });

              return { folder: content, folders: folders, files: files };

            });

          });
        }
      }
    });
});
