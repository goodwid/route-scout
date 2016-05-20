const http = require( 'http');
const router = require('../lib/router');

const example  = require ('../example/handlers.js');

router
  .get('/test', example.getTestHandler)
  .post('/test', example.postTestHandler)
  .post('/foo', example.postFooHandler)
  .put('/test', example.putTestHandler)
  .createRoute({
    url: '/johnny',
    method: 'HEAD',
    handler: JohnnyHandler
  })
  .delete('/test', example.deleteTestHandler);

function JohnnyHandler(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hi Johnny.');
  res.end();
}


const server = http.createServer(router.routes());

module.exports = server;
