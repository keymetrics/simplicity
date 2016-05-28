var blinkstick  = require('blinkstick');
var interpolate = require('./interpolate.js');

var led = blinkstick.findFirst();
led.turnOff();

var blink_val = 1400;

var current_value = 0;

//'#0DFF05';

var opts = {
  duration : blink_val * 0.8,
  steps    : 100
};

function getColor() {
  var formula = 140 - (blink_val / 10);
  console.log(formula);
  return interpolate(formula);
}

function rec() {
  led.pulse(getColor(), opts, function(){
    setTimeout(rec, blink_val * 0.55);
  });
}

rec();

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding( 'utf8' );

console.log('m: increase timeout between pulsation');
console.log('n: decrease timeout between pulsation');

stdin.on('data', function(key) {
  if ( key === '\u0003' ) {
    process.exit();
  }

  if (key == 'm') {
    console.log('Setting timeout to', opts.duration, blink_val * 0.35);
    blink_val += 60;
    opts.duration = blink_val * 0.6;
  }

  if (key == 'n') {
    console.log('Setting timeout to', opts.duration, blink_val * 0.35);
    blink_val -= 60;
    opts.duration = blink_val * 0.6;
  }

  console.log(key);
});
// led.getSerial(function() {
//   console.log(arguments);
// });
