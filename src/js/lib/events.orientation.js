'use strict';

var init = function(scala) {

  // function onSuccess(acceleration) {
  //   console.log(acceleration.y / 10 * 90);
  //     // console.log('Acceleration X: ' + acceleration.x + '\n' +
  //     //       'Acceleration Y: ' + acceleration.y + '\n' +
  //     //       'Acceleration Z: ' + acceleration.z + '\n' +
  //     //       'Timestamp: '      + acceleration.timestamp + '\n');
  // };

  // function onError() {
  //     alert('onError!');
  // };

  // var options = { frequency: 500 };

  // var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

  function deviceOrientationHandler(rotation, frontBack, direction){
    //console.log('rotation ' + rotation + ' front to back ' + frontBack + ' direction ' + direction);

    scala.interface.broadcast({ name: 'control', payload: { type: 'move', x: frontBack * 5, y: 0 } });
  }

  window.addEventListener('deviceorientation', function(eventData) {
    // gamma is the left-to-right tilt in degrees, where right is positive
    var tiltLR = eventData.gamma;

    // beta is the front-to-back tilt in degrees, where front is positive
    var tiltFB = eventData.beta;

    // alpha is the compass direction the device is facing in degrees
    var dir = eventData.alpha

    // deviceorientation does not provide this data
    var motUD = null;

    // call our orientation event handler
    deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
  }, false);

};

module.exports.init = init;
