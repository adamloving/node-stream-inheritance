'use strict';
var util = require('util'); // built in node stuff
var Writable = require('stream').Writable;
var log = require('bunyan').createLogger({name: 'default'});

// A writeable stream that can hold 26 bytes
function AlphaStream(options) {
  Writable.call(this, options);
  this.chunks = [];
}

util.inherits(AlphaStream, Writable); // how node indicates inheritance
module.exports = AlphaStream;

// chunk can be a buffer or a string
// we need to call callback when we're done
AlphaStream.prototype._write = function(chunk, encoding, callback) {
  log.info('_write length', chunk.length);
  this.chunks.push(chunk);

  var error;

  try {
    this.handleWrite();
  } catch (err) {
    error = err;
  }

  if (callback) {
    callback(error);
  }
};

AlphaStream.prototype.handleWrite = function() {
  if (this.toString().length === 26) {
    var self = this;
    // not sure if should use process.nextTick here
    // Also, unclear if we should emit 'end' or 'close', so we'll
    // invent our own event.
    self.emit('full');
  }
};

AlphaStream.prototype.toString = function() {
  return Buffer.concat(this.chunks).toString();
};
