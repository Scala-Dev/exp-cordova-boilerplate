'use strict';

var nfc = require('./events.nfc');
var beacon = require('./events.beacon');
var geofence = require('./events.geofence');

var scala = require('exp-js-sdk');

scala.authenticate = function(auth) {
  return scala.credentials.set(auth.uuid, auth.secret)
    .then(function() {
      scala.credentials.getToken()
    })
    .catch(function(err) {
      console.log(err);
    })
    .then(function(token) {
      scala.connection.connect({ token: token, host: 'http://localhost:9000' });
    });
};

scala.thing = new scala.utilities.EventNode();

scala.location = new scala.utilities.EventNode();
scala.location.current = {};

nfc.init(scala);
beacon.init(scala);
geofence.init(scala);

module.exports = scala;
