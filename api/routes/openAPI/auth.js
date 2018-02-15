module.exports = {
  '/auth/login': {
    post: {
      description: 'Authenticate a user against the local database',
      parameters: [
        {
          name: 'username',
          in: 'body',
          required: true
        },
        {
          name: 'password',
          in: 'body',
          required: true
        }
      ],
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
        401: {
          description: 'Unsuccessful login'
        }
      }
    }
  },
  '/auth/logout': {
    get: {
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
};
