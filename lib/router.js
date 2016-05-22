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
