const fs = require('fs');
const path = require('path');
const url = require('url');

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
    this.methods[obj.method].push(obj);
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
    this.methods.GET.push({url, staticHandler});
    return this;
  }
  getParams(routeUrl, reqUrl) {
    let reqUrlParams = reqUrl.split('/');
    let routeUrlParams = routeUrl.split('/');
    let newObj = {};

    for (let i = 0, l = routeUrlParams.length; i < l; i++) {
      if (routeUrlParams[i][0] === ':') {
        let paramKey = routeUrlParams[i].replace(':', '');
        newObj[paramKey] = reqUrlParams[i];
      }
    }

    return newObj;
  }
  routes() {
    return(req, res) => {
      const routes = this.methods[req.method];
      if (routes) {
        const route = routes.find(r => req.url.indexOf(r.url) === 0);
        /*  If there is both a /test and a /testing route defined, /testing will return the /test handler.
        */
        if (route) {
          req.params = this.getParams(route.url, req.url);
          route.handler(req,res);
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

module.exports = new Router();
