const assert = require('chai').assert;
const router = require('../lib/router');

describe('unit testing', () => {


  it('GET method handler called when requested', done => {
    const mockRequest = {
      method: 'GET',
      url: '/one',
      called: true
    };
    const testHandler = (req, res) => {
      assert.propertyVal(req, 'method', 'GET');
      assert.isTrue(req.called);
      res();
    };
    router.get('/one', testHandler);
    const fn = router.routes();
    fn(mockRequest, done);
  });


  it('GET method handler not called on bad endpoint', done => {
    const mockFailRequest = {
      method: 'POST',
      url: '/fail'
    };
    const mockRes = {
      writeHead (s) {
        this.head = s;
      },
      write (s) {
        this.write = s;
      },
      // error handling calls res.end() at the conclusion.
      end: done
    };
    const testHandler = () => {
      assert(false, 'this function should not be called.');
    };
    router.post('/two', testHandler);
    const fn = router.routes();
    fn(mockFailRequest, mockRes);
  });

  it('using createRoute to make custom method', done => {
    const mockRequest = {
      method: 'DWORKIN',
      url: '/three',
      called: true
    };
    const testHandler = (req, res) => {
      assert.propertyVal(req, 'method', 'DWORKIN');
      assert.isTrue(req.called);
      res();
    };
    router.createRoute({
      method: 'DWORKIN',
      url: '/three',
      handler: testHandler
    });
    const fn = router.routes();
    fn(mockRequest, done);
  });

  it('params object created on :id endpoint', ()=> {
    const mockRequest = {
      method: 'GET',
      url: '/four/1',
      called: true
    };
    const mockRes = {
      writeHead (s) {
        console.log(s);
      },
      write (s) {
        this.write = s;
      },
      // error handling calls res.end() at the conclusion.
      end: ()=>{}
    };
    const testHandler = (req) => {
      assert.propertyVal(req, 'method', 'GET');
      assert.property(req, 'params');
      assert.isTrue(req.called);
    };
    router.get('/four/:id', testHandler);
    const fn = router.routes();
    assert.equal (fn(mockRequest, mockRes), 0);
  });

});
