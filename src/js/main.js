'use strict';
/*jshint browser: true*/
/*jshint -W097 */
/*global require, module*/

document.addEventListener('deviceready', function () {
  require('EventNode');
  require('jwt');
  require('Logger');
  require('SDK');
  require('experience');
  require('connection');
  require('interface');
  require('device');

  var scala = require('./lib/scala');

  // allow external initialization of the sdk ie. AngularJS, Ember, Backbone
  if (app && app.bootstrap) {
    app.bootstrap(scala);
  }

});
