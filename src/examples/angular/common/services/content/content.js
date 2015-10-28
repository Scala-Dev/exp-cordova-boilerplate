'use strict';

angular.module('cordova-boilerplate')
.factory('contentService', function($rootScope) {

  var supportedTypes = ['application/pdf','audio/mpeg','video/mp4','image/jpeg','image/png','image/bmp','image/gif'];

  var getInfo = function(content) {
    if(supportedTypes.indexOf(content.document.mimeType) > -1) {
      return {
        url: content.getUrl(),
        mimeType: content.document.mimeType
      };
    } else if (content.hasVariant('video.mp4')) {
      return {
        url: content.getVariantUrl('video.mp4'),
        mimeType: 'video/mp4'
      };
    } else if (content.hasVariant('1080.png')) {
      return {
        url: content.getVariantUrl('1080.png'),
        mimeType: 'image/png'
      };
    } else {
      return null;
    }
  };

  var canOpen = function(item) {
    return supportedTypes.indexOf(item.document.mimeType) > -1 || item.hasVariant('video.mp4') || item.hasVariant('1080.png');
  };

  var getFromDevice = function(content) {
    var targetDirectory = cordova.file.externalApplicationStorageDirectory || cordova.file.documentsDirectory + 'scala/';
    var target = targetDirectory + content.uuid;

    return new Promise(function(resolve, reject) {
      window.resolveLocalFileSystemURL(target,
        function(fileEntry) {
          resolve(fileEntry);
        }, function(err) {
          console.log('FileSystem Error');
          console.error(err);
          reject(err);
        });
    });
  };

  var openFileEntry = function(entry, mimeType) {
    cordova.plugins.fileOpener2.open(
      entry.toURL(),
      mimeType,
      {
        success: function () {
          $rootScope.loading = false;
          $rootScope.$apply();
          console.log('file opened successfully');
        },
        error: function(e) {
          $rootScope.loading = false;
          $rootScope.$apply();
          console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
        }
      });
  };

  var open = function(content) {

    $rootScope.loading = true;

    var info = getInfo(content);

    var fileTransfer = new FileTransfer();
    console.log(cordova.file.externalApplicationStorageDirectory);
    console.log(cordova.file.documentsDirectory);

    // check if file is already downloaded
    getFromDevice(content).then(function(entry) {
      console.log('file exists, opening: ' + entry.toURL());
      openFileEntry(entry, info.mimeType);
    })
    .catch(function() {
      // download file
      var targetDirectory = cordova.file.externalApplicationStorageDirectory || cordova.file.documentsDirectory + 'scala/';
      var target = targetDirectory + content.uuid;

      var success = function(entry) {
        console.log('download complete, opening: ' + entry.toURL());
        openFileEntry(entry, info.mimeType);
      };

      var error = function(error) {
        $rootScope.loading = false;
        $rootScope.$apply();
        console.log('download error source '+ error.source);
        console.log('download error target ' + error.target);
        console.log('download error code ' + error.code);
      };

      fileTransfer.download(info.url, target, success, error, false);
    });
  };

  return { canOpen: canOpen, open: open };
});
