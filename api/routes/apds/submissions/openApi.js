const {
  schema: { arrayOf, jsonResponse }
} = require('../../openAPI/helpers');

const openAPI = {
  '/apds/submissions': {
    get: {
      tags: ['APDs'],
      summary: 'Get all of the APDs that have been submitted',
      description: 'Get a list of all APDs that have been submitted',
      security: {
        apiKeyAuth: []
      },
      responses: {
        200: {
          description: 'The list of submitted APDs',
          content: jsonResponse(arrayOf({ $ref: '#/components/schemas/apd' }))
        },
        403: {
          description: 'Unauthenticated error'
        }
      }
    },
    patch: {
      tags: ['APDs'],
      summary: 'Update the APD status',
      description: 'Update the APD status',
      security: {
        apiKeyAuth: []
      },
      requestBody: {
        description: 'Updates to the status of APDs that have been submitted',
        required: true,
        content: jsonResponse(
          arrayOf({
            type: 'object',
            description: 'A JSON status update object',
            properties: {
              apdId: {
                type: 'string',
                description: 'The APD ID'
              },
              newStatus: {
                type: 'string',
                enum: [''],
                description: 'The new status of the APD'
              }
            }
          })
        )
      },
      responses: {
        200: {
          description: 'response description'
        },
        400: {
          description: 'Request body is invalid'
        },
        403: {
          description: 'Unauthenticated error'
        }
      }
    }
  }
};

module.exports = openAPI;
