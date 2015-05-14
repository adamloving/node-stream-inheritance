'use strict';
var fs = require('fs');
var expect = require('chai').expect;
var log = require('bunyan').createLogger({name: 'default'});

var AlphaStream = require('../src/transform');

describe('My Transform Stream', function() {
  it('should capitalize the alphabet', function(done) {
    var inputFilePath = __dirname + '/samples/alphabet.txt';
    var readStream = fs.createReadStream(inputFilePath);
    var outputFilePath = __dirname + '/../tmp/alphabet.txt';
    var writeStream = fs.createWriteStream(outputFilePath);

    var alphaStream = new AlphaStream();

    readStream
    .pipe(alphaStream)
    .pipe(writeStream)
    .on('close', function() {
      log.info('Write stream closed');
      var expected = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var actual = fs.readFileSync(outputFilePath).toString();
      expect(actual).to.be.equal(expected);
      done();
    });
  });
});
