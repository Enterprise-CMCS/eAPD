const {
  requiresAuth,
  schema: { arrayOf, errorToken, jsonResponse }
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

// deeply clone
const putSchema = JSON.parse(JSON.stringify(stateObjectSchema));
delete putSchema.properties.id;
delete putSchema.properties.name;

const openAPI = {
  '/states': {
    put: {
      description: `Update information about the users's state, territory, or district`,
      requestBody: {
        description:
          'The new state information.  Any extraneous fields will be discarded.',
        content: {
          'application/json': {
            schema: putSchema
          }
        }
      },
      responses: {
        200: {
          description:
            'Information about the state, territory, or district was successfully updated. Returns the full, updated state object',
          content: jsonResponse(stateObjectSchema)
        },
        400: {
          description: 'The request was invalid',
          content: errorToken
        }
      }
    }
  },
  '/states/{id}': {
    put: {
      description:
        'Update information about a specific state, territory, or district',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description:
            'The ID (2-letter abbreviation, lowercase) of the state, territory, or district to fetch',
          required: true
        }
      ],
      requestBody: {
        description:
          'The new state information.  Any extraneous fields will be discarded.',
        content: {
          'application/json': {
            schema: putSchema
          }
        }
      },
      responses: {
        200: {
          description:
            'Information about the state, territory, or district was successfully updated. Returns the full, updated state object.',
          content: jsonResponse(stateObjectSchema)
        },
        400: {
          description: 'The request was invalid',
          content: errorToken
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
