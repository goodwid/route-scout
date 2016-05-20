const assert = require('chai').assert;
const router = require('../lib/router');

describe('unit testing', () => {
  const mockRequest = {
    method: 'GET',
    url: '/one',
    called: true
  };


  it('GET method handler called when requested', done => {
    function testHandler (req, res) {
      assert.propertyVal(req, 'method', 'GET');
      assert.isTrue(req.called);
      res();
    }
    router.get('/one', testHandler);
    const fn = router.routes();
    fn(mockRequest, done);
  });


  it('GET method handler not called on bad endpoint', done => {
    const mockFailRequest = {
      method: 'POST',
      url: '/failure'
    };
    const mockRes = {
      writeHead (s) {
        this.head = s;
      },
      write (s) {
        this.write = s;
      },
      end: done
    };
    function testHandler2 () {
      assert(false);
    }
    router.post('/two', testHandler2);
    const fn2 = router.routes();
    fn2(mockFailRequest, mockRes);
  });

});
