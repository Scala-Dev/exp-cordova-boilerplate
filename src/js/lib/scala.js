'use strict';

var tempSync = require('temp-sync');
var experience = require('experience');
var connection = require('connection');
var credentials = require('credentials');
var jwt = require('jwt');

var nfc = require('./events.nfc');
var beacon = require('./events.beacon');
var geofence = require('./events.geofence');

var EventNode = require('EventNode');
var SDK = require('SDK');

var scala = new SDK();

scala.tempSync = tempSync;

scala.experience = experience;

scala.authenticate = function(auth) {
  credentials.set(auth);

  var token = jwt.signToken(auth);
  connection.connect(token);
};

scala.thing = new EventNode();

scala.location = new EventNode();
scala.location.current = {};

nfc.init(scala);
beacon.init(scala);
geofence.init(scala);

module.exports = scala;
