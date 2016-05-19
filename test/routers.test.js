const router = require('../lib/router');
const assert = require('chai').assert;

const res = {
  url: 'http://test/test',
  text: 'This is a test.',
  header: {'Content-Type': 'text/plain'},
  write(s) {
    this.output = s;
  },
  writeHead(s) {
    this.head = s;
  },
  end() return;

};

const req = {
  url: 'http://test/test',
  text: 'This is a test.',
  method: ''
};

router.get('/test', (req, res) => {
  let id = req.url.replace('/test/','');

})


describe('router',() => {

  it('returns 404 on a bad request.', () => {



  });
});
