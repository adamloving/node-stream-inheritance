'use strict';
var fs = require('fs');
var AlphaStream = require('../src/readable');
var expect = require('chai').expect;

describe('My Readable Stream', function() {
  before(function() {
    var tempPath = __dirname + '/../tmp';
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath);
    }
  });

  it('should stream the alphabet', function(done) {
    var alphaStream = new AlphaStream();
    var tempFilePath = __dirname + '../tmp/alphabet.txt';
    var writeStream = fs.createWriteStream(tempFilePath);

    alphaStream.pipe(writeStream)
    .on('end', function() {
      // "This event fires when there will be no more data to read."

      // verify
      var expected = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var actual = fs.readFileSync(tempFilePath).toString();

      expect(actual).to.be.equal(expected);
      done();
    });
  });
});
