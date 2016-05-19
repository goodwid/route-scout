


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

  routes() {
    return(req, res) => {
      const routes = this.ethods[req.method];
      if (routes) {
        const route = routes.find(r => req.url.indexOf(r.url) === 0);
        if (route) {
          route.handler(req,res);
          return;
        }
      }
      res.writeHead(404);
      res.write('Not found.');
      res.end();
    };
  }
}

module.exports = function() {
  return new Router();
};
