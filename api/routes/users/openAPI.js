import { requiresAuth, jsonResponse, arrayOf } from '../openAPI/helpers';

const userObjectSchema = jsonResponse({
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: `User's unique ID, used internally and for identifying the user when interacting with the API`
    },
    name: {
      type: 'string',
      description: `The user's name, if defined`
    },
    username: {
      type: 'string',
      description: `User's unique username`
    },
    role: {
      type: 'string',
      description: `The user's access role`
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
        },
        medicaid_office: {
          type: 'object',
          properties: {
            address1: {
              type: 'string'
            },
            city: {
              type: 'string'
            },
            zip: {
              type: 'string'
            },
            state: {
              type: 'string'
            },
            director: {
              type: 'object',
              properties: {
                name: {
                  type: 'string'
                },
                email: {
                  type: 'string'
                },
                phone: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    },
    states: {
      type: 'object',
      properties: {
        '{state_id}': {
          type: 'string',
          description: 'The affiliation status for the state in the field',
          enum: ['requested', 'approved', 'denied', 'revoked']
        }
      }
    },
    permissions: arrayOf({
      type: 'object',
      properties: {
        '{state_id}': arrayOf({
          type: 'string',
          description:
            'Names of system activities this user can perform for that state'
        })
      }
    }),
    activities: arrayOf({
      type: 'string',
      description:
        'Names of system activities this user can perform for the selected state'
    }),
    affiliation: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        user_id: {
          type: 'string'
        },
        username: {
          type: 'string'
        },
        state_id: {
          type: 'string'
        },
        role_id: {
          type: 'string'
        },
        state: {
          type: 'string'
        },
        created_at: {
          type: 'string'
        },
        updated_at: {
          type: 'string'
        },
        expires_at: {
          type: 'string'
        }
      }
    }
  }
});

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

export default requiresAuth(openAPI);
