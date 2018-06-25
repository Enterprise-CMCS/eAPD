const {
  requiresAuth,
  schema: { arrayOf, errorToken, jsonResponse }
} = require('../openAPI/helpers');

const activities = require('./activities/openAPI');

const openAPI = {
  '/apds': {
    get: {
      tags: ['APDs'],
      summary: 'Get all of the APDs available to the user',
      description: 'Get a list of all apds associated with requesting user',
      responses: {
        200: {
          description: 'The list of a user’s apds',
          content: jsonResponse(arrayOf({ $ref: '#/components/schemas/apd' }))
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
    put: {
      tags: ['APDs'],
      summary: 'Update a specific APD',
      description: 'Update an apd in the system',
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
    }
  },

  '/apds/{id}/versions': {
    post: {
      tags: ['APDs'],
      summary: 'Save a submitted version of a specific APD',
      description:
        'Create a new saved version of an APD and makes the APD non-draft so it cannot be edited',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the APD to update',
          required: true,
          schema: { type: 'number' }
        }
      ],
      responses: {
        204: {
          description: 'The save was successful'
        },
        400: {
          description:
            'The APD is not currently in draft status, so it cannot be saved. Error is { error: "apd-not-editable" }',
          content: errorToken
        }
      }
    }
  },

  ...activities
};

module.exports = requiresAuth(openAPI);
