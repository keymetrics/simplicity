// ---------------------  Imports  ---------------------
var blinkstick = require('blinkstick');

// ---------------------  Configuration  ---------------------

//Delay between on/off
var delay = 100;

//Color to blink
var r = 255;
var g = 255;
var b = 255;

//Additional options
var options = { channel: 0, index: 0 }

// ---------------------  Variables  ---------------------

//Variable to hold the blink timeout and cancel it when button is pressed
var blinkTimeout;

//Variable to keep the blinking state
var blinking = false;

// ---------------------  Main Code  ---------------------

//Find first BlinkStick
var led = blinkstick.findFirst();

//Blinker function to turn led on/off
var blinker = function () {
  led.setColor(r, g, b, options);

  blinkTimeout = setTimeout(function() {
    led.setColor(0, 0, 0, options);

    blinkTimeout = setTimeout(function() {
      blinker();
    }, delay);
  }, delay);
}

//Call this function to start blinking
var blink = function () {
  if (!blinking) {
    blinking = true;
    blinker();
  }
}

//Call this function to stop blinking
var stop = function () {
  if (blinking) {
    blinking = false;
    clearTimeout(blinkTimeout);
    led.setColor(0, 0, 0, options);
  }
}

// ----------------  Keyboard interaction  ----------------
var stdin = process.stdin;
stdin.setRawMode( true );
stdin.resume();
stdin.setEncoding( 'utf8' );

stdin.on( 'data', function( key ){
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    process.exit();
  }

  if (key == '1') {
    blink();
  } else if (key == '2') {
    stop();
  }
});

process.stdout.write("BlinkStick blink demo\r\n\r\n");
process.stdout.write("Press:\r\n");
process.stdout.write("    1 to start blinking\r\n");
process.stdout.write("    2 to stop blinking\r\n");
process.stdout.write("    Ctrl+C to exit\r\n");
