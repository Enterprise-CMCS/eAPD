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
    },
    post: {
      tags: ['Users'],
      summary: 'Adds a new user',
      description: 'Add a new user to the system',
      requestBody: {
        content: jsonResponse({
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: `The new user's email address`
            },
            password: {
              type: 'string',
              description: `The new user's password`
            }
          },
          required: ['email', 'password']
        })
      },
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
    delete: {
      tags: ['Users'],
      summary: 'Removes a user',
      description: 'Delete a user from the system',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the user to delete',
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      responses: {
        204: {
          description: 'The user was successfully deleted'
        },
        400: {
          description: 'The provided user ID was invalid'
        },
        404: {
          description: 'The user ID does not match any known users'
        }
      }
    },
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
          description: 'The user ID does not match any known users',
          content: errorToken
        }
      }
    },
    put: {
      tags: ['Users'],
      summary: 'Updates a user account',
      description: 'Update a user in the system.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the user to update',
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      requestBody: {
        content: jsonResponse({
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: `The user's new email address`
            },
            name: {
              type: 'string',
              description: `The user's new name`
            },
            password: {
              type: 'string',
              description: `The user's new password`
            },
            phone: {
              type: 'string',
              description: `The user's new phone number`
            },
            position: {
              type: 'string',
              description: `The user's new position`
            },
            role: {
              type: 'string',
              description: `The user's new authorization role. If provided, this must match a valid role name in the system or be an empty string to remove the role entirely. Ignored if the user is updating their own account.`
            },
            state: {
              type: 'string',
              description: `The user's new state. Must match the two-letter ID of a state known to the system.`
            }
          }
        })
      },
      responses: {
        204: {
          description: 'The user was successfully updated'
        },
        400: {
          description: 'The request was invalid'
        },
        404: {
          description: 'The user ID does not match any known users'
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
