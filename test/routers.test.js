const chai = require('chai');
const assert = chai.assert;
const chaihttp = require('chai-http');
const server = require('../lib/server');


chai.use(chaihttp);


const testPostData =  {
  'thing':'item'
};

const request = chai.request(server);
describe ('routing on server',() => {
  it('returns 404 on a bad request.', done => {
    request
        .get('/fail')
        .end((err,res) => {
          assert.equal(res.statusCode, 404);
          assert.ok(res.text);
          done();
        });
  });

  it('/test returns JSON data with resource added', done => {
    request
      .post('/test')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(testPostData))
      .end((err,res) => {
        var result = res.body;
        assert.equal(res.statusCode, 200);
        assert.propertyVal(res.header,'content-type','application/json');
        assert.isObject(result);
        assert.property(result, 'id');
        done();
      });
  });
  const data = 'Nothing to see here, move along.';
  it('/foo returns snarky comment', done => {
    request
      .post('/foo')
      .end((err,res) => {
        var result = JSON.parse(res.text);
        assert.equal(res.statusCode, 200);
        assert.equal(result, data);
        done();
      });
  });

});
