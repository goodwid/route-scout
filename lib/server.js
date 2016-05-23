const http = require( 'http');
const router = require('../lib/router');

const example  = require ('../example/handlers.js');




const fs = require('fs');
const path = require('path');
const url = require('url');



router
  .get('/test/:id', example.getTestHandler)
  .get('/test', example.getTestHandler)
  .post('/test', example.postTestHandler)
  .post('/foo', example.postFooHandler)
  .put('/test', example.putTestHandler)
  .createRoute({
    url: '/test',
    method: 'DELETE',
    handler: example.deleteTestHandler
  })
  .static('/static');






const server = http.createServer(router.routes());

module.exports = server;
