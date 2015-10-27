'use strict';
/*jshint browser: true*/
/*jshint -W097 */
/*global require, module*/

document.addEventListener('deviceready', function () {

  var exp = require('./lib/exp');

  // allow external initialization of the sdk ie. AngularJS, Ember, Backbone
  if (app && app.bootstrap) {
    app.bootstrap(exp);
  }

});
