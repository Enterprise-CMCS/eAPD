import { requiresAuth, jsonResponse, arrayOf } from '../../openAPI/helpers.js';

const openAPI = {
  '/auth/activities': {
    get: {
      tags: ['Authentication and authorization'],
      summary: 'Gets the list of all activities',
      description: 'Get a list of all activities in the system',
      responses: {
        200: {
          description: 'The list of activities known to the system',
          content: jsonResponse(
            arrayOf({
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  description: 'Activity ID'
                },
                name: {
                  type: 'string',
                  description: 'Activity name'
                }
              }
            })
          )
        }
      }
    }
  }
};

export default requiresAuth(openAPI);
