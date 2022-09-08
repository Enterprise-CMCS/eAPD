const {
  requiresAuth,
  schema: { jsonResponse }
} = require('../../openAPI/helpers');

const openAPI = {
  '/apds/{id}/budget': {
    patch: {
      tags: ['APDs', 'budget'],
      summary: 'Update the budget of an APD',
      description:
        'Retrieves the APD from the database and updates the budget for it.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the apd to update the budget of',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      responses: {
        200: {
          description: 'The updated budget',
          content: jsonResponse({ $ref: '#/components/schemas/apd/budget' })
        },
        400: {
          description: 'The updated failed due to a problem'
        },
        403: {
          description: 'The apd ID does not match any known apds for the user'
        },
        404: {
          description: 'The apd does not exist'
        }
      }
    }
  }
};

module.exports = {
  ...requiresAuth(openAPI)
};
