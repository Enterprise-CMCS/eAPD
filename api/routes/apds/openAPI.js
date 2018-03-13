const {
  requiresAuth,
  schema: { arrayOf, jsonResponse }
} = require('../openAPI/helpers');

const apdObjectSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      description: 'APD ID'
    },
    status: {
      type: 'string',
      description: 'Status'
    },
    period: {
      type: 'string',
      description: 'Covered time period'
    },
    created_at: {
      type: 'dateTime',
      description: 'Creation date'
    },
    updated_at: {
      type: 'dateTime',
      description: 'Last updated date'
    },
    approved_at: {
      type: 'dateTime',
      description: 'Approval date'
    }
  }
};

const openAPI = {
  '/apds': {
    get: {
      description: 'Get a list of all apds associated with requesting user',
      responses: {
        200: {
          description: 'The list of a user’s apds',
          content: jsonResponse(arrayOf(apdObjectSchema))
        }
      }
    }
  },

  '/apds/{id}': {
    put: {
      description: 'Update an apd in the system',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the apd to update',
          required: true
        }
      ],
      requestBody: {
        description: 'The new values for the apd.  All fields are optional.',
        required: true,
        content: jsonResponse({
          type: 'object',
          properties: {
            status: {
              description: 'The new status for the apd.',
              type: 'string'
            },
            period: {
              description: 'The new period for the apd.',
              type: 'string'
            }
          }
        })
      },
      responses: {
        200: {
          description: 'The update was successful',
          content: jsonResponse(apdObjectSchema)
        },
        404: {
          description: 'The apd ID does not match any known apds for the user'
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
