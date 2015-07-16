'use strict';

var init = function(scala) {

  // register nfc events
  nfc.addTagDiscoveredListener(
    function (event) {
      var tag = event.tag;

      //TODO lookup thing
      var thing = {
        primaryType: 'scala:thing',
        subtype: 'scala:rfid',
        name: 'some name here'
      };

      scala.thing.trigger('found', { thing: thing, event: tag });
    },
    function () { // success callback
      console.log('listening for nfc tags');
    },
    function (error) { // error callback
      alert('error listening for nfc tags: ' + JSON.stringify(error));
    }
  );

};

module.exports.init = init;
