# Node Stream Inheritance examples

Sample code showing how to subclass node Readable, Writeable, Transform, and Duplex streams.

## TODO

* add npm test command for jshint
* w/ and w/o log output

mocha --reporter spec tests | node_modules/.bin/bunyan

mocha --reporter spec tests | node_modules/.bin/bunyan --output short --level error

node_modules/.bin/jshint src/*.js tests/*.js; ./node_modules/.bin/jscs src/*.js tests/*.js; ./node_modules/.bin/istanbul cover node_modules/.bin/_mocha tests

## Install

    $ clone
    $ npm install

## How to run tests

    $ npm test

## Questions

1. What events should I implement (emit) to indicate my readable stream is complete?


2. How do I handle errors?
