'use strict';

var init = function(exp) {

  var regions = [];

  var delegate = new cordova.plugins.locationManager.Delegate();

  // register beacon events
  // delegate.didRangeBeaconsInRegion = function(pluginResult) {
  //     //TODO lookup thing
  //     var thing = {
  //       primaryType: 'scala:thing',
  //       subtype: 'scala:thing:beacon',
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
      exp.location.trigger('enter', { location: location, event: { type: 'beacon', data: event } });
      exp.location.current[location] = location;

      console.log('entered ' + location + ' : ' + JSON.stringify(event));
    } else if (event.state === 'CLRegionStateOutside') {
      exp.location.trigger('exit', { location: location, event: { type: 'beacon', data: event } });
      delete exp.location.current[location];

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

    exp.api.getCurrentDevice()
    .then(device => {
      return exp.api.getCurrentExperience();
    })
    .then(function(experience) {
      if (!experience) throw new Error('experience not found');
      return exp.api.get('/api/zones?subtype=scala:zone:thing&experienceUuid=' + experience.uuid);
    })
    .then(function(resp) {
      console.log(JSON.stringify(resp));

      resp.results.forEach(function(zone) {

        exp.api.get('/api/things/' + zone.ref)
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
    })
    .catch(function(err) { console.error(err); });

    // config.locations.forEach(function(location) {
      // TODO lookup location/thing:beacon

    //});
  };

  // register experience config change event
  //scala.experience.events.on('change', setupRegions);
  exp.connection.on('online', setupRegions);

};

module.exports.init = init;
