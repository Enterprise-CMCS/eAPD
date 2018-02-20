const pkg = require('../../package.json');

const auth = require('./auth');
const users = require('../users/openAPI');

module.exports = {
  openapi: '3.0',
  info: {
    title: 'CMS HITECH APD API',
    description: 'The API for the CMS HITECH APD app.',
    version: pkg.version
  },
  paths: {
    ...auth,
    ...users
  },
  components: {
    securitySchemes: {
      sessionCookie: {
        type: 'apiKey',
        in: 'cookie',
        name: 'session'
      }
    }
  }
};
