const pkg = require('../../package.json');

const auth = require('./auth');
const apds = require('../apds/openAPI');
const authActivities = require('../auth/activities/openAPI');
const authRoles = require('../auth/roles/openAPI');
const me = require('../me/openAPI');
const users = require('../users/openAPI');
const states = require('../states/openAPI');

module.exports = {
  openapi: '3.0',
  info: {
    title: 'CMS HITECH APD API',
    description: 'The API for the CMS HITECH APD app.',
    version: pkg.version
  },
  paths: {
    ...apds,
    ...auth,
    ...authActivities,
    ...authRoles,
    ...me,
    ...users,
    ...states,
    '/open-api': {
      get: {
        description: 'Returns this document',
        responses: {
          200: {
            description: 'This OpenAPI document'
          }
        }
      }
    }
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
