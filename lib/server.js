const http = require( 'http');
// const router = require ('./router.js')();
const routers = require('../config/routes.js');

const server = http.createServer(routers.routes());

module.exports = server;
