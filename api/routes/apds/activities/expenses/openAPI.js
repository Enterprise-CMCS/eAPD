const {
  requiresAuth,
  schema: { arrayOf, errorToken, jsonResponse }
} = require('../../../openAPI/helpers');

const openAPI = {
  '/activities/{id}/expenses': {
    put: {
      description: 'Set the expenses for a specific activity',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the activity to set the expenses for',
          required: true
        }
      ],
      requestBody: {
        description: 'The new expenses',
        required: true,
        content: jsonResponse(
          arrayOf({
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description:
                  'The name of this expense. Expense is not added if name is missing.'
              },
              entries: arrayOf({
                type: 'object',
                properties: {
                  year: {
                    type: 'string',
                    description: 'Expense entry year'
                  },
                  amount: {
                    type: 'decimal',
                    description: 'Expense entry amount'
                  },
                  description: {
                    type: 'string',
                    description: 'Expense entry description'
                  }
                }
              })
            }
          })
        )
      },
      responses: {
        200: {
          description: 'The updated activity',
          content: jsonResponse({ $ref: '#/components/schemas/activity' })
        },
        400: {
          description: 'The expenses are invalid (e.g., not an array)',
          content: errorToken
        },
        404: {
          description:
            'The specified activity was not found, or the user does not have access to it'
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
