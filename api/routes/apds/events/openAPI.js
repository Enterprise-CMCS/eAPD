const {
  requiresAuth,
  schema: { jsonResponse }
} = require('../../openAPI/helpers');

const openAPI = {

  '/apds/{id}/events': {
    post: {
      tags: ['APDs', 'events'],
      summary: 'Log an event performed on an APD',
      description:
        'Posts an event, associates it with a given APD, and stores any provided metadata.',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the apd the event is associated with',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                eventType: {
                  type: 'string',
                  description: 'the type of the event performed'
                },
                metadata: {
                  type: 'object',
                  description: 'anny additional metadata to add to the log'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'The status of the event being logged',
          content: jsonResponse({
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                description: 'whether the event was successfully logged'
              }
            }
          })
        },
        400: {
          description: 'The apd ID does not match any known apds'
        },
        403: {
          description: 'The apd ID does not match any known apds for the user'
        }
      }
    }
  }
};

module.exports = {
  ...requiresAuth(openAPI),
};
