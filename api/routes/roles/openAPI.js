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
      description: 'Change which activities an existing role is associated with',
      parameters: [{
        name: 'id',
        in: 'path',
        description: 'The ID of the role to update',
        required: true
      }],
      requestBody: {
        description: 'The new values for the role',
        required: true,
        content: jsonResponse({
          type: 'object',
          properties: {
            activities: {
              description: 'List of activities to associate with this role; this list is definitive and after this operation, only the activities in this list will be associated with the role',
              ...arrayOf({
                type: 'number',
                description: 'An activity ID'
              })
            }
          }
        })
      },
      responses: {
        204: {
          description: 'The update was successful',
        },
        400: {
          description: 'The body of the request is invalid: there are no activities defined, some activities are not numeric, or some activities do not exist',
          content: errorToken
        },
        404: {
          description: 'The role ID does not match any known roles'
        }
      }
    },
    delete: {
      description: 'Remove the associations between a role and activities, and delete the role',
      parameters: [{
        name: 'id',
        in: 'path',
        description: 'The ID of the role to delete',
        required: true
      }],
      responses: {
        204: {
          description: 'The role was deleted successfully'
        },
        404: {
          description: 'The role ID does not match any known roles'
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
