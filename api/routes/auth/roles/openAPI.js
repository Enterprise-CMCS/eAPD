import { requiresAuth, jsonResponse, arrayOf } from '../../openAPI/helpers';

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
  '/auth/roles': {
    get: {
      tags: ['Authentication and authorization'],
      summary: 'Gets the list of all roles',
      description: 'Get a list of all roles in the system',
      responses: {
        200: {
          description: 'The list of roles known to the system',
          content: jsonResponse(arrayOf(roleObjectSchema))
        }
      }
    }
  }
};

export default requiresAuth(openAPI);
