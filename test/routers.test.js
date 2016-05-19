const chai = require('chai');
const assert = chai.assert;
const chaihttp = require('chai-http');
const server = require('../lib/server');

chai.use(chaihttp);

const request = chai.request(server);

const testGetData =  {
  'thing':'item';
};
const testPostData =  {
  'thing':'item'
};
const testPutData = {
  'thing':'item',
  'resource' : 1
};
const testResource = 1;



describe('router',() => {
  it('returns 404 on a bad request.', done => {
    request
        .get('/fail')
        .end((err,res) => {
          assert.equal(res.statusCode, 404);
          assert.ok(res.text);
          done();
        });
  });
});


describe('POST',() => {
  describe('error handling',() => {
    it('without a valid endpoint returns a 400 status code', done => {
      request
        .post('/fail')
        .end((err,res) => {
          assert.equal(res.statusCode, 404);
          assert.ok(res.text);
          done();
        });
    });
  });
  describe('operations', () => {
    it('/test returns JSON data with resource added', done => {
      request
        .post('/test')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(testPostData))
        .end((err,res) => {
          var result = JSON.parse(res.text);
          assert.equal(res.statusCode, 200);
          assert.propertyVal(res.header,'content-type','application/json');
          assert.isObject(result);
          assert.property(result, 'id');
          done();
        });
    });
  });
});
