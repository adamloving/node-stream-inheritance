'use strict';
var fs = require('fs');
var AlphaStream = require('../src/writeable');
var expect = require('chai').expect;

describe('My Writeable Stream', function() {
  it('should stream the alphabet', function(done) {
    var sampleFilePath = __dirname + '/samples/alphabet.txt';
    var readStream = fs.createReadStream(sampleFilePath);

    var alphaStream = new AlphaStream();

    readStream.pipe(alphaStream)
    .on('full', function() {
      console.log('got full');
      // "This event fires when there will be no more data to read."
      // note that this is the event emitted by the alphaStream, not the readStream
      var expected = 'abcdefghijklmnopqrstuvwxyz';
      var actual = alphaStream.toString();

      expect(actual).to.be.equal(expected);
      done();
    });
  });
});
