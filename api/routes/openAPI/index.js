const pkg = require('../../package.json');

const auth = require('./auth');
const apds = require('../apds/openAPI');
const authActivities = require('../auth/activities/openAPI');
const authRoles = require('../auth/roles/openAPI');
const me = require('../me/openAPI');
const users = require('../users/openAPI');
const states = require('../states/openAPI');
const { arrayOf } = require('./helpers').schema;

module.exports = {
  openapi: '3.0',
  info: {
    title: 'CMS HITECH APD API',
    description: 'The API for the CMS HITECH APD app.',
    version: pkg.version
  },
  paths: {
    ...apds,
    ...auth,
    ...authActivities,
    ...authRoles,
    ...me,
    ...users,
    ...states,
    '/open-api': {
      get: {
        description: 'Returns this document',
        responses: {
          200: {
            description: 'This OpenAPI document'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      activity: {
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
          expenses: arrayOf({
            type: 'object',
            description: 'Activity expense',
            properties: {
              name: {
                type: 'string',
                description: 'Expense name'
              },
              entries: arrayOf({
                type: 'object',
                description: 'Expense entry',
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
            }
          }),
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
          }),
          schedule: arrayOf({
            type: 'object',
            description: 'Activity schedule item',
            properties: {
              actualEnd: {
                type: 'string',
                format: 'date-time',
                description:
                  'The actual date the milestone was completed, if known'
              },
              actualStart: {
                type: 'string',
                format: 'date-time',
                description:
                  'The actual date the milestone was started, if known'
              },
              milestone: {
                type: 'string',
                description:
                  'The name of the milestone this schedule entry refers to'
              },
              plannedEnd: {
                type: 'string',
                format: 'date-time',
                description: 'The planned milestone completion date'
              },
              plannedStart: {
                type: 'string',
                format: 'date-time',
                description: 'The planned milestone start date'
              },
              status: {
                type: 'string',
                description: 'The status of the milestone'
              }
            }
          })
        }
      },
      apd: {
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
            type: 'string',
            format: 'date-time',
            description: 'Creation date'
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'Last updated date'
          },
          approved_at: {
            type: 'string',
            format: 'date-time',
            description: 'Approval date'
          },
          activities: {
            $ref: '#/components/schemas/activity'
          }
        }
      },
      state: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description:
              'State, territory, or district ID (2-letter abbreviation, lowercase)'
          },
          medicaid_office: {
            type: 'object',
            description:
              'Address of the state, territory, or district Medicaid office',
            properties: {
              address: {
                type: 'string',
                description: 'Street address'
              },
              city: {
                type: 'string',
                description: 'City'
              },
              zip: {
                type: 'string',
                description: 'ZIP code'
              }
            }
          },
          name: {
            type: 'string',
            description: 'State, territory, or district name'
          },
          program_vision: {
            type: 'string',
            description: 'Program vision statement'
          },
          program_benefits: {
            type: 'string',
            description: 'Planned benefits of the program'
          },
          state_pocs: arrayOf({
            type: 'object',
            description:
              'A list of points of contact for the state, territory, or district',
            properties: {
              name: { type: 'string', description: `Point of contact's name` },
              position: {
                type: 'string',
                description: `Point of contact's position in the state, territory, or district`
              },
              email: {
                type: 'string',
                description: `Point of contact's email address`
              }
            }
          })
        }
      }
    },
    securitySchemes: {
      sessionCookie: {
        type: 'apiKey',
        in: 'cookie',
        name: 'session'
      }
    }
  }
};
