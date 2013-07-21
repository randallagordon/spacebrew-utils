/* global Spacebrew */

'use strict';

$(function() {

  var sb = new Spacebrew.Client( 'sandbox.spacebrew.cc',
                                 'Blinkenlights!',
                                 'Lights! Blinking!' );

  sb.connect();

  var w = $(document).width(),
      h = $(document).height();

  var nLights = 16,
      nPerRow = Math.sqrt( nLights );

  for( var i = 1; i <= nLights; i++ ) {
    var el = $('<div>')
      .attr( 'id', 'light' + i )
      .attr( 'class', 'light' )
      .width( w / nPerRow - 2 )
      .height( h / nPerRow - 2 )
      .appendTo( 'body' );
    
    sb.addSubscribe( 'Light ' + i.toString(), 'boolean' );
  }

  sb.onBooleanMessage = function( name, value ) {
    var lightID = parseInt( name.split(' ')[1], 10 );

    if( value ) {
      $( '#light' + lightID ).css( 'background-color', '#f22' );
    } else {
      $( '#light' + lightID ).css( 'background-color', '#222' );
    }
  }

});

