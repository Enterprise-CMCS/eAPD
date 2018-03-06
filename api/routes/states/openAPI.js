const {
  requiresAuth,
  schema: { arrayOf, jsonResponse }
} = require('../openAPI/helpers');

const stateObjectSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description:
        'State, territory, or district ID (2-letter abbreviation, lowercase)'
    },
    medicaid_office: {
      type: 'object',
      description:
        'Address of the state, territory, or district Medicaid office',
      properties: {
        address: {
          type: 'string',
          description: 'Street address'
        },
        city: {
          type: 'string',
          description: 'City'
        },
        zip: {
          type: 'string',
          description: 'ZIP code'
        }
      }
    },
    name: {
      type: 'string',
      description: 'State, territory, or district name'
    },
    program_vision: {
      type: 'string',
      description: 'Program vision statement'
    },
    program_benefits: {
      type: 'string',
      description: 'Planned benefits of the program'
    },
    state_pocs: arrayOf({
      type: 'object',
      description:
        'A list of points of contact for the state, territory, or district',
      properties: {
        name: { type: 'string', description: `Point of contact's name` },
        position: {
          type: 'string',
          description: `Point of contact's position in the state, territory, or district`
        },
        email: {
          type: 'string',
          description: `Point of contact's email address`
        }
      }
    })
  }
};

const openAPI = {
  '/states': {
    get: {
      description: `Get information about the users's state, territory, or district`,
      responses: {
        200: {
          description: 'Information about the state, territory, or district',
          content: jsonResponse(stateObjectSchema)
        }
      }
    }
  },
  '/states/{id}': {
    get: {
      description:
        'Get information about a specific state, territory, or district',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description:
            'The ID (2-letter abbreviation, lowercase) of the state, territory, or district to fetch',
          required: true
        }
      ],
      responses: {
        200: {
          description: 'Information about the state, territory, or district',
          content: jsonResponse(stateObjectSchema)
        },
        404: {
          description:
            'The requested ID does not match any known states, territories, or districts'
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
