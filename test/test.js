const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

describe('server',() => {
  const request = chai.request(app);

  describe('GET',() => {
    describe('error handling',() => {
      it('returns 404.', done => {
        request
          .get('')
          .end((err,res) => {
            assert.equal(res.statusCode, 404);
            assert.ok(res.text);
            done();
          });
      });
    });
  });

  // cleanly close the server
  after(done => {
    app.close(done);
  });

});
