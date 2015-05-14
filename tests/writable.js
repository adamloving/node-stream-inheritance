'use strict';
var fs = require('fs');
var expect = require('chai').expect;
var log = require('bunyan').createLogger({name: 'default'});

var AlphaStream = require('../src/writeable');

describe('My Writeable Stream', function() {
  it('should receive 26 letters', function(done) {
    var sampleFilePath = __dirname + '/samples/alphabet.txt';
    var readStream = fs.createReadStream(sampleFilePath);

    var alphaStream = new AlphaStream();

    readStream.pipe(alphaStream)
    .on('full', function() {
      log.info('alphaStream full');
      var expected = 'abcdefghijklmnopqrstuvwxyz';
      var actual = alphaStream.toString();

      expect(actual).to.be.equal(expected);
      done();
    });
  });
});
