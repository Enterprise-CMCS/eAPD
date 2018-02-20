const {
  requiresAuth,
  schema: { arrayOf, jsonResponse, errorToken }
} = require('../openAPI/helpers');

const roleObjectSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      description: 'Role ID'
    },
    name: {
      type: 'string',
      description: 'Role name'
    },
    activities: arrayOf({
      type: 'string',
      description: 'Activity name'
    })
  }
};

const openAPI = {
  '/roles': {
    get: {
      description: 'Get a list of all roles in the system',
      responses: {
        200: {
          description: 'The list of roles known to the system',
          content: jsonResponse(arrayOf(roleObjectSchema))
        }
      }
    }
  },
  '/roles/{id}': {
    put: {
      description: 'Update an existing role in the system',
      parameters: [{
        name: 'id',
        in: 'path',
        description: 'The ID of the role to update',
        required: true
      }, {
        name: 'activities',
        in: 'body',
        description: 'Array of activity IDs. IDs must be numeric, and must be IDs of existing activities',
        required: 'true'
      }],
      responses: {
        204: {
          description: 'The update was successful',
        },
        404: {
          description: 'The user ID does not match any known users',
          content: errorToken
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
