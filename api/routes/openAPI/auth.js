const {
  schema: { arrayOf, jsonResponse }
} = require('./helpers');

const token = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
      description: 'A JWT to be presented in the Authorization header of all subsequent requests.'
    }
  }
}

const user = {
  type: 'object',
  properties: {
    activities: arrayOf({
      type: 'string',
      description: 'Names of system activities this user can perform'
    }),
    id: {
      type: 'number',
      description: `User's unique ID, used internally and for identifying the user when interacting with the API`
    },
    name: {
      type: 'string',
      description: `The user's name, if defined`
    },
    phone: {
      type: 'string',
      description: `The user's phone number, if defined`
    },
    position: {
      type: 'string',
      description: `The user's position, if defined`
    },
    role: {
      type: 'string',
      description: 'Names of system authorization role this user belongs to'
    },
    state: {
      type: 'object',
      description: 'The state/territory/district that this user is assigned to',
      properties: {
        id: {
          type: 'string',
          description: 'Lowercase 2-letter code'
        },
        name: {
          type: 'string',
          description: 'State/territory/district full name'
        }
      }
    },
    username: {
      type: 'string',
      description: `User's unique username (email address)`
    }
  }
};

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
          content: jsonResponse({
            token,
            user
          })
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
      description: 'Logs the user out by deleting the user\'s session',
      responses: {
        200: {
          description: 'Deletes the session'
        },
        400: {
          description: 'Not logged in'
        }
      }
    }
  }
};
