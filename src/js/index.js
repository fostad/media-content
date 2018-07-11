require('babel-register')({
  presets: [ 'es2015' ]
});

const { port } = require('./config');
const jsonValidator = require('./validator/json-validator');
const server = require('./server')(port);

jsonValidator.createValidator();



console.log('media content service up and running on port', port);
console.log('NODE_ENV', process.env.NODE_ENV);

exitOnSignal('SIGINT');
exitOnSignal('SIGTERM');
process.stdin.resume();

function exitOnSignal(signal) {
  process.on(signal, function() {
    server.close();
    process.exit(1);
    //TODO clear cache
  });
}
