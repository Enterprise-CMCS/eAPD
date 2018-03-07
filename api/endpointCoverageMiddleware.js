const fs = require('fs');

const registerCoverageMiddleware = server => {
  if (process.env.ENDPOINT_COVERAGE_CAPTURE) {
    server.use((req, res, next) => {
      const end = res.end.bind(res);
      res.end = (...args) => {
        const path = req.route ? req.route.path : req.path;
        const result = {
          path,
          method: req.method,
          status: res.statusCode
        };
        fs.appendFileSync('./endpoints-hit.txt', `${JSON.stringify(result)}\n`);
        return end(...args);
      };

      next();
    });
  }
};

const getCoverageEndpoints = server => {
  if (process.env.ENDPOINT_COVERAGE_CAPTURE) {
    const allRoutes = server._router.stack // eslint-disable-line no-underscore-dangle
      .filter(a => !!a.route)
      .map(({ route: { path, methods } }) => ({
        path,
        method: Object.keys(methods)[0]
      }));
    fs.writeFileSync('./endpoints-all.txt', JSON.stringify(allRoutes));
  }
};

module.exports = {
  getCoverageEndpoints,
  registerCoverageMiddleware
};
