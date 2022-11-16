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
                created: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Timestamp of when this APD was created'
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
          content: jsonResponse({
            oneOf: [
              { $ref: '#/components/schemas/hitech' },
              { $ref: '#/components/schemas/mmis' }
            ]
          })
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
          content: jsonResponse({
            oneOf: [
              { $ref: '#/components/schemas/hitech' },
              { $ref: '#/components/schemas/mmis' }
            ]
          })
        },
        403: {
          description: 'The apd ID does not match any known apds for the user'
        },
        404: {
          description: 'The apd does not exist'
        }
      }
    },
    patch: {
      tags: ['APDs'],
      summary: 'Update a specific APD',
      description: `Update an APD in the system using a set of JSON Patch objects. If state profile information is included, the profile information is also updated for the APD's state.`,
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
        description:
          'A set of JSON Patch objects to be applied to the APD to change it',
        required: true,
        content: jsonResponse(
          arrayOf({
            type: 'object',
            description: 'A JSON Patch object',
            properties: {
              op: {
                type: 'string',
                enum: ['add', 'remove', 'replace'],
                description:
                  'The JSON Patch operation. This API only supports add, remove, and replace.'
              },
              path: {
                type: 'string',
                description:
                  'The path of the value to be operated on, specified as a JSON Pointer'
              },
              value: {
                description:
                  'For add or replace operations, the new value to be applied'
              }
            }
          })
        )
      },
      responses: {
        200: {
          description: 'The update was successful',
          content: jsonResponse({
            type: 'object',
            properties: {
              apd: {
                oneOf: [
                  { $ref: '#/components/schemas/hitech' },
                  { $ref: '#/components/schemas/mmis' }
                ]
              },
              budget: {
                oneOf: [
                  { $ref: '#/components/schemas/hitechBudget' },
                  { $ref: '#/components/schemas/mmisBudget' }
                ]
              },
              adminCheck: {
                $ref: '#/components/schemas/adminCheck'
              }
            }
          })
        },
        400: {
          description: 'The update failed due to a problem with the input data',
          content: arrayOf({
            type: 'object',
            description:
              'If the requested patch caused a validation failure, the API will return a list of invalid paths',
            properties: {
              path: {
                type: 'string',
                description:
                  'A JSON Pointer path whose patched value is invalid'
              }
            }
          })
        },
        403: {
          description: 'The apd ID does not match any known apds for the user'
        },
        404: {
          description: 'The apd does not exist'
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
          description: 'The apd is not in draft'
        },
        403: {
          description: 'The apd ID does not match any known apds for the user'
        },
        404: {
          description:
            'Invalid request, such as requesting to archive an APD that is not editable'
        }
      }
    }
  }
};

module.exports = {
  ...requiresAuth(openAPI)
};
