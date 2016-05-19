const router = require('../lib/router')();
const chai = require('chai');
const assert = chai.assert;
const chaihttp = require('chai-http');
const http = require('http');
chai.use(chaihttp);

const server = http.createServer(router.routes());
const request = chai.request(server);

const testData = {
  foo: 'bar'
};

router
  .get('/test', (req, res) => {
    let id = req.url.replace('/test/','');
    res.writeHead(200, {'Content-Type':'application/json'});
    res.write(JSON.stringify(1))
    res.end();
  });



describe('router',() => {
  it('returns 404 on a bad request.', () => {
    request
        .get('/test')
        .end((err,res) => {
          assert.equal(res.statusCode, 404);
          assert.ok(res.text);
          done();
        });


  });
});
