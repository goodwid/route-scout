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
    http.get('http://' + process.argv[2], function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });

  // cleanly close the server
  after(done => {
    app.close(done);
  });

});
