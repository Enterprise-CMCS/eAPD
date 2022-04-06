const {
  requiresAuth,
  schema: { arrayOf, jsonResponse }
} = require('../openAPI/helpers');

const userObjectSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      description: "User's unique ID"
    },
    email: {
      type: 'string',
      format: 'email',
      description: "User's email address"
    },
    name: {
      type: 'string',
      description: "User's name"
    },
    phone: {
      type: 'string',
      description: "User's phone number; up to 10 digits"
    },
    position: {
      type: 'string',
      description: "User's position in the state’s Medicaid program"
    },
    state: {
      type: 'string',
      description:
        'Two-letter ID of the state this user is associated with, if any'
    },
    role: {
      type: 'string',
      description: "The user's role name, if any. Can be null."
    }
  }
};

const openAPI = {
  '/users': {
    get: {
      tags: ['Users'],
      summary: 'Gets a list of all users',
      description: 'Get a list of all users in the system',
      responses: {
        200: {
          description: 'The list of users known to the system',
          content: jsonResponse(arrayOf(userObjectSchema))
        }
      }
    }
  },
  '/users/{id}': {
    get: {
      tags: ['Users'],
      summary: 'Gets the information for a specific user',
      description: 'Get a specific user in the system',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the user to fetch',
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      responses: {
        200: {
          description: 'The matching user',
          content: jsonResponse(userObjectSchema)
        },
        404: {
          description: 'The user ID does not match any known users'
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
