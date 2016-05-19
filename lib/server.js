const http = require( 'http');
const router = require('../config/routes.js');

const server = http.createServer(router.routes());

module.exports = server;
