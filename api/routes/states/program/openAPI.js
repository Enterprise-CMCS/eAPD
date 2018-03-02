const {
  requiresAuth,
  schema: { arrayOf, jsonResponse }
} = require('../../openAPI/helpers');

const programObjectSchema = {
  type: 'object',
  properties: {
    program_vision: {
      type: 'string',
      description: 'Program vision statement'
    },
    program_benefits: {
      type: 'string',
      description: 'Planned benefits of the program'
    }
  }
};

const openAPI = {
  '/states/program': {
    get: {
      description: `Get the program vision and key benefits for the current users's state`,
      responses: {
        200: {
          description: 'Vision and benefit of the state',
          content: jsonResponse(arrayOf(programObjectSchema))
        }
      }
    }
  },
  '/states/{id}/program': {
    get: {
      description:
        'Get the program vision and key benefits for a specific state',
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
          description: 'Vision and benefit of the state',
          content: jsonResponse(programObjectSchema)
        },
        404: {
          description: 'The state ID does not match any known states'
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
