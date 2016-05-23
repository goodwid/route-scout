const fs = require('fs');
const path = require('path');
const url = require('url');

class Router {
  constructor () {
    this.methods = {
      GET: [],
      POST: [],
      PATCH: [],
      PUT: [],
      DELETE: []
    };
  }
  createRoute(obj) {
    if (!this.methods[obj.method]) {
      this.methods[obj.method] = [];
    }
    this.methods[obj.method].push({
      url: obj.url,
      handler: obj.handler
    });
    return this;
  }
  get(url, handler) {
    this.methods.GET.push({url, handler});
    return this;
  }
  post(url, handler) {
    this.methods.POST.push({url, handler});
    return this;
  }
  patch(url, handler) {
    this.methods.PATCH.push({url, handler});
    return this;
  }
  put(url, handler) {
    this.methods.PUT.push({url, handler});
    return this;
  }
  delete(url, handler) {
    this.methods.DELETE.push({url, handler});
    return this;
  }
  static(url) {
    this.methods.GET.push({url, handler: staticHandler});
    return this;
  }
  routes() {
    return (req, res) => {
      const routes = this.methods[req.method];
      if (routes) {
        const route = routes.find(r => {
          if (/:.[a-z0-9]+/gi.test(r.url)) {
            let reqUrl = req.url.split('/');
            let routeUrl = r.url.split('/');

            if (reqUrl.length === routeUrl.length && reqUrl[1] === routeUrl[1]) {
              req.params = {};

              for (let i = 0, l = routeUrl.length; i < l; i++) {
                if (routeUrl[i][0] === ':') {
                  let paramKey = routeUrl[i].replace(':', '');
                  req.params[paramKey] = reqUrl[i];
                }
              }
              return 1;
            }

            return 0;
          } else {
            return req.url.indexOf(r.url) === 0;
          }
        });
        /*  If there is both a /test and a /testing route defined, /testing will return the /test handler.
        */
        if (route) {
          route.handler(req, res);
          return 0;
        }
      }
      res.writeHead(404);
      res.write('Not found.');
      res.end();
      return 1;
    };
  }
}

const staticHandler = (req, res) => {
  const uri = url.parse(req.url).pathname;
  let filename = path.join(process.cwd(), uri);

  fs.stat(filename, function(err) {
    if(err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write(`404 Not Found\n`);
      res.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, 'binary', function(err, file) {
      if(err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write(err + '\n');
        res.end();
        return;
      }

      res.writeHead(200);
      res.write(file, 'binary');
      res.end();
    });
  });
};

module.exports = new Router();
