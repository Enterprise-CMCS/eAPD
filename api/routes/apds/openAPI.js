const {
  requiresAuth,
  schema: { arrayOf, jsonResponse }
} = require('../openAPI/helpers');

const openAPI = {
  '/apds': {
    get: {
      tags: ['APDs'],
      summary: 'Get all of the APDs available to the user',
      description: 'Get a list of all apds associated with requesting user',
      responses: {
        200: {
          description: 'The list of a user’s apds',
          content: jsonResponse(
            arrayOf({
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  description: 'APD ID'
                },
                status: {
                  type: 'string',
                  description:
                    'Current status of the APD; e.g., "draft", "archived", etc.'
                },
                updated: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Timestamp of the last save to this APD'
                },
                years: arrayOf({
                  type: 'number'
                })
              }
            })
          )
        }
      }
    },
    post: {
      tags: ['APDs'],
      summary: `Create a new draft APD associated with the user's state`,
      description: `Create a new draft APD for the current user's state`,
      responses: {
        200: {
          description: 'The new APD',
          content: jsonResponse({ $ref: '#/components/schemas/apd' })
        }
      }
    }
  },

  '/apds/{id}': {
    get: {
      tags: ['APDs'],
      summary: 'Get a single, complete APD',
      description:
        'Where the /apds GET method only returns a small portion of all APDs, this method returns all of one',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the apd to get',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      responses: {
        200: {
          description: 'The APD',
          content: jsonResponse({ $ref: '#/components/schemas/apd' })
        },
        404: {
          description: 'The apd ID does not match any known apds for the user'
        }
      }
    },
    put: {
      tags: ['APDs'],
      summary: 'Update a specific APD',
      description: `Update an APD in the system.  If state profile information is included, the profile information is also updated for the user's state.`,
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the apd to update',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      requestBody: {
        description: 'The new values for the apd.  All fields are optional.',
        required: true,
        content: jsonResponse({ $ref: '#/components/schemas/apd' })
      },
      responses: {
        200: {
          description: 'The update was successful',
          content: jsonResponse({ $ref: '#/components/schemas/apd' })
        },
        404: {
          description: 'The apd ID does not match any known apds for the user'
        }
      }
    },
    delete: {
      tags: ['APDs'],
      summary: 'Archive an APD',
      description: `Updates an APD's status to "archive" and prevents it from being edited`,
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the apd to archive',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      responses: {
        204: {
          description: 'The APD was archived'
        },
        400: {
          description:
            'Invalid request, such as requesting to archive an APD that is not editable'
        },
        404: {
          description: 'The apd ID does not match any known apds for the user'
        }
      }
    }
  },

  '/apds/submitted': {
    get: {
      tags: ['APDs'],
      summary: 'Get all of the submitted APDs (i.e., not draft)',
      description: 'Get a list of all submitted APDs known to the system',
      responses: {
        200: {
          description: 'The list of submitted APDs',
          content: jsonResponse(arrayOf({ $ref: '#/components/schemas/apd' }))
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
