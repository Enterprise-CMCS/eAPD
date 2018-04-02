const {
  requiresAuth,
  schema: { arrayOf, errorToken, jsonResponse }
} = require('../../../openAPI/helpers');

const openAPI = {
  '/activities/{id}/schedule': {
    put: {
      description: 'Set the schedule for a specific activity',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the activity to set the schedule for',
          required: true
        }
      ],
      requestBody: {
        description: 'The new schedule',
        required: true,
        content: jsonResponse(
          arrayOf({
            type: 'object',
            properties: {
              milestone: {
                type: 'string',
                description: 'The milestone this schedule entry applies to'
              },
              status: {
                type: 'string',
                description: 'The current status of the milestone'
              },
              plannedStart: {
                type: 'string',
                description:
                  'The planned start date for the milestone as an ISO-8601 date string.'
              },
              actualStart: {
                type: 'string',
                description:
                  'The actual start date for the milestone, if known, as an ISO-8601 date string.'
              },
              plannedEnd: {
                type: 'string',
                description:
                  'The planned end date for the milestone as an ISO-8601 date string.'
              },
              actualEnd: {
                type: 'string',
                description:
                  'The actual end date for the milestone, if known, as an ISO-8601 date string.'
              }
            }
          })
        )
      },
      responses: {
        200: {
          description: 'The updated activity',
          content: jsonResponse({ $ref: '#/components/schemas/activity' })
        },
        400: {
          description: 'The schedule entries are invalid (e.g., not an array)',
          content: errorToken
        },
        404: {
          description:
            'The specified activity was not found, or the user does not have access to it'
        }
      }
    }
  }
};

module.exports = requiresAuth(openAPI);
