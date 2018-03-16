const {
  requiresAuth,
  schema: { arrayOf, jsonResponse }
} = require('../openAPI/helpers');

const openAPI = {
  '/me': {
    get: {
      description: `Get information about the current users`,
      responses: {
        200: {
          description: 'The current user',
          content: jsonResponse({
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
              role: {},
              state: {},
              username: {
                type: 'string',
                description: `User's unique username (email address)`
              }
            }
          })
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
