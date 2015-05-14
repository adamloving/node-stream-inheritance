'use strict';
var fs = require('fs');
var expect = require('chai').expect;
var log = require('bunyan').createLogger({name: 'default'});

var AlphaStream = require('../src/readable');

describe('My Readable Stream', function() {
  before(function() {
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
      // "This event fires when there will be no more data to read."
      // (emitted for us automatically when we push(null))
      log.info('alphaStream end');
    })
    .on('close', function() {
      // "This event fires when there will be no more data to read."
      // (but you have to emit it yourself, which we don't in this example)
      log.info('alphaStream close');
    })
    .pipe(writeStream)
    .on('close', function() {
      log.info('writeStream close');
      // "Emitted when the underlying resource (for example, the backing file
      // descriptor) has been closed. Not all streams will emit this."
      var expected = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var actual = fs.readFileSync(tempFilePath).toString();

      expect(actual).to.be.equal(expected);
      done();
    });
  });
});
