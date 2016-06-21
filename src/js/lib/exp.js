'use strict';

var nfc = require('./events.nfc');
var beacon = require('./events.beacon');
var geofence = require('./events.geofence');

exp.thing = new exp.utilities.EventNode();

exp.location = new exp.utilities.EventNode();
exp.location.current = {};

nfc.init(exp);
//beacon.init(exp);
//geofence.init(exp);

module.exports = exp;
