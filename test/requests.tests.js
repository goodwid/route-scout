const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const http = require('http');

describe('server',() => {
  const request = chai.request(app);

  before(function () {
    app.listen(process.argv[2]);
  });

  it('server should get started', function(done) {
    chai.request(process.argv[2] || 8080)
      .get('/test')
      .end(function(err,data){
        assert.equal(data, status(404));
        done();
      });
  });

  it('should return 200', function(done) {
    http.get('http://' + process.argv[2], function (response) {
      assert.equal(200, response.statusCode);
      done();
    });
  });

  it('when path is not recognized it routes to 404 page', (done) => {
    chai.request(app)
      .get('/some/path')
      .end((err,response) => {
        assert.equal(404, response.statusCode);
        done();
      });
  });

  // cleanly close the server
  after(done => {
    app.close(done);
  });

});
