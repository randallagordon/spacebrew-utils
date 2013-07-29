/* global Spacebrew, $ */

'use strict';

var sb,
    sensors = {},
    ranges = {},
    booleans = {},
    strings = {},
    customs = {};

sensors.motion = function() {
  sb.addPublish( 'Motion', 'motion', '' );
  sb.addSubscribe( 'Motion', 'motion' );

  window.addEventListener( "devicemotion", function(e) {
    var sbOutput = {}, localOutput = '';
    sbOutput.x = e.accelerationIncludingGravity.x;
    sbOutput.y = e.accelerationIncludingGravity.y;
    sbOutput.z = e.accelerationIncludingGravity.z;

    sb.send( 'Motion', 'motion', sbOutput );

    localOutput = '<h3>To Spacebrew</h3>' +
                  '<p>X: ' + Math.round( sbOutput.x * 100 ) / 100 + '</p>' +
                  '<p>Y: ' + Math.round( sbOutput.y * 100 ) / 100 + '</p>' +
                  '<p>Z: ' + Math.round( sbOutput.z * 100 ) / 100 + '</p>';

    document.getElementById( 'motion-output' ).innerHTML = localOutput;
  }, true);

  customs[ 'motion' ] = function( value ) {
    var input = '<h3>From Spacebrew</h3>' +
                '<p>X: ' + Math.round( value.x * 100 ) / 100 + '</p>' +
                '<p>Y: ' + Math.round( value.y * 100 ) / 100 + '</p>' +
                '<p>Z: ' + Math.round( value.z * 100 ) / 100 + '</p>';

    document.getElementById( 'motion-input' ).innerHTML = input;
  };
};

sensors.orientation = function() {
  sb.addPublish( 'Orientation', 'orientation', '' );
  sb.addSubscribe( 'Orientation', 'orientation' );

  window.addEventListener( "deviceorientation", function(e) {
    var sbOutput = {}, localOutput = '';
    sbOutput.gamma = e.gamma;
    sbOutput.alpha = e.alpha;
    sbOutput.beta  = e.beta;

    sb.send( 'Orientation', 'orientation', sbOutput );

    localOutput = '<h3>To Spacebrew</h3>' +
                  '<p>Gamma: ' + Math.round( e.gamma ) + '</p>' +
                  '<p>Alpha: ' + Math.round( e.alpha ) + '</p>' + 
                  '<p>Beta: '  + Math.round( e.beta  ) + '</p>';

    document.getElementById( 'orientation-output' ).innerHTML = localOutput;
  }, true);

  customs[ 'orientation' ] = function( value ) {
    var input = '<h3>From Spacebrew</h3>' +
                '<p>Gamma: ' + Math.round( value.gamma ) + '</p>' +
                '<p>Alpha: ' + Math.round( value.alpha ) + '</p>' +
                '<p>Beta: '  + Math.round( value.beta  ) + '</p>';

    document.getElementById( 'orientation-input' ).innerHTML = input;
  };
};

sensors.ambientLight = function() {
  sb.addPublish( 'Ambient Light', 'range', 0 );
  sb.addSubscribe( 'Ambient Light', 'range' );

  window.addEventListener( "nlightlevel", function(e) {
    var sbOutput = {}, localOutput = '';
    sbOutput = e.value;

    sb.send( 'Ambient Light', 'range', sbOutput );
    
    localOutput = "Ambient Light " + e.value;

    document.getElementById( 'ambient-output' ).innerHTML = localOutput;
  });

  sb.onRangeMessage = function( name, value, type ) {
  };

};

var setupSensors = function() {
  [ 'motion', 'orientation', 'ambientLight' ].forEach( function( sensor ) {
    sensors[ sensor ]();
  });
};

$(function() {

  sb = new Spacebrew.Client( 'sandbox.spacebrew.cc',
                             'Device Sensors',
                             'Sens0rs.' );
  sb.connect();

  sb.onRangeMessage = function( name, value ) {
    ranges[ name ]( value );
  };

  sb.onBooleanMessage = function( name, value ) {
    booleans[ name ]( value );
  };

  sb.onStringMessage = function( name, value ) {
    strings[ name ]( value );
  };
  
  sb.onCustomMessage = function( name, value, type ) {
    customs[ type ]( value );
  };
  
  setupSensors();
});

