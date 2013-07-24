/* global Spacebrew */

'use strict';

var sb, sensors = {};

sensors.accelerometer = function() {
  sb.addPublish( 'Accelerometer', 'accelerometer', '' );

  window.addEventListener( "deviceorientation", function(e) {
    sb.send( 'anEvent', 'accelerometer', e );
  }, true);
};

var setup = function() {
  [ 'accelerometer' ].forEach( function( sensor ) {
    sensors[ sensor ]();
  });
};

$(function() {

  sb = new Spacebrew.Client( 'sandbox.spacebrew.cc',
                             'Device Sensors',
                             'Sens0rs.' );

  sb.connect();

  setup();

});

