const {
  schema: { jsonResponse }
} = require('./helpers');

module.exports = {
  '/auth/login/nonce': {
    post: {
      tags: ['Authentication and authorization'],
      summary: 'Gets a login nonce',
      description:
        'To help mitigate replay attacks, the server authentication requires a server-signed nonce. The nonce contains the authenticating username, is cryptographically signed by the server, and is only valid for 3 seconds. This nonce is passed to requests to /auth/login',
      requestBody: {
        required: true,
        content: jsonResponse({
          type: 'object',
          properties: {
            username: {
              type: 'string'
            }
          }
        })
      },
      responses: {
        200: {
          description: 'Obtained a nonce',
          content: jsonResponse({
            type: 'object',
            properties: {
              nonce: {
                type: 'string',
                description:
                  'JWT-encoded string that acts as the nonce for this authentication.  This nonce is required for API requests to /auth/login.  Any username value will generate a nonce; receiving a nonce is not a guarantee that the username is valid.'
              }
            }
          })
        },
        400: {
          description: 'Missing username'
        }
      }
    }
  },
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
              type: 'string',
              description: 'A nonce returned by a request to /auth/login/nonce'
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
                  'token=auth-token-jwt; path=/; expires=Sat, 1 Jan 2035 12:00:00 GMT; httponly'
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
