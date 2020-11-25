const {
  requiresAuth,
  schema: { arrayOf, jsonResponse }
} = require('../openAPI/helpers');

const userObj = jsonResponse({
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
    roles: {
      type: 'array',
      description: 'Names of system authorization role this user belongs to',
      items: {
        type: 'string'
      }
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
      description: `User's unique username`
    }
  }
});

const stateId = {
  type: 'string',
  descripton: '2-letter US State or Territory abbreviation, lowercase'
};

const stateIdParameter = {
  name: 'stateId',
  in: 'body',
  description: stateId.description,
  required: true,
  schema: {
    type: stateId.type
  }
};

const openAPI = {
  '/me': {
    get: {
      tags: ['Users'],
      summary: `Gets the current user's information`,
      description: `Get information about the current user`,
      responses: {
        200: {
          description: 'The current user',
          content: userObj
        }
      }
    },
    patch: {
      tags: ['Users'],
      description: 'Update user',
      parameters: [stateIdParameter],
      requestBody: {
        description: '',
        required: true,
        content: jsonResponse({
          type: 'object',
          properties: {
            stateId
          }
        })
      },
      responses: {
        200: {
          description: 'Record was updated'
        },
        400: {
          description: 'stateId is invalid'
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI, { has403: false });
