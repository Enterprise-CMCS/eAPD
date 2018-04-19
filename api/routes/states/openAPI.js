const {
  requiresAuth,
  schema: { errorToken, jsonResponse }
} = require('../openAPI/helpers');

const openAPI = {
  '/states': {
    get: {
      description: `Get information about the users's state, territory, or district`,
      responses: {
        200: {
          description: 'Information about the state, territory, or district',
          content: jsonResponse({ $ref: '#/components/schemas/state' })
        }
      }
    },
    put: {
      description: `Update information about the users's state, territory, or district`,
      requestBody: {
        description:
          'The new state information.  Any extraneous fields will be discarded.',
        content: jsonResponse({ $ref: '#/components/schemas/state' })
      },
      responses: {
        200: {
          description:
            'Information about the state, territory, or district was successfully updated. Returns the full, updated state object',
          content: jsonResponse({ $ref: '#/components/schemas/state' })
        },
        400: {
          description: 'The request was invalid',
          content: errorToken
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
          content: jsonResponse({ $ref: '#/components/schemas/state' })
        },
        404: {
          description:
            'The requested ID does not match any known states, territories, or districts'
        }
      }
    }

    // put: {
    //   description:
    //     'Update information about a specific state, territory, or district',
    //   parameters: [
    //     {
    //       name: 'id',
    //       in: 'path',
    //       description:
    //         'The ID (2-letter abbreviation, lowercase) of the state, territory, or district to fetch',
    //       required: true
    //     }
    //   ],
    //   requestBody: {
    //     description:
    //       'The new state information.  Any extraneous fields will be discarded.',
    //     content: jsonResponse({ $ref: '#/components/schemas/state' })
    //   },
    //   responses: {
    //     200: {
    //       description:
    //         'Information about the state, territory, or district was successfully updated. Returns the full, updated state object.',
    //       content: jsonResponse({ $ref: '#/components/schemas/state' })
    //     },
    //     400: {
    //       description: 'The request was invalid',
    //       content: errorToken
    //     },
    //     404: {
    //       description:
    //         'The requested ID does not match any known states, territories, or districts'
    //     }
    //   }
    // }
  }
};

module.exports = requiresAuth(openAPI);
