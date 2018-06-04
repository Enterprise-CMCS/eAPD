const {
  requiresAuth,
  schema: { errorToken, jsonResponse }
} = require('../../openAPI/helpers');

const activitySubParts = [
  'contractorResources',
  'costAllocation',
  'expenses',
  'goals',
  'schedule',
  'statePersonnel'
];

const openAPI = {
  '/apds/{id}/activities': {
    post: {
      description: 'Add a new activity to the specified APD',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'The ID of the APD to add this activity to',
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      requestBody: {
        required: true,
        content: jsonResponse({
          $ref: '#/components/schemas/activity'
        })
      },
      responses: {
        200: {
          description: 'The newly-created activity',
          content: jsonResponse({ $ref: '#/components/schemas/activity' })
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
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      requestBody: {
        required: true,
        content: jsonResponse({
          $ref: '#/components/schemas/activity'
        })
      },
      responses: {
        200: {
          description: 'The update was successful',
          content: jsonResponse({ $ref: '#/components/schemas/activity' })
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
  }
};

activitySubParts.forEach(sub => {
  openAPI[`/activities/{id}/${sub}`] = {
    put: {
      description: `Set the ${sub} for a specific activity`,
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: `The ID of the activity to set the ${sub} for`,
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      requestBody: {
        description: `The new ${sub}`,
        required: true,
        content: jsonResponse({
          $ref: `#/components/schemas/activity/properties/${sub}`
        })
      },
      responses: {
        200: {
          description: 'The updated activity',
          content: jsonResponse({ $ref: '#/components/schemas/activity' })
        },
        400: {
          description: `Invalid ${sub}`,
          content: errorToken
        },
        404: {
          description:
            'The specified activity was not found, or the user does not have access to it'
        }
      }
    }
  };
});

module.exports = requiresAuth(openAPI);
