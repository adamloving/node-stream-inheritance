'use strict';
var util = require('util'); // built in node stuff
var Readable = require('stream').Readable;
var log = require('bunyan').createLogger({name: 'default'});

var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function AlphaStream(options) {
  Readable.call(this, options);
  this.index = 0;
}

util.inherits(AlphaStream, Readable); // how node implements inheritance
module.exports = AlphaStream;

// size is number of bytes reader wants
AlphaStream.prototype._read = function(size) {
  log.info('_read length:', size);
  try {
    this.handleRead(size);
  } catch (err) {
    // We catch and emit errors in order to be polite.
    // Otherwise, errors will bubble up and crash the parent process.
    this.emit('error', err);
  }
};

// Don't want to override the inheretid "read" function, so called this
// helper "handleRead."
// Note: size parameter ignored, this simple implementation just pushes
// one character per read. A real implementation should push the number
// of bytes requested, if possible.
AlphaStream.prototype.handleRead = function() {
  // we push as much as we can (always 1 letter), then null when done
  if (this.index < ALPHABET.length) {
    this.push(ALPHABET[this.index]);
    this.index++;
  } else {
    this.push(null); // triggers our 'end' event
  }
};
