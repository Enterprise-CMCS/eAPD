const { schema: { jsonResponse } } = require('./helpers');

module.exports = {
  '/auth/login': {
    post: {
      tags: ['Authentication and authorization'],
      summary: 'Logs a user in',
      description: 'Authenticate a user against the local database',
      requestBody: {
        required: true,
        content: jsonResponse({
          type: 'object',
          properties: {
            username: {
              type: 'string'
            },
            password: {
              type: 'string'
            }
          }
        })
      },
      responses: {
        200: {
          description: 'Successful login',
          headers: {
            'Set-Cookie': {
              schema: {
                type: 'string',
                example:
                  'session=session-data; path=/; expires=Sat, 1 Jan 2035 12:00:00 GMT; httponly'
              }
            }
          }
        },
        400: {
          description: 'Missing username or password'
        },
        401: {
          description: 'Unsuccessful login'
        }
      }
    }
  },
  '/auth/logout': {
    get: {
      tags: ['Authentication and authorization'],
      summary: 'Logs the current user out',
      description: 'Logs the user out by invalidating the session cookie',
      responses: {
        200: {
          description: 'Clears the session cookie',
          headers: {
            'Set-Cookie': {
              schema: {
                type: 'string',
                example: 'session=; expires=; httponly'
              }
            }
          }
        }
      }
    }
  }
};
