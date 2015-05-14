'use strict';
var util = require('util'); // built in node stuff
var Transform = require('stream').Transform;
var log = require('bunyan').createLogger({name: 'default'});

// A readable and writeable stream that outputs toUpperCase() of the input
function AlphaStream(options) {
  Transform.call(this, options);
  this.chunks = [];
  this.index = 0;
}

util.inherits(AlphaStream, Transform);
module.exports = AlphaStream;

AlphaStream.prototype._transform = function(chunk, encoding, callback) {
  log.info('_transform chunk length:', chunk.length);

  var error;

  try {
    this.push(new Buffer(chunk.toString().toUpperCase()));
  } catch (err) {
    error = err;
  }

  if (callback) {
    callback(error); // passing the error will emit an error event
  }
};

