# Node Boilerplate

An empty project with frequently used config files.

## Code linting and style tools

### editorconfig

The .editorconfig file in this project (when used with a plugin in your IDE)
makes sure that whitespace is consistent.

### jshint

The .jshintrc file in this project defines rules for detecting
Javascript syntax errors and untidy code (like missing semicolons, or unused
variables). You can run jshint from the command line, or
add an extension to your IDE to see inline errors

### jscs

The .jscrc file in this project defines code style rules. Use `npm test` or
`$ ./node_modules/.bin/jscs src/*.js tests/*.js` to test them.
