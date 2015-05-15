# Node stream inheritance examples

This project contains sample code showing how to subclass node's Readable,
Writeable, Transform, and Duplex streams.

## Details

I implemented this project because I couldn't find good examples of
implementing streams. The node docs are pretty clear, but miss a couple points.
Specifically, I wanted to know:

1. **What event should I wait for to know stream is complete?** This depends on the
stream you are piping to (the sink). In the case of a FileStream, handle the
'close' event.

1. **What events should I implement (emit) to indicate my writable stream has
received everything it can handle?** In this case I opted to implement
my own 'full' event - indicating that my custom stream had no room for further
input.

1. **How do I handle errors?** `_write` and `_transform` provide callbacks. If
you pass your error out, the underlying implementation will automatically
emit an 'error' event. In the case of `_read`, you need to use
`this.emit('error', err);`

## How to install this project

    $ git clone git@github.com:adamloving/node-stream-inheritance.git
    $ npm install

## How to run the tests

    $ npm test

Which is short for:

    node_modules/.bin/jshint src/*.js tests/*.js;
    node_modules/.bin/jscs src/*.js tests/*.js;
    node_modules/.bin/mocha --reporter spec tests | node_modules/.bin/bunyan --output short --level info

To hide the info level log statements, use:

    node_modules/.bin/mocha --reporter spec tests | node_modules/.bin/bunyan --output short --level error

