'use strict';
var fs = require('fs');
var expect = require('chai').expect;
var log = require('bunyan').createLogger({name: 'default'});

var AlphaStream = require('../src/readable');

describe('My Readable Stream', function() {
  before(function() {
    // make a tmp dir
    var tempPath = __dirname + '/../tmp';
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath);
    }
  });

  it('should stream the alphabet', function(done) {
    var alphaStream = new AlphaStream();
    var tempFilePath = __dirname + '/../tmp/alphabet.txt';
    var writeStream = fs.createWriteStream(tempFilePath);

    alphaStream
    .on('end', function() {
      // Node docs: "This event fires when there will be no more data to read."
      // (emitted for us automatically when we push(null))
      log.info('alphaStream end');
    })
    .on('close', function() {
      // Never emitted - because alphaStream doesn't have a concept of closing.
      log.info('alphaStream close');
    })
    .pipe(writeStream)
    .on('close', function() {
      // Node docs: "Emitted when the underlying resource (for example, the
      // backing file descriptor) has been closed. Not all streams will emit this."
      log.info('writeStream close');
      var expected = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var actual = fs.readFileSync(tempFilePath).toString();

      expect(actual).to.be.equal(expected);
      done();
    });
  });
});
