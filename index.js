#!/usr/bin/env node

const server = require('./lib/server');

server.listen(process.argv[2] || 8080);
