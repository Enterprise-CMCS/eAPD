import { requiresAuth, jsonResponse, arrayOf } from '../openAPI/helpers.js';

const userObj = jsonResponse({
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

const getUser = {
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
    }
  }
};

export default requiresAuth(getUser, { has403: false });
