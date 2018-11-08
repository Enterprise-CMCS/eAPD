const pkg = require('../../package.json');

const auth = require('./auth');
const apds = require('../apds/openAPI');
const authActivities = require('../auth/activities/openAPI');
const authRoles = require('../auth/roles/openAPI');
const files = require('../files/openAPI');
const me = require('../me/openAPI');
const users = require('../users/openAPI');
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
    ...files,
    ...me,
    ...users,
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
          plannedEndDate: {
            type: 'string',
            format: 'date-time',
            description: 'The date this activity is planned to begin'
          },
          plannedStartDate: {
            type: 'string',
            format: 'date-time',
            description: 'The date this activity is planned to be completed'
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
              files: arrayOf({
                $ref: '#/components/schemas/file'
              }),
              hourlyData: arrayOf({
                type: 'object',
                properties: {
                  hours: {
                    type: 'number',
                    description: 'Number of hours this contractor works/ed'
                  },
                  rates: {
                    type: 'number',
                    description: 'Hourly rate for this contractor'
                  },
                  year: {
                    type: 'string',
                    description: 'Year this hourly rate applies to'
                  }
                }
              }),
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
              useHourly: {
                type: 'boolean',
                description: 'Whether to use hourly rates for this contractor'
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
          files: arrayOf({
            $ref: '#/components/schemas/file'
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
              endDate: {
                type: 'string',
                format: 'date-time',
                description: 'The date this milestone is planned to be met'
              },
              milestone: {
                type: 'string',
                description:
                  'The name of the milestone this schedule entry refers to'
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
              keyPersonnel: {
                type: 'boolean',
                description: '"Key Personnel" designation'
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
          }),
          quarterlyFFP: arrayOf({
            type: 'object',
            description:
              'Federal share of this activity cost, by expense type, per fiscal quarter',
            properties: {
              q1: {
                type: 'object',
                description: 'First fiscal quarter FFP',
                properties: {
                  combined: {
                    type: 'number',
                    description:
                      'Percent of the federal share of the FFY total to be paid in this quarter'
                  },
                  contractors: {
                    type: 'number',
                    description:
                      'Percent of the federal share of the FFY total contractor expense to be paid in this quarter'
                  },
                  state: {
                    type: 'number',
                    description:
                      'Percent of the federal share of the FFY total state expense to be paid in this quarter'
                  }
                }
              },
              q2: {
                type: 'object',
                description: 'Second fiscal quarter FFP',
                properties: {
                  combined: {
                    type: 'number',
                    description:
                      'Percent of the federal share of the FFY total to be paid in this quarter'
                  },
                  contractors: {
                    type: 'number',
                    description:
                      'Percent of the federal share of the FFY total contractor expense to be paid in this quarter'
                  },
                  state: {
                    type: 'number',
                    description:
                      'Percent of the federal share of the FFY total state expense to be paid in this quarter'
                  }
                }
              },
              q3: {
                type: 'object',
                description: 'Third fiscal quarter FFP',
                properties: {
                  combined: {
                    type: 'number',
                    description:
                      'Percent of the federal share of the FFY total to be paid in this quarter'
                  },
                  contractors: {
                    type: 'number',
                    description:
                      'Percent of the federal share of the FFY total contractor expense to be paid in this quarter'
                  },
                  state: {
                    type: 'number',
                    description:
                      'Percent of the federal share of the FFY total state expense to be paid in this quarter'
                  }
                }
              },
              q4: {
                type: 'object',
                description: 'Fourth fiscal quarter FFP',
                properties: {
                  combined: {
                    type: 'number',
                    description:
                      'Percent of the federal share of the FFY total to be paid in this quarter'
                  },
                  contractors: {
                    type: 'number',
                    description:
                      'Percent of the federal share of the FFY total contractor expense to be paid in this quarter'
                  },
                  state: {
                    type: 'number',
                    description:
                      'Percent of the federal share of the FFY total state expense to be paid in this quarter'
                  }
                }
              },
              year: {
                type: 'number',
                description: 'Federal fiscal year this quarterly FFP applies to'
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
          activities: arrayOf({
            $ref: '#/components/schemas/activity'
          }),
          federalCitations: {
            type: 'object',
            description:
              'Federal citations that states must assert compliance with. This is a free-form object.'
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
          keyPersonnel: arrayOf({
            type: 'object',
            properties: {
              id: { type: 'number' },
              costs: arrayOf({
                type: 'object',
                properties: {
                  cost: {
                    type: 'number',
                    description: `Person's cost for the given year`
                  },
                  year: {
                    type: 'string',
                    description:
                      'Federal fiscal year this cost is attributable to'
                  }
                }
              }),
              email: { type: 'string', description: `Person's email address` },
              hasCosts: {
                type: 'boolean',
                description:
                  'Whether the person has costs attributable to the project'
              },
              isPrimary: {
                type: 'boolean',
                description:
                  'Whether the person is the primary point of contact for the APD'
              },
              name: { type: 'string', description: `Person's name` },
              percentTime: {
                type: 'number',
                description: `Percent of this person's time dedicated to the project, as a faction between 0 and 1.`,
                minimum: 0,
                maximum: 1
              },
              position: { type: 'string', description: `Person's position` }
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
              },
              mmis: {
                type: 'object',
                description: 'HIT-funded expenses',
                properties: {
                  federal90Actual: {
                    type: 'number',
                    description: 'Total federal 90% share actually spent'
                  },
                  federal90Approved: {
                    type: 'number',
                    description:
                      'Total federal 90% share approved in the previous APD'
                  },
                  state10Actual: {
                    type: 'number',
                    description: 'Total state 10% share actually spent'
                  },
                  state10Approved: {
                    type: 'number',
                    description:
                      'Total state 10% share approved in the previous APD'
                  },
                  federal75Actual: {
                    type: 'number',
                    description: 'Total federal 75% share actually spent'
                  },
                  federal75Approved: {
                    type: 'number',
                    description:
                      'Total federal 75% share approved in the previous APD'
                  },
                  state25Actual: {
                    type: 'number',
                    description: 'Total state 25% share actually spent'
                  },
                  state25Approved: {
                    type: 'number',
                    description:
                      'Total state 25% share approved in the previous APD'
                  },
                  federal50Actual: {
                    type: 'number',
                    description: 'Total federal 50% share actually spent'
                  },
                  federal50Approved: {
                    type: 'number',
                    description:
                      'Total federal 50% share approved in the previous APD'
                  },
                  state50Actual: {
                    type: 'number',
                    description: 'Total state 50% share actually spent'
                  },
                  state50Approved: {
                    type: 'number',
                    description:
                      'Total state 50% share approved in the previous APD'
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
      file: {
        type: 'object',
        description: 'Files associated with the activity',
        properties: {
          id: {
            type: 'number'
          },
          size: {
            type: 'number',
            description: 'Size of the file, in bytes'
          },
          metadata: {
            type: 'object',
            description:
              'The properties from any metadata supplied when the file was uploaded will be added to the file object'
          }
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
