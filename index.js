#!/usr/bin/env node

const server = require('./lib/server');
const port = process.argv[2] || 8080;

server.listen(port, (err) => {
  if (err) console.error('Error message: %j', err);

  console.log('Opened server on %j', server.address());
});
