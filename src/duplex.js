'use strict';
var util = require('util'); // built in node stuff
var Duplex = require('stream').Duplex;
var log = require('bunyan').createLogger({name: 'default'});

// A readable and writeable stream that can hold 26 unicode characters
// This is an oversimplified example, that basically just relays the first
// 26 letters of input. If the input stream is paused (before AlphaStream is full),
// the write stream will never 'close'. If the input is resumed after 26 letters
// have been streamed, AlphaStream will continue to emit 'full' - writestream
// will have already been closed.
function AlphaStream(options) {
  Duplex.call(this, options);
  this.chunks = [];
  this.index = 0; // next byte to be read
}

util.inherits(AlphaStream, Duplex);
module.exports = AlphaStream;

AlphaStream.prototype.toString = function() {
  return Buffer.concat(this.chunks).toString();
};

AlphaStream.prototype.isFull = function() {
  return this.toString().length === 26;
};

AlphaStream.prototype._write = function(chunk, encoding, callback) {
  log.info('_write chunk length:', chunk.length);

  var error;

  try {
    this.handleWrite(chunk);
  } catch (err) {
    error = err;
  }

  if (callback) {
    callback(error);
  }
};

// accept chunks until we've got the equivalent of 26 characters
AlphaStream.prototype.handleWrite = function(chunk) {
  if (this.isFull()) {
    this.emit('full');
  } else {
    this.chunks.push(chunk);
  }
};

AlphaStream.prototype._read = function(size) {
  try {
    this.handleRead(size);
  } catch (err) {
    this.emit('error', err);
  }
};

// push requested number of bytes (or as much as we've got)
AlphaStream.prototype.handleRead = function(size) {
  // Not efficient to continually concat, but keeps demo simple
  var everything = Buffer.concat(this.chunks);
  log.info('handleRead requested:', size,
    'index:', this.index, 'have:', everything.length);

  if (this.index < everything.length) {
    var unpushedLength = everything.length - this.index;
    var lengthToPush = Math.min(unpushedLength, size);
    var nextSection = everything.slice(this.index, this.index + lengthToPush);
    log.info('handleRead pushing length:', nextSection.length);
    this.index += lengthToPush;

    // order is important, because push synchronously triggers next
    // call to read
    this.push(nextSection);
  } else {
    if (this.isFull()) {
      log.info('handleRead done');
      this.push(null); // emits 'close' event
    } else {
      // necessary in case _read called before _write
      log.info('handleRead waiting...');
      setTimeout(this.handleRead.bind(this), 100, size); // try again in 100ms
    }
  }
};

