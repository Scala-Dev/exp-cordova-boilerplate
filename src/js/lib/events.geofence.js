'use strict';

var init = function(scala) {

  window.geofence.initialize();

  window.geofence.onTransitionReceived = function(geofences) {
    geofences.forEach(function(event) {

      // TODO look up location
      var location = event.id.substring(0, event.id.length - 7);

      if (event.transitionType === TransitionType.ENTER) {
        scala.location.trigger('enter', { location: location, event: { type: 'geofence', data: event } });
        scala.location.current[location] = location;

        console.log('entered ' + location + ' : ' + JSON.stringify(event));
      } else if (event.transitionType === TransitionType.EXIT) {
        scala.location.trigger('exit', { location: location, event: { type: 'geofence', data: event } });
        delete scala.location.current[location];

        console.log('exited ' + location + ' : ' + JSON.stringify(event));
      }

    });
  };

  // id:             String, //A unique identifier of geofence
  // latitude:       Number, //Geo latitude of geofence
  // longitude:      Number, //Geo longitude of geofence
  // radius:         Number, //Radius of geofence in meters
  // transitionType: Number, //Type of transition 1 - Enter, 2 - Exit, 3 - Both
  // notification: {         //Notification object
  //     id:             Number, //optional should be integer, id of notification
  //     title:          String, //Title of notification
  //     text:           String, //Text of notification
  //     smallIcon:      String, //Small icon showed in notification area, only res URI
  //     icon:           String, //icon showed in notification drawer
  //     openAppOnClick: Boolean,//is main app activity should be opened after clicking on notification
  //     vibration:      [Integer], //Optional vibration pattern - see description
  //     data:           Object  //Custom object associated with notification
  // }

  // register regions
  var setupRegions = function() {

    console.log('setting up geofence regions');

    //var config = scala.experience.get();

    window.geofence.removeAll()
    .then(function() {
      console.log('all geofences successfully removed');

      var config = scala.tempSync.get();

      scala.api.get('/api/zones?subtype=scala:zone:geofence&experienceUuid=' + config.experience.uuid)
      .then(function(resp) {
        console.log(JSON.stringify(resp));

        resp.results.forEach(function(zone) {

          window.geofence.addOrUpdate([
            {
              id: zone.name + '[enter]',
              latitude: zone.lat,
              longitude: zone.lon,
              radius: zone.radius,
              transitionType: TransitionType.ENTER
            },
            {
              id: zone.name + '[leave]',
              latitude: zone.lat,
              longitude: zone.lon,
              radius: zone.radius,
              transitionType: TransitionType.EXIT
            }
          ])
          .then(function() {
            console.log('geofence successfully added');
          }, console.error);

        });
      });

      // config.locations.forEach(function(location) {
      // window.geofence.addOrUpdate([
      //   {
      //     id: 'geofence name' + '[enter]',
      //     latitude: 40.064256,
      //     longitude: -75.534713,
      //     radius: 1000,
      //     transitionType: TransitionType.ENTER
      //   },
      //   {
      //     id: 'geofence name' + '[leave]',
      //     latitude: 40.064256,
      //     longitude: -75.534713,
      //     radius: 1000,
      //     transitionType: TransitionType.EXIT
      //   }
      // ])
      // .then(function() {
      //   console.log('geofence successfully added');
      // }, console.error);
      //});

    }, console.error);

  };

  // register experience config change event
  //scala.experience.events.on('change', setupRegions);
  scala.tempSync.events.on('change', setupRegions);

};

module.exports.init = init;
