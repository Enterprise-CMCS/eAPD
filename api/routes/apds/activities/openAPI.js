const {
  requiresAuth,
  schema: { arrayOf, errorToken, jsonResponse }
} = require('../../openAPI/helpers');
const goals = require('./goals/openAPI');

const activityObjectSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      description: 'Activity globally-unique ID'
    },
    name: {
      type: 'string',
      description: 'Activity name, unique within an APD'
    },
    description: {
      type: 'string',
      description: 'Activity description'
    },
    goals: arrayOf({
      type: 'object',
      description: 'Activity goal',
      properties: {
        description: {
          type: 'string',
          description: 'Goal description'
        },
        objectives: arrayOf({
          type: 'string',
          description: 'Goal objective'
        })
      }
    })
  }
};

const openAPI = {
  '/apds/{apdID}/activities': {
    post: {
      description: 'Add a new activity to the specified APD',
      parameters: [
        {
          name: 'apdID',
          in: 'path',
          description: 'The ID of the APD to add this activity to',
          required: true
        }
      ],
      requestBody: {
        description: 'The name for the new APD activity.',
        required: true,
        content: jsonResponse({
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description:
                'The name of the activity. Must be unique within the APD',
              required: true
            }
          }
        })
      },
      responses: {
        200: {
          description: 'The newly-created activity',
          content: jsonResponse(activityObjectSchema)
        },
        400: {
          description:
            'The activity name is invalid or already exists within the APD',
          content: errorToken
        },
        404: {
          description:
            'The specified APD was not found, or the user does not have access to it'
        }
      }
    }
  },

  '/activities/{id}': {
    put: {
      description: 'Update an APD activity in the system',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the APD activity to update',
          required: true
        }
      ],
      requestBody: {
        description: 'The valeus for the new APD activity.',
        required: true,
        content: jsonResponse({
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description:
                'The name of the activity. Must be unique within the APD',
              required: true
            },
            description: {
              type: 'string',
              description: 'The description of the activity'
            }
          }
        })
      },
      responses: {
        200: {
          description: 'The update was successful',
          content: jsonResponse(activityObjectSchema)
        },
        400: {
          description:
            'The activity name is invalid or another activity in the APD already has that name',
          content: errorToken
        },
        404: {
          description:
            'The activity ID does not match any known activities for APDs accessible to the user'
        }
      }
    }
  },

  ...goals
};

module.exports = requiresAuth(openAPI);
