'use strict';
var util = require('util'); // built in node stuff
var Readable = require('stream').Readable;
var log = require('bunyan').createLogger({name: 'default'});

var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function AlphaStream(options) {
  Readable.call(this, options);
  this.index = 0;
}

util.inherits(AlphaStream, Readable); // how node indicates inheritance
module.exports = AlphaStream;

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
// helper "handleRead"
AlphaStream.prototype.handleRead = function(size) {
  // size is number of bytes reader wants
  // we push as much as we can, then null when done
  if (this.index < ALPHABET.length) {
    // console.log('handleRead', size, this.index);
    this.push(ALPHABET[this.index]);
    this.index++;
  } else {
    this.push(null); // done
    // console.log('done');
  }
};
