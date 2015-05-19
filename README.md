# Node stream inheritance examples

This project contains sample code showing how to subclass node's Readable,
Writeable, Transform, and Duplex streams as they exist in node v0.12.2.

The node streaming API has a [long history](http://r.va.gg/2014/06/why-i-dont-use-nodes-core-stream-module.html). For the purposes of this project, I wanted to make my class support
streaming in the simplest way possible without any external dependencies.

## Details

I implemented this project because I couldn't find good examples of
implementing streams (probably because the API has changed so many times).
The current [node stream docs](https://nodejs.org/api/stream.html) are pretty
clear, but miss a couple points. Specifically, I wanted to know:

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


## Alternatives

If you do want to use a library for a simpler API (that is more consistent
across node versions), look into [through2](https://github.com/rvagg/through2)
and [event-stream](https://github.com/dominictarr/event-stream).
Thanks [@collinwat](https://github.com/collinwat) for the code review
and recommendations!




