const http = require( 'http');
const router = require ('./router.js')();
const db = require ('./db.js');

router
  .get('/test', (req, res) => {
    let id = req.url.replace('/test/','');
    db.read(id)
      .then(data => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(data));
        res.end();
      });
  })
  .post('/test', (req, res) => {
    // let id = req.url.replace('/test/','');
    let body='';
    req.on('data', (chunk) => body += chunk);
    req.on('end', () => {
      db.create(JSON.parse(body))
        .then(data => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(data));
          res.end();
        });
    });
  });
const server = http.createServer(router.routes());

module.exports = server;
