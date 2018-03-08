const {
  requiresAuth,
  schema: { arrayOf, jsonResponse, errorToken }
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
    }
  }
};

const openAPI = {
  '/users': {
    get: {
      description: 'Get a list of all users in the system',
      responses: {
        200: {
          description: 'The list of users known to the system',
          content: jsonResponse(arrayOf(userObjectSchema))
        }
      }
    },
    post: {
      description: 'Add a new user to the system',
      parameters: [
        {
          name: 'email',
          in: 'body',
          type: 'string',
          format: 'email',
          description: "The new user's email address",
          required: true
        },
        {
          name: 'password',
          in: 'body',
          type: 'string',
          description: "The new user's password",
          required: true
        }
      ],
      responses: {
        200: {
          description: 'The user was successfully added'
        },
        400: {
          description:
            'Invalid user submitted, such as email address already exists or password is weak',
          content: errorToken
        }
      }
    }
  },
  '/users/{id}': {
    get: {
      description: 'Get a specific user in the system',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the user to fetch',
          required: true
        }
      ],
      responses: {
        200: {
          description: 'The matching user',
          content: jsonResponse(userObjectSchema)
        },
        404: {
          description: 'The user ID does not match any known users',
          content: errorToken
        }
      }
    },
    put: {
      description: 'Update a user in the system',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the user to update',
          required: true
        }
      ],
      requestBody: {
        description: 'The new values for the user.  All fields are optional.',
        required: true,
        content: jsonResponse({
          type: 'object',
          properties: {
            email: {
              description: 'The new email for the user. Must be unique.',
              type: 'string'
            },
            password: {
              description:
                'The new password for the user. Must meet complexity requirements.',
              type: 'string'
            },
            name: {
              description: 'The new full name for the user.',
              type: 'string'
            },
            position: {
              description: 'The new position description for the user.',
              type: 'string'
            },
            phone: {
              description: 'The new phone number for the user.',
              type: 'string'
            },
            state: {
              description: 'The new state or jurisdiction for the user.',
              type: 'string'
            }
          }
        })
      },
      responses: {
        200: {
          description: 'The update was successful',
          content: jsonResponse(arrayOf(userObjectSchema))
        },
        400: {
          description:
            'The body of the request is invalid: the supplied email address already belongs to another user or the password is too weak',
          content: errorToken
        },
        404: {
          description: 'The user ID does not match any known users'
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
