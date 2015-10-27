'use strict';

var init = function(exp) {

  // register nfc events
  nfc.addTagDiscoveredListener(
    function (event) {
      var tag = event.tag;

      //TODO lookup thing
      var thing = {
        primaryType: 'scala:thing',
        subtype: 'scala:thing:rfid',
        name: 'some name here'
      };

      exp.thing.trigger('found', { thing: thing, event: tag });
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
