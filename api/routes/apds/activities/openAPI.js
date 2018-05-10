const {
  requiresAuth,
  schema: { arrayOf, errorToken, jsonResponse }
} = require('../../openAPI/helpers');

const activitySubParts = {
  approaches: {
    description: {
      type: 'string',
      description: 'The description of this approach'
    },
    alternatives: {
      type: 'string',
      description: 'The alternatives considered for this approach'
    },
    explanation: {
      type: 'string',
      description:
        'An explanation of why this approach was chosen over the alternatives'
    }
  },
  contractorResources: {
    name: {
      type: 'string',
      description: 'The name of the contract entity'
    },
    description: {
      type: 'string',
      description: 'A description'
    },
    start: {
      type: 'string',
      description: 'The start date as an ISO-8601 date string'
    },
    end: {
      type: 'string',
      description: 'The end date as an ISO-8601 date string'
    },
    years: arrayOf({
      cost: {
        type: 'number',
        description: 'The cost of this contractor resource for the given year'
      },
      year: {
        type: 'number',
        description: 'The year this cost applies to'
      }
    })
  },
  costAllocation: {
    entity: {
      type: 'string',
      description: 'The name of the entity providing funding'
    },
    percent_of_cost: {
      type: 'number',
      description: 'The percentage of the total cost this entity is funding'
    }
  },
  expenses: {
    name: {
      type: 'string',
      description:
        'The name of this expense. Expense is not added if name is missing.'
    },
    entries: arrayOf({
      type: 'object',
      properties: {
        year: {
          type: 'string',
          description: 'Expense entry year'
        },
        amount: {
          type: 'decimal',
          description: 'Expense entry amount'
        },
        description: {
          type: 'string',
          description: 'Expense entry description'
        }
      }
    })
  },
  goals: {
    description: {
      type: 'string',
      description:
        'The description of this goal. Goal is not added if description is missing.'
    },
    objectives: arrayOf({
      type: 'object',
      properties: {
        description: {
          type: 'string',
          description:
            'The description of the objective associated with this goal'
        }
      }
    })
  },
  schedule: {
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
  },
  statePersonnel: {
    title: {
      type: 'string',
      description: 'The job title of this state personnel'
    },
    description: {
      type: 'string',
      description: 'A description'
    },
    years: arrayOf({
      cost: {
        type: 'number',
        description: 'The cost of this personnel for the given year'
      },
      fte: {
        type: 'number',
        description:
          'FTE time this personnel resource will be spending on this work for the given year'
      },
      year: {
        type: 'number',
        description: 'The year that the cost and FTE apply to'
      }
    })
  }
};

const requestBody = {
  required: true,
  content: jsonResponse({
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the activity. Must be unique within the APD',
        required: true
      },
      description: {
        type: 'string',
        description: 'Description of the activity'
      },
      otherFundingSources: {
        type: 'string',
        description: 'Description of other funding sources'
      },
      approaches: arrayOf({
        type: 'object',
        properties: activitySubParts.approaches
      }),
      contractorResrouces: arrayOf({
        type: 'object',
        properties: activitySubParts.contractorResources
      }),
      costAllocation: arrayOf({
        type: 'object',
        properties: activitySubParts.costAllocation
      }),
      expenses: arrayOf({
        type: 'object',
        properties: activitySubParts.expenses
      }),
      goals: arrayOf({
        type: 'object',
        properties: activitySubParts.goals
      }),
      schedule: arrayOf({
        type: 'object',
        properties: activitySubParts.schedule
      }),
      statePersonnel: arrayOf({
        type: 'object',
        properties: activitySubParts.statePersonnel
      })
    }
  })
};

const openAPI = {
  '/apds/{id}/activities': {
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
      requestBody,
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
          required: true
        }
      ],
      requestBody,
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

Object.keys(activitySubParts).forEach(sub => {
  openAPI[`/activities/{id}/${sub}`] = {
    put: {
      description: `Set the ${sub} for a specific activity`,
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: `The ID of the activity to set the ${sub} for`,
          required: true
        }
      ],
      requestBody: {
        description: `The new ${sub}`,
        required: true,
        content: jsonResponse(
          arrayOf({
            type: 'object',
            properties: activitySubParts[sub]
          })
        )
      },
      responses: {
        200: {
          description: 'The updated activity',
          content: jsonResponse({ $ref: '#/components/schemas/activity ' })
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
