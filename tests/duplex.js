'use strict';
var fs = require('fs');
var expect = require('chai').expect;
var log = require('bunyan').createLogger({name: 'default'});

var AlphaStream = require('../src/duplex');

describe('My Duplex Stream', function() {
  it('should stream the alphabet', function(done) {
    var sampleFilePath = __dirname + '/samples/alphabet.txt';
    var readStream = fs.createReadStream(sampleFilePath);
    var tempFilePath = __dirname + '/../tmp/alphabet.txt';
    var writeStream = fs.createWriteStream(tempFilePath);

    var alphaStream = new AlphaStream();

    readStream
    .pipe(alphaStream)
    .pipe(writeStream)
    .on('close', function() {
      log.info('Write stream closed');
      var expected = 'abcdefghijklmnopqrstuvwxyz';
      var actual = fs.readFileSync(tempFilePath).toString();
      expect(actual).to.be.equal(expected);
      done();
    });
  });
});
