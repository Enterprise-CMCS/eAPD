const {
  schema: { arrayOf, jsonResponse }
} = require('../../openAPI/helpers');

const openAPI = {
  '/apds/submissions': {
    get: {
      tags: ['APDs'],
      summary: 'Get all of the APDs that have been submitted',
      description: 'Get a list of all APDs that have been submitted',
      // security: {
      //   apiKeyAuth: []
      // },
      responses: {
        200: {
          description: 'The list of submitted APDs',
          content: jsonResponse({
            oneOf: [
              { $ref: '#/components/schemas/hitech' },
              { $ref: '#/components/schemas/mmis' }
            ]
          })
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
      // security: {
      //   apiKeyAuth: []
      // },
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
              },
              comment: {
                type: 'string',
                description: 'Comments about the status change'
              }
            }
          })
        )
      },
      responses: {
        200: {
          description: 'response description',
          content: jsonResponse(
            arrayOf({
              type: 'object',
              properties: {
                apdId: {
                  type: 'string',
                  description: 'the id of the APD updated'
                },
                updatedStatus: {
                  type: 'string',
                  description: 'the updated status for the APD'
                },
                success: {
                  type: 'boolean',
                  description: 'whether the update was successful'
                },
                error: {
                  type: 'string',
                  description: 'error message describing unsuccessful updates'
                }
              }
            })
          )
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
