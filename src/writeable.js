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

// chunk can be a buffer, string, or objects depending on options above
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
    callback(error); // if handleWrite was async, we'd use process.nextTick here
  }
};

AlphaStream.prototype.handleWrite = function() {
  if (this.toString().length === 26) {
    // Unclear if we should emit 'end' or 'close', so we'll
    // invent our own event.
    this.emit('full');
  }
};

AlphaStream.prototype.toString = function() {
  return Buffer.concat(this.chunks).toString();
};
