const chai = require('chai');
const assert = chai.assert;
const chaihttp = require('chai-http');
const server = require('../lib/server');

chai.use(chaihttp);

const request = chai.request(server);

const testGetData =  {
  'title' : 'Time Enough For Love',
  'author' : 'Robert Heinlein',
  'genre' : 'Science Fiction',
  'pub_year' : 1973,
  'read' : true
};
const testPostData =  {
  'title' : 'Gone With The Wind',
  'author' : 'Margaret Mitchell',
  'genre' : 'fiction',
  'pub_year' : 1964,
  'read' : false
};
const testPutData = {
  'title' : 'Gone With The Wind',
  'author' : 'Margaret Mitchell',
  'genre' : 'fiction',
  'pub_year' : 1964,
  'read' : false,
  'resource' : 1
};
const testResource = 1;



describe('router',() => {
  it('returns 404 on a bad request.', done => {
    request
        .get('/test')
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
        .post('/test')
        .end((err,res) => {
          assert.equal(res.statusCode, 404);
          assert.propertyVal(res.header,'content-type','text/plain');
          assert.ok(res.text);
          done();
        });
    });
  });
  describe('operations', () => {
    it('/books returns JSON data with resource added', done => {
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
