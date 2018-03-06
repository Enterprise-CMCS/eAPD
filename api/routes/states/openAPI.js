const {
  requiresAuth,
  schema: { jsonResponse }
} = require('../openAPI/helpers');

const stateObjectSchema = {
  type: 'object',
  properties: {
    id: {},
    medicaid_office: {},
    name: {},
    program_vision: {
      type: 'string',
      description: 'Program vision statement'
    },
    program_benefits: {
      type: 'string',
      description: 'Planned benefits of the program'
    },
    state_pocs: { type: 'string', format: 'json', description: '' }
  }
};

const openAPI = {
  '/states': {
    get: {
      description: `Get information about the users's state`,
      responses: {
        200: {
          description: 'Information about the state',
          content: jsonResponse(stateObjectSchema)
        }
      }
    }
  },
  '/states/{id}': {
    get: {
      description: 'Get information about a specific state',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description:
            'The ID (2-letter abbreviation, lowercase) of the state to fetch',
          required: true
        }
      ],
      responses: {
        200: {
          description: 'Information about the state',
          content: jsonResponse(stateObjectSchema)
        },
        404: {
          description: 'The state ID does not match any known states'
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
