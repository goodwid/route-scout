const db = require ('./db.js');

const handlers = {};

handlers.getTestHandler = (req, res) => {
  let id = req.url.replace('/test/','');
  console.log(id);
  db.read(id)
    .then(data => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(data));
      res.end();
    });
};

handlers.postTestHandler = (req, res) => {
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
};

handlers.postFooHandler = (req, res) => {
  const data = 'Nothing to see here, move along.';
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(data));
  res.end();
};

handlers.putTestHandler = (req, res) => {
  let id = req.url.replace('/test/','');
  let body='';
  req.on('data', (chunk) => body += chunk);
  req.on('end', () => {
    db.update(id, JSON.parse(body))
      .then( data => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(data));
        res.end();
      });
  });
};

handlers.deleteTestHandler = (req, res) => {
  let id = req.url.replace('/test/','');
  db.delete(id)
      .then(data => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(data));
        res.end();
      });
};

module.exports = handlers;
