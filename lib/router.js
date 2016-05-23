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
  setParams(routeUrl, reqUrl) {
    let params = {};
    let routeUrlParams = routeUrl.split('/');
    let reqUrlParams = reqUrl.split('/');

    for (let i = 0, l = routeUrlParams.length; i < l; i++) {
      if (routeUrlParams[i][0] === ':') {
        let paramKey = routeUrlParams[i].replace(':', '');
        params[paramKey] = reqUrlParams[i];
      }
    }

    return params;
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
        if (route) {
          route.handler(req, res);
          return;
        }
      }
      res.writeHead(404);
      res.write('Not found.');
      res.end();
    };
  }
}

module.exports = new Router();
