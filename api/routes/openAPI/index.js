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
  openapi: '3.0.0',
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
        tags: ['Metadata'],
        summary: 'Gets this document',
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
          fundingSource: {
            type: 'string',
            description: 'Federal funding source that applies to this activity'
          },
          summary: {
            type: 'string',
            description: 'Short summary of the activity'
          },
          description: {
            type: 'string',
            description: 'Activity description'
          },
          alernatives: {
            type: 'string',
            description: 'Alternative considerations for the activity'
          },

          contractorResources: arrayOf({
            type: 'object',
            description: 'Activity contractor resource',
            properties: {
              name: {
                type: 'string',
                description: 'Name of the contractor resource'
              },
              description: {
                type: 'string',
                description: 'Description'
              },
              start: {
                type: 'string',
                format: 'date-time',
                description:
                  'When the contractor resource will begin work; date only'
              },
              end: {
                type: 'string',
                format: 'date-time',
                description:
                  'When the contractor resource will end work; date only'
              },
              years: arrayOf({
                type: 'object',
                description:
                  'Details of each year the contractor resource will be working',
                properties: {
                  year: {
                    type: 'string',
                    description: 'Year this detail applies to'
                  },
                  cost: {
                    type: 'string',
                    description: 'Contractor resource cost of the year'
                  }
                }
              })
            }
          }),
          costAllocationNarrative: {
            type: 'object',
            properties: {
              methodology: {
                type: 'string',
                description: 'Description of the cost allocation methodology'
              },
              otherSources: {
                type: 'string',
                description: 'Description of other funding sources'
              }
            }
          },
          costAllocation: arrayOf({
            type: 'object',
            properties: {
              federalPercent: {
                type: 'number',
                description:
                  'Federal share for this activity for this year, from 0 to 1'
              },
              statePercent: {
                type: 'number',
                description:
                  'State share for this activity for this year, from 0 to 1'
              },
              otherAmount: {
                type: 'number',
                description:
                  'Other amount (dollars) for this activity for this year'
              },
              year: {
                type: 'number',
                description:
                  'Federal fiscal year this cost allocation applies to'
              }
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
              objective: {
                type: 'string',
                description: 'Goal objective'
              }
            }
          }),
          expenses: arrayOf({
            type: 'object',
            description: 'Activity expense',
            properties: {
              category: {
                type: 'string',
                description:
                  'Expense category, such as "Hardware, software, and licensing"'
              },
              description: {
                type: 'string',
                description: 'Short description of the expense'
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
                    type: 'number',
                    description: 'Expense entry amount'
                  }
                }
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
          }),
          standardsAndConditions: {
            type: 'object'
          },
          statePersonnel: arrayOf({
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'Title for the state personnel'
              },
              description: {
                type: 'string',
                description: 'Description of the role'
              },
              years: arrayOf({
                type: 'object',
                properties: {
                  cost: {
                    type: 'number',
                    description: `This personnel's cost for the given federal fiscal year`
                  },
                  fte: {
                    type: 'number',
                    description:
                      'Percent of time this personnel is dedicating to the activity'
                  },
                  year: {
                    type: 'string',
                    description:
                      'Federal fiscal year this information applies to'
                  }
                }
              })
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
          activities: {
            $ref: '#/components/schemas/activity'
          },
          incentivePayments: arrayOf({
            type: 'object',
            properties: {
              year: {},
              q1: { $ref: '#/components/schemas/incentivePaymentQuarter' },
              q2: { $ref: '#/components/schemas/incentivePaymentQuarter' },
              q3: { $ref: '#/components/schemas/incentivePaymentQuarter' },
              q4: { $ref: '#/components/schemas/incentivePaymentQuarter' }
            }
          }),
          narrativeHIE: {
            type: 'string',
            description:
              'Brief description of HIE-funded activities contained in this APD'
          },
          narrativeHIT: {
            type: 'string',
            description:
              'Brief description of HIT-funded activities contained in this APD'
          },
          narrativeMMIS: {
            type: 'string',
            description:
              'Brief description of MMIS-funded activities contained in this APD'
          },
          previousActivityExpenses: arrayOf({
            type: 'object',
            properties: {
              year: {
                type: 'string',
                description: 'Federal fiscal year this information applies to'
              },
              hie: {
                type: 'object',
                description: 'HIE-funded expenses',
                properties: {
                  federalActual: {
                    type: 'number',
                    description: 'Total federal share actually spent'
                  },
                  federalApproved: {
                    type: 'number',
                    description:
                      'Total federal share approved in the previous APD'
                  },
                  stateActual: {
                    type: 'number',
                    description: 'Total state share actually spent'
                  },
                  stateApproved: {
                    type: 'number',
                    description:
                      'Total state share approved in the previous APD'
                  }
                }
              },
              hit: {
                type: 'object',
                description: 'HIT-funded expenses',
                properties: {
                  federalActual: {
                    type: 'number',
                    description: 'Total federal share actually spent'
                  },
                  federalApproved: {
                    type: 'number',
                    description:
                      'Total federal share approved in the previous APD'
                  },
                  stateActual: {
                    type: 'number',
                    description: 'Total state share actually spent'
                  },
                  stateApproved: {
                    type: 'number',
                    description:
                      'Total state share approved in the previous APD'
                  }
                }
              }
            }
          }),
          previousActivitySummary: {
            type: 'string',
            description:
              'High-level outline of activities approved in previous APD'
          },
          programOverview: {
            type: 'string',
            description: 'An overview of the overall program'
          },
          stateProfile: {
            type: 'object',
            description: 'The state profile for this specific APD',
            properties: {
              medicaidDirector: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: `State Medicaid director's name`
                  },
                  email: {
                    type: 'string',
                    description: `State Medicaid director's email address`
                  },
                  phone: {
                    type: 'string',
                    description: `State Medicaid director's phone number`
                  }
                }
              },
              medicaidOffice: {
                type: 'object',
                properties: {
                  address1: {
                    type: 'string',
                    description: 'State Medicaid office address'
                  },
                  address2: {
                    type: 'string',
                    description: 'State Medicaid office address'
                  },
                  city: {
                    type: 'string',
                    description: 'State Medicaid office address city'
                  },
                  state: {
                    type: 'string',
                    description: 'State Medicaid office address state'
                  },
                  zip: {
                    type: 'string',
                    description: 'State Medicaid office address ZIP code'
                  }
                }
              }
            }
          },
          status: {
            type: 'string',
            description: 'Status'
          },
          years: arrayOf({
            type: 'number'
          })
        }
      },
      incentivePaymentQuarter: {
        type: 'object',
        properties: {
          ehPayment: { type: 'number' },
          ehCount: { type: 'number' },
          epPayment: { type: 'number' },
          epCount: { type: 'number' }
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
