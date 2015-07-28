'use strict';

var init = function(scala) {

  var regions = [];

  var delegate = new cordova.plugins.locationManager.Delegate();

  // register beacon events
  // delegate.didRangeBeaconsInRegion = function(pluginResult) {
  //     //TODO lookup thing
  //     var thing = {
  //       primaryType: 'scala:thing',
  //       subtype: 'scala:rfid',
  //       name: 'some name here'
  //     };

  //     scala.thing.trigger('found', { thing: thing, event: pluginResult });
  // };

  delegate.didStartMonitoringForRegion = function(pluginResult) {
    console.log('started monitoring region');
  };

  delegate.didDetermineStateForRegion = function(event) {
    //TODO lookup location
    var location = event.region.identifier;

    if (event.state === 'CLRegionStateInside') {
      scala.location.trigger('enter', { location: location, event: { type: 'beacon', data: event } });
      scala.location.current[location] = location;

      console.log('entered ' + location + ' : ' + JSON.stringify(event));
    } else if (event.state === 'CLRegionStateOutside') {
      scala.location.trigger('exit', { location: location, event: { type: 'beacon', data: event } });
      delete scala.location.current[location];

      console.log('exited ' + location + ' : ' + JSON.stringify(event));
    }

  };

  cordova.plugins.locationManager.setDelegate(delegate);

  // required in iOS 8+
  cordova.plugins.locationManager.requestWhenInUseAuthorization();
  // or cordova.plugins.locationManager.requestAlwaysAuthorization()

  // register regions
  var setupRegions = function() {

    console.log('setting up beacon regions');

    // remove all old regions
    regions.forEach(function(region) {
      // cordova.plugins.locationManager.stopRangingBeaconsInRegion(region)
      //   .fail(console.error)
      //   .done();

      cordova.plugins.locationManager.stopMonitoringForRegion(region)
        .fail(console.error)
        .done();
    });

    // clear regions
    regions = [];

    scala.interface.request({
      name: 'getExperience',
      target: 'system'
    })
    .then(function(experience) {
      return scala.api.get('/api/zones?subtype=scala:zone:thing&experienceUuid=' + experience.uuid);
    })
    .then(function(resp) {
      console.log(JSON.stringify(resp));

      resp.results.forEach(function(zone) {

        scala.api.get('/api/things/' + zone.ref)
        .then(function(thing){
          if (thing.subtype === 'scala:thing:beacon') {
            var identifier = zone.name;
            var uuid = thing.proximityUuid; //'2f234454-cf6d-4a0f-adf2-f4911ba9ffa6';

            var region = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);

            // cordova.plugins.locationManager.startRangingBeaconsInRegion(region)
            //     .fail(console.error)
            //     .done();

            cordova.plugins.locationManager.startMonitoringForRegion(region)
              .fail(console.error)
              .done();

            regions.push(region);
          }
        });
      });
    });

    // config.locations.forEach(function(location) {
      // TODO lookup location/thing:beacon

    //});
  };

  // register experience config change event
  //scala.experience.events.on('change', setupRegions);
  scala.connection.events.on('online', setupRegions);

};

module.exports.init = init;
