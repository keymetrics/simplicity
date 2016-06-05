var blinkstick  = require('blinkstick');
var interpolate = require('./interpolate.js');
var async = require('async');

var led = blinkstick.findFirst();

var blink_val = 100;
var current_value = 0;

//led.turnOff();

var leds = [1];

function init(cb) {
  async.eachLimit([1, 2, 3, 4, 5, 6, 7, 8], 10, function(index, next) {
    led.setColor('#000000', {
      index : index
    }, function(){
      next();
    });
  }, cb);

}

init()
//return false;
// return false;
//'#0DFF05';

var opts = {
  duration : blink_val * 11,
  steps    : 100
};

function getColor() {
  return interpolate(current_value);
}

function rec() {
  async.eachLimit(leds, 10, function(index, next) {
    led.pulse(getColor(), {
      duration : opts.duration,
      steps : opts.steps,
      index : index
    }, function(){
      next();
    });

  }, function(err) {
    setTimeout(rec, blink_val * 7.7);
  });

}

init(function() {
  rec();
});

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding( 'utf8' );

console.log('m: increase timeout between pulsation');
console.log('n: decrease timeout between pulsation');

console.log('p: increase color');
console.log('o: decrease color');

stdin.on('data', function(key) {
  if ( key === '\u0003' ) {
    process.exit();
  }

  if (key == 'm') {
    console.log('Setting performance to', blink_val);
    blink_val += 10;
    opts.duration = blink_val * 7.7;
  }

  if (key == 'n') {
    console.log('Setting performace to', blink_val);
    blink_val -= 10;
    opts.duration = blink_val * 7.7;
  }

  if (key == 'p') {
    console.log('Setting timeout to', current_value);
    current_value += 10;
  }

  if (key == 'o') {
    console.log('Setting timeout to', current_value);
    current_value -= 10;
  }
});
// led.getSerial(function() {
//   console.log(arguments);
// });
