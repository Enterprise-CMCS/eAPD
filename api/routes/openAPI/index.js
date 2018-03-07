const pkg = require('../../package.json');

const auth = require('./auth');
const activities = require('../activities/openAPI');
const users = require('../users/openAPI');
const roles = require('../roles/openAPI');
const states = require('../states/openAPI');

module.exports = {
  openapi: '3.0',
  info: {
    title: 'CMS HITECH APD API',
    description: 'The API for the CMS HITECH APD app.',
    version: pkg.version
  },
  paths: {
    ...auth,
    ...activities,
    ...users,
    ...roles,
    ...states
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
