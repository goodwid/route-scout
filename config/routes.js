const db = require ('../lib/db.js');
var router = require('../lib/router')();

module.exports = router
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
