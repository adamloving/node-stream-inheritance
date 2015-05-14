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
    var tempFilePath = __dirname + '/../tmp/alphabet.txt';
    var writeStream = fs.createWriteStream(tempFilePath);

    alphaStream.pipe(writeStream)
    .on('end', function() {
      // "This event fires when there will be no more data to read."
      // (but you have to emit it yourself)
    })
    .on('close', function() {
      // "Emitted when the underlying resource (for example, the backing file
      // descriptor) has been closed. Not all streams will emit this."
      // but in this case, it is emitted automatically, when the AlphaReadable
      // does push(null)
      var expected = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var actual = fs.readFileSync(tempFilePath).toString();

      expect(actual).to.be.equal(expected);
      done();
    });
  });
});
