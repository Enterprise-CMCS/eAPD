const {
  requiresAuth,
  schema: { arrayOf, jsonResponse }
} = require('../openAPI/helpers');

const openAPI = {
  '/apds': {
    get: {
      description: 'Get a list of all apds associated with requesting user',
      responses: {
        200: {
          description: 'The list of a user’s apds',
          content: jsonResponse(
            arrayOf({
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
            })
          )
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
