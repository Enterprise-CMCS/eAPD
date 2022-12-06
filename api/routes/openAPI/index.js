import affiliations from '../affiliations/openAPI.js';
import apds from '../apds/openAPI.js';
import apdsEvents from '../apds/events/openAPI.js';
import apdsFiles from '../apds/files/openAPI.js';
import authActivities from '../auth/activities/openAPI.js';
import authRoles from '../auth/roles/openAPI.js';
import authStates from '../auth/states/openAPI.js';
import authCertifications from '../auth/certifications/openAPI.js';
import authCertificationsFiles from '../auth/certifications/files/openAPI.js';
import docs from '../docs/openAPI.js';
import me from '../me/openAPI.js';
import roles from '../roles/openAPI.js';
import states from '../states/openAPI.js';
import statesAffiliations from '../states/affilitations/openAPI.js';

import { arrayOf } from './helpers.js';
// ############## OPENAPI IMPORT INSERTION POINT ######################

const openapi = {
  openapi: '3.0.0',
  info: {
    title: 'CMS HITECH APD API',
    description: 'The API for the CMS HITECH APD app.',
    version: '0.0.1' // from package.json
  },
  paths: {
    ...affiliations,
    ...apds,
    ...apdsFiles,
    ...apdsEvents,
    ...authActivities,
    ...authRoles,
    ...authStates,
    ...authCertifications,
    ...authCertificationsFiles,
    ...docs,
    ...me,
    ...roles,
    ...states,
    ...statesAffiliations,

    // ############## OPENAPI PATH INSERTION POINT ######################
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
      singleApd: {
        type: 'object',
        properties: {
          adminCheck: arrayOf({
            type: 'object',
            properties: {
              section: {
                type: 'string',
                description: 'Section name/title of admin check error'
              },
              link: {
                type: 'string',
                description: 'Link to page where admin check error occured'
              },
              fieldDescription: {
                type: 'string',
                description: 'Error message returned from schema'
              }
            }
          }),
          budget: {
            type: 'object',
            properties: {
              years: arrayOf({
                type: 'string'
              }),
              federalShareByFFYQuarter: {
                type: 'object',
                properties: {
                  hitAndHie: {
                    type: 'object',
                    properties: {
                      years: {
                        type: 'object',
                        'x-patternProperties': {
                          '^[0-9]{4}$': {
                            type: 'object',
                            properties: {
                              1: {
                                type: 'object',
                                properties: {
                                  inHouse: {
                                    type: 'number'
                                  },
                                  contractors: {
                                    type: 'number'
                                  },
                                  combined: {
                                    type: 'number'
                                  }
                                }
                              },
                              2: {
                                type: 'object',
                                properties: {
                                  inHouse: {
                                    type: 'number'
                                  },
                                  contractors: {
                                    type: 'number'
                                  },
                                  combined: {
                                    type: 'number'
                                  }
                                }
                              },
                              3: {
                                type: 'object',
                                properties: {
                                  inHouse: {
                                    type: 'number'
                                  },
                                  contractors: {
                                    type: 'number'
                                  },
                                  combined: {
                                    type: 'number'
                                  }
                                }
                              },
                              4: {
                                type: 'object',
                                properties: {
                                  inHouse: {
                                    type: 'number'
                                  },
                                  contractors: {
                                    type: 'number'
                                  },
                                  combined: {
                                    type: 'number'
                                  }
                                }
                              },
                              subtotal: {
                                type: 'object',
                                properties: {
                                  inHouse: {
                                    type: 'number'
                                  },
                                  contractors: {
                                    type: 'number'
                                  },
                                  combined: {
                                    type: 'number'
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      total: {
                        type: 'object',
                        properties: {
                          inHouse: {
                            type: 'number'
                          },
                          contractors: {
                            type: 'number'
                          },
                          combined: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  mmis: {
                    type: 'object',
                    properties: {
                      years: {
                        type: 'object',
                        'x-patternProperties': {
                          '^[0-9]{4}$': {
                            type: 'object',
                            properties: {
                              1: {
                                type: 'object',
                                properties: {
                                  inHouse: {
                                    type: 'number'
                                  },
                                  contractors: {
                                    type: 'number'
                                  },
                                  combined: {
                                    type: 'number'
                                  }
                                }
                              },
                              2: {
                                type: 'object',
                                properties: {
                                  inHouse: {
                                    type: 'number'
                                  },
                                  contractors: {
                                    type: 'number'
                                  },
                                  combined: {
                                    type: 'number'
                                  }
                                }
                              },
                              3: {
                                type: 'object',
                                properties: {
                                  inHouse: {
                                    type: 'number'
                                  },
                                  contractors: {
                                    type: 'number'
                                  },
                                  combined: {
                                    type: 'number'
                                  }
                                }
                              },
                              4: {
                                type: 'object',
                                properties: {
                                  inHouse: {
                                    type: 'number'
                                  },
                                  contractors: {
                                    type: 'number'
                                  },
                                  combined: {
                                    type: 'number'
                                  }
                                }
                              },
                              subtotal: {
                                type: 'object',
                                properties: {
                                  inHouse: {
                                    type: 'number'
                                  },
                                  contractors: {
                                    type: 'number'
                                  },
                                  combined: {
                                    type: 'number'
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      total: {
                        type: 'object',
                        properties: {
                          inHouse: {
                            type: 'number'
                          },
                          contractors: {
                            type: 'number'
                          },
                          combined: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  }
                }
              },
              hie: {
                type: 'object',
                properties: {
                  statePersonnel: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  contractors: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  expenses: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  combined: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  }
                }
              },
              hit: {
                type: 'object',
                properties: {
                  statePersonnel: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  contractors: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  expenses: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  combined: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  }
                }
              },
              mmis: {
                type: 'object',
                properties: {
                  statePersonnel: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  contractors: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  expenses: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  combined: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  }
                }
              },
              hitAndHie: {
                type: 'object',
                properties: {
                  statePersonnel: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  contractors: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  expenses: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  combined: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  }
                }
              },
              mmisByFFP: {
                properties: {
                  '90-10': {
                    type: 'object',
                    'x-patternProperties': {
                      '^([0-9]{4}|total)$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  '75-25': {
                    type: 'object',
                    'x-patternProperties': {
                      '^([0-9]{4}|total)$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  '50-50': {
                    type: 'object',
                    'x-patternProperties': {
                      '^([0-9]{4}|total)$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  '0-100': {
                    type: 'object',
                    'x-patternProperties': {
                      '^([0-9]{4}|total)$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  },
                  combined: {
                    type: 'object',
                    'x-patternProperties': {
                      '^([0-9]{4}|total)$': {
                        type: 'object',
                        properties: {
                          total: {
                            type: 'number'
                          },
                          federal: {
                            type: 'number'
                          },
                          medicaid: {
                            type: 'number'
                          },
                          state: {
                            type: 'number'
                          }
                        }
                      }
                    }
                  }
                }
              },
              combined: {
                type: 'object',
                'x-patternProperties': {
                  '^([0-9]{4}|total)$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              activityTotals: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string'
                    },
                    name: {
                      type: 'string'
                    },
                    fundingSource: {
                      type: 'string'
                    },
                    data: {
                      type: 'object',
                      properties: {
                        combined: {
                          type: 'object',
                          'x-patternProperties': {
                            '^([0-9]{4}|total)$': {
                              type: 'number'
                            }
                          }
                        },
                        contractors: {
                          type: 'object',
                          'x-patternProperties': {
                            '^([0-9]{4}|total)$': {
                              type: 'number'
                            }
                          }
                        },
                        expenses: {
                          type: 'object',
                          'x-patternProperties': {
                            '^([0-9]{4}|total)$': {
                              type: 'number'
                            }
                          }
                        },
                        statePersonnel: {
                          type: 'object',
                          'x-patternProperties': {
                            '^([0-9]{4}|total)$': {
                              type: 'number'
                            }
                          }
                        },
                        otherFunding: {
                          type: 'object',
                          'x-patternProperties': {
                            '^[0-9]{4}$': {
                              type: 'object',
                              properties: {
                                contractors: {
                                  type: 'number'
                                },
                                expenses: {
                                  type: 'number'
                                },
                                statePersonnel: {
                                  type: 'number'
                                },
                                total: {
                                  type: 'number'
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              activities: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9a-zA-Z]{24}$': {
                    $ref: 'activities.json'
                  }
                }
              }
            }
          },
          apd: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
                description: 'APD ID'
              },
              created: {
                type: 'string',
                format: 'date-time',
                description: 'Timestamp of when this APD was created'
              },
              name: {
                type: 'string',
                description:
                  'The APD document name, following SEA naming conventions'
              },
              apdOverview: {
                type: 'object',
                description: 'APD Overview section',
                properties: {
                  programOverview: {
                    type: 'string',
                    description: 'An overview of the overall program'
                  },
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
                  }
                }
              },
              activities: arrayOf({
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Activity name, unique within an APD'
                  },
                  fundingSource: {
                    type: 'string',
                    description:
                      'Federal funding source that applies to this activity'
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
                    description:
                      'The date this activity is planned to be completed'
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
                      hourly: {
                        type: 'object',
                        properties: {
                          data: {
                            'x-patternProperties': {
                              '^[0-9]{4}$': {
                                type: 'object',
                                properties: {
                                  hours: {
                                    type: 'number',
                                    description:
                                      'Number of hours the contractor is expected to work for the given federal fiscal year'
                                  },
                                  rate: {
                                    type: 'number',
                                    description:
                                      'Contractor hourly rate for the given federal fiscal year'
                                  }
                                }
                              }
                            }
                          },
                          useHourly: {
                            type: 'boolean',
                            description:
                              'Whether to use hourly rates for this contractor'
                          }
                        }
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
                      totalCost: {
                        type: 'number',
                        description: 'Contractor resource total cost'
                      },
                      years: {
                        type: 'object',
                        description:
                          'Details of each year the contractor resource will be working',
                        'x-patternProperties': {
                          '^[0-9]{4}$': {
                            type: 'number',
                            description: 'Contractor resource cost of the year'
                          }
                        }
                      }
                    }
                  }),
                  costAllocationNarrative: {
                    type: 'object',
                    properties: {
                      methodology: {
                        type: 'string',
                        description:
                          'Description of the cost allocation methodology'
                      },
                      years: {
                        type: 'object',
                        'x-patternProperties': {
                          '^[0-9]{4}$': {
                            type: 'object',
                            properties: {
                              otherSources: {
                                type: 'string',
                                description:
                                  'Description of other funding sources'
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  costAllocation: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          ffp: {
                            type: 'object',
                            properties: {
                              federal: {
                                type: 'number',
                                description:
                                  'Federal share for this activity for this year, from 0 to 100'
                              },
                              state: {
                                type: 'number',
                                description:
                                  'State share for this activity for this year, from 0 to 100'
                              }
                            }
                          },
                          other: {
                            type: 'number',
                            description:
                              'Other amount (dollars) for this activity for this year'
                          }
                        }
                      }
                    }
                  },
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
                      years: {
                        type: 'object',
                        description: 'Expense entry',
                        'x-patternProperties': {
                          '^[0-9]{4}$': {
                            type: 'number',
                            description:
                              'Expense amount for the given federal fiscal year'
                          }
                        }
                      }
                    }
                  }),
                  outcomes: arrayOf({
                    type: 'object',
                    description: 'Activity outcome',
                    properties: {
                      metrics: arrayOf({
                        type: 'object',
                        properties: {
                          metric: { type: 'string', description: 'metric' }
                        }
                      }),
                      outcome: {
                        type: 'string',
                        description: 'Outcome description'
                      }
                    }
                  }),
                  schedule: arrayOf({
                    type: 'object',
                    description: 'Activity schedule item',
                    properties: {
                      endDate: {
                        type: 'string',
                        format: 'date-time',
                        description:
                          'The date this milestone is planned to be met'
                      },
                      milestone: {
                        type: 'string',
                        description:
                          'The name of the milestone this schedule entry refers to'
                      }
                    }
                  }),
                  standardsAndConditions: {
                    type: 'object',
                    description:
                      'Description of the 11 standards and conditions',
                    properties: {
                      doesNotSupport: {
                        description:
                          'If this activity does not support the standards and conditions, an explanation of why not',
                        type: 'string'
                      },
                      supports: {
                        description:
                          'A description of how this activity supports the standards and conditions',
                        type: 'string'
                      }
                    }
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
                      years: {
                        type: 'object',
                        'x-patternProperties': {
                          '^[0-9]{4}$': {
                            type: 'object',
                            properties: {
                              amt: {
                                type: 'number',
                                description: `State personnel's total cost for the federal fiscal year`
                              },
                              perc: {
                                type: 'number',
                                description:
                                  'Number of FTEs this state personnel will spend on the project for the federal fiscal year'
                              }
                            }
                          }
                        }
                      }
                    }
                  }),
                  quarterlyFFP: {
                    type: 'object',
                    description:
                      'Federal share of this activity cost, by expense type, per fiscal quarter',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        'x-patternProperties': {
                          '^[1-4]$': {
                            type: 'object',
                            properties: {
                              contractors: {
                                type: 'number',
                                description:
                                  'Contractor costs for the given quarter of the given federal fiscal year'
                              },
                              inHouse: {
                                type: 'number',
                                description:
                                  'In-house (state personnel + non-personnel) costs for the given quarter of the given federal fiscal year'
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }),
              assurancesAndCompliances: {
                type: 'object',
                description:
                  'Federal citations that states must assert compliance with. This is a free-form object.'
              },
              proposedBudget: {
                type: 'object',
                description: 'Proposed budget section',
                properties: {
                  incentivePayments: {
                    type: 'object',
                    description: 'APD incentive payments',
                    'x-patternProperties': {
                      '^e[hc](Amt|Ct)$': {
                        type: 'object',
                        'x-patternProperties': {
                          '^[0-9]{4}$': {
                            type: 'object',
                            'x-patternProperties': {
                              '^[1-4]$': {
                                type: 'number',
                                description:
                                  'EH or EC payment or count for the given federal fiscal year and quarter'
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              keyStatePersonnel: {
                type: 'object',
                description: 'Key State Personnel section',
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
                  },
                  keyPersonnel: arrayOf({
                    type: 'object',
                    properties: {
                      costs: {
                        type: 'object',
                        'x-patternProperties': {
                          '^[0-9]{4}$': {
                            type: 'number',
                            description: `Person's cost for the year described by the property name`
                          }
                        }
                      },
                      email: {
                        type: 'string',
                        description: `Person's email address`
                      },
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
                      fte: {
                        type: 'object',
                        'x-patternProperties': {
                          '^[0-9]{0,2}': {
                            type: 'number',
                            description: `FTE equivalent of this person's time dedicated to the project`
                          }
                        }
                      },
                      position: {
                        type: 'string',
                        description: `Person's position`
                      }
                    }
                  })
                }
              },
              previousActivities: {
                type: 'object',
                description: 'Previous Activities section',
                properties: {
                  previousActivitySummary: {
                    type: 'string',
                    description:
                      'High-level outline of activities approved in previous APD'
                  },
                  actualExpenditures: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          hithie: {
                            type: 'object',
                            description: 'HIT- and HIE-funded expenses',
                            properties: {
                              federalActual: {
                                type: 'number',
                                description:
                                  'Total federal share actually spent'
                              },
                              totalApproved: {
                                type: 'number',
                                description:
                                  'Total approved in the previous APD'
                              }
                            }
                          },
                          mmis: {
                            type: 'object',
                            description: 'HIT-funded expenses',
                            properties: {
                              50: {
                                federalActual: {
                                  type: 'number',
                                  description:
                                    'Total federal share actually spent'
                                },
                                totalApproved: {
                                  type: 'number',
                                  description:
                                    'Total approved in the previous APD'
                                }
                              },
                              75: {
                                federalActual: {
                                  type: 'number',
                                  description:
                                    'Total federal share actually spent'
                                },
                                totalApproved: {
                                  type: 'number',
                                  description:
                                    'Total approved in the previous APD'
                                }
                              },
                              90: {
                                federalActual: {
                                  type: 'number',
                                  description:
                                    'Total federal share actually spent'
                                },
                                totalApproved: {
                                  type: 'number',
                                  description:
                                    'Total approved in the previous APD'
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              state: {
                type: 'string',
                description:
                  'Two-letter ID of the state, territory, or district this APD belongs to, lowercase'
              },
              status: {
                type: 'string',
                description: 'Status'
              },
              updated: {
                type: 'string',
                format: 'date-time',
                description: 'Timestamp of the last save to this APD'
              },
              years: arrayOf({
                type: 'string'
              })
            }
          }
        }
      },
      adminCheck: arrayOf({
        type: 'object',
        properties: {
          section: {
            type: 'string',
            description: 'Section name/title of admin check error'
          },
          link: {
            type: 'string',
            description: 'Link to page where admin check error occured'
          },
          fieldDescription: {
            type: 'string',
            description: 'Error message returned from schema'
          }
        }
      }),
      budget: {
        type: 'object',
        properties: {
          years: arrayOf({
            type: 'string'
          }),
          federalShareByFFYQuarter: {
            type: 'object',
            properties: {
              hitAndHie: {
                type: 'object',
                properties: {
                  years: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          1: {
                            type: 'object',
                            properties: {
                              inHouse: {
                                type: 'number'
                              },
                              contractors: {
                                type: 'number'
                              },
                              combined: {
                                type: 'number'
                              }
                            }
                          },
                          2: {
                            type: 'object',
                            properties: {
                              inHouse: {
                                type: 'number'
                              },
                              contractors: {
                                type: 'number'
                              },
                              combined: {
                                type: 'number'
                              }
                            }
                          },
                          3: {
                            type: 'object',
                            properties: {
                              inHouse: {
                                type: 'number'
                              },
                              contractors: {
                                type: 'number'
                              },
                              combined: {
                                type: 'number'
                              }
                            }
                          },
                          4: {
                            type: 'object',
                            properties: {
                              inHouse: {
                                type: 'number'
                              },
                              contractors: {
                                type: 'number'
                              },
                              combined: {
                                type: 'number'
                              }
                            }
                          },
                          subtotal: {
                            type: 'object',
                            properties: {
                              inHouse: {
                                type: 'number'
                              },
                              contractors: {
                                type: 'number'
                              },
                              combined: {
                                type: 'number'
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  total: {
                    type: 'object',
                    properties: {
                      inHouse: {
                        type: 'number'
                      },
                      contractors: {
                        type: 'number'
                      },
                      combined: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              mmis: {
                type: 'object',
                properties: {
                  years: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          1: {
                            type: 'object',
                            properties: {
                              inHouse: {
                                type: 'number'
                              },
                              contractors: {
                                type: 'number'
                              },
                              combined: {
                                type: 'number'
                              }
                            }
                          },
                          2: {
                            type: 'object',
                            properties: {
                              inHouse: {
                                type: 'number'
                              },
                              contractors: {
                                type: 'number'
                              },
                              combined: {
                                type: 'number'
                              }
                            }
                          },
                          3: {
                            type: 'object',
                            properties: {
                              inHouse: {
                                type: 'number'
                              },
                              contractors: {
                                type: 'number'
                              },
                              combined: {
                                type: 'number'
                              }
                            }
                          },
                          4: {
                            type: 'object',
                            properties: {
                              inHouse: {
                                type: 'number'
                              },
                              contractors: {
                                type: 'number'
                              },
                              combined: {
                                type: 'number'
                              }
                            }
                          },
                          subtotal: {
                            type: 'object',
                            properties: {
                              inHouse: {
                                type: 'number'
                              },
                              contractors: {
                                type: 'number'
                              },
                              combined: {
                                type: 'number'
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  total: {
                    type: 'object',
                    properties: {
                      inHouse: {
                        type: 'number'
                      },
                      contractors: {
                        type: 'number'
                      },
                      combined: {
                        type: 'number'
                      }
                    }
                  }
                }
              }
            }
          },
          hie: {
            type: 'object',
            properties: {
              statePersonnel: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              contractors: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              expenses: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              combined: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              }
            }
          },
          hit: {
            type: 'object',
            properties: {
              statePersonnel: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              contractors: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              expenses: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              combined: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              }
            }
          },
          mmis: {
            type: 'object',
            properties: {
              statePersonnel: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              contractors: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              expenses: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              combined: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              }
            }
          },
          hitAndHie: {
            type: 'object',
            properties: {
              statePersonnel: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              contractors: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              expenses: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              combined: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              }
            }
          },
          mmisByFFP: {
            properties: {
              '90-10': {
                type: 'object',
                'x-patternProperties': {
                  '^([0-9]{4}|total)$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              '75-25': {
                type: 'object',
                'x-patternProperties': {
                  '^([0-9]{4}|total)$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              '50-50': {
                type: 'object',
                'x-patternProperties': {
                  '^([0-9]{4}|total)$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              '0-100': {
                type: 'object',
                'x-patternProperties': {
                  '^([0-9]{4}|total)$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              },
              combined: {
                type: 'object',
                'x-patternProperties': {
                  '^([0-9]{4}|total)$': {
                    type: 'object',
                    properties: {
                      total: {
                        type: 'number'
                      },
                      federal: {
                        type: 'number'
                      },
                      medicaid: {
                        type: 'number'
                      },
                      state: {
                        type: 'number'
                      }
                    }
                  }
                }
              }
            }
          },
          combined: {
            type: 'object',
            'x-patternProperties': {
              '^([0-9]{4}|total)$': {
                type: 'object',
                properties: {
                  total: {
                    type: 'number'
                  },
                  federal: {
                    type: 'number'
                  },
                  medicaid: {
                    type: 'number'
                  },
                  state: {
                    type: 'number'
                  }
                }
              }
            }
          },
          activityTotals: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string'
                },
                name: {
                  type: 'string'
                },
                fundingSource: {
                  type: 'string'
                },
                data: {
                  type: 'object',
                  properties: {
                    combined: {
                      type: 'object',
                      'x-patternProperties': {
                        '^([0-9]{4}|total)$': {
                          type: 'number'
                        }
                      }
                    },
                    contractors: {
                      type: 'object',
                      'x-patternProperties': {
                        '^([0-9]{4}|total)$': {
                          type: 'number'
                        }
                      }
                    },
                    expenses: {
                      type: 'object',
                      'x-patternProperties': {
                        '^([0-9]{4}|total)$': {
                          type: 'number'
                        }
                      }
                    },
                    statePersonnel: {
                      type: 'object',
                      'x-patternProperties': {
                        '^([0-9]{4}|total)$': {
                          type: 'number'
                        }
                      }
                    },
                    otherFunding: {
                      type: 'object',
                      'x-patternProperties': {
                        '^[0-9]{4}$': {
                          type: 'object',
                          properties: {
                            contractors: {
                              type: 'number'
                            },
                            expenses: {
                              type: 'number'
                            },
                            statePersonnel: {
                              type: 'number'
                            },
                            total: {
                              type: 'number'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          activities: {
            type: 'object',
            'x-patternProperties': {
              '^[0-9a-zA-Z]{24}$': {
                $ref: 'activities.json'
              }
            }
          }
        }
      },
      apd: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'APD ID'
          },
          created: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp of when this APD was created'
          },
          name: {
            type: 'string',
            description:
              'The APD document name, following SEA naming conventions'
          },
          apdOverview: {
            type: 'object',
            description: 'APD Overview section',
            properties: {
              programOverview: {
                type: 'string',
                description: 'An overview of the overall program'
              },
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
              }
            }
          },
          activities: arrayOf({
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Activity name, unique within an APD'
              },
              fundingSource: {
                type: 'string',
                description:
                  'Federal funding source that applies to this activity'
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
                  hourly: {
                    type: 'object',
                    properties: {
                      data: {
                        'x-patternProperties': {
                          '^[0-9]{4}$': {
                            type: 'object',
                            properties: {
                              hours: {
                                type: 'number',
                                description:
                                  'Number of hours the contractor is expected to work for the given federal fiscal year'
                              },
                              rate: {
                                type: 'number',
                                description:
                                  'Contractor hourly rate for the given federal fiscal year'
                              }
                            }
                          }
                        }
                      },
                      useHourly: {
                        type: 'boolean',
                        description:
                          'Whether to use hourly rates for this contractor'
                      }
                    }
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
                  totalCost: {
                    type: 'number',
                    description: 'Contractor resource total cost'
                  },
                  years: {
                    type: 'object',
                    description:
                      'Details of each year the contractor resource will be working',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'number',
                        description: 'Contractor resource cost of the year'
                      }
                    }
                  }
                }
              }),
              costAllocationNarrative: {
                type: 'object',
                properties: {
                  methodology: {
                    type: 'string',
                    description:
                      'Description of the cost allocation methodology'
                  },
                  years: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          otherSources: {
                            type: 'string',
                            description: 'Description of other funding sources'
                          }
                        }
                      }
                    }
                  }
                }
              },
              costAllocation: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      ffp: {
                        type: 'object',
                        properties: {
                          federal: {
                            type: 'number',
                            description:
                              'Federal share for this activity for this year, from 0 to 100'
                          },
                          state: {
                            type: 'number',
                            description:
                              'State share for this activity for this year, from 0 to 100'
                          }
                        }
                      },
                      other: {
                        type: 'number',
                        description:
                          'Other amount (dollars) for this activity for this year'
                      }
                    }
                  }
                }
              },
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
                  years: {
                    type: 'object',
                    description: 'Expense entry',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'number',
                        description:
                          'Expense amount for the given federal fiscal year'
                      }
                    }
                  }
                }
              }),
              outcomes: arrayOf({
                type: 'object',
                description: 'Activity outcome',
                properties: {
                  metrics: arrayOf({
                    type: 'object',
                    properties: {
                      metric: { type: 'string', description: 'metric' }
                    }
                  }),
                  outcome: {
                    type: 'string',
                    description: 'Outcome description'
                  }
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
                  }
                }
              }),
              standardsAndConditions: {
                type: 'object',
                description: 'Description of the 11 standards and conditions',
                properties: {
                  doesNotSupport: {
                    description:
                      'If this activity does not support the standards and conditions, an explanation of why not',
                    type: 'string'
                  },
                  supports: {
                    description:
                      'A description of how this activity supports the standards and conditions',
                    type: 'string'
                  }
                }
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
                  years: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        properties: {
                          amt: {
                            type: 'number',
                            description: `State personnel's total cost for the federal fiscal year`
                          },
                          perc: {
                            type: 'number',
                            description:
                              'Number of FTEs this state personnel will spend on the project for the federal fiscal year'
                          }
                        }
                      }
                    }
                  }
                }
              }),
              quarterlyFFP: {
                type: 'object',
                description:
                  'Federal share of this activity cost, by expense type, per fiscal quarter',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    'x-patternProperties': {
                      '^[1-4]$': {
                        type: 'object',
                        properties: {
                          contractors: {
                            type: 'number',
                            description:
                              'Contractor costs for the given quarter of the given federal fiscal year'
                          },
                          inHouse: {
                            type: 'number',
                            description:
                              'In-house (state personnel + non-personnel) costs for the given quarter of the given federal fiscal year'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }),
          assurancesAndCompliances: {
            type: 'object',
            description:
              'Federal citations that states must assert compliance with. This is a free-form object.'
          },
          proposedBudget: {
            type: 'object',
            description: 'Proposed budget section',
            properties: {
              incentivePayments: {
                type: 'object',
                description: 'APD incentive payments',
                'x-patternProperties': {
                  '^e[hc](Amt|Ct)$': {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'object',
                        'x-patternProperties': {
                          '^[1-4]$': {
                            type: 'number',
                            description:
                              'EH or EC payment or count for the given federal fiscal year and quarter'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          keyStatePersonnel: {
            type: 'object',
            description: 'Key State Personnel section',
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
              },
              keyPersonnel: arrayOf({
                type: 'object',
                properties: {
                  costs: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{4}$': {
                        type: 'number',
                        description: `Person's cost for the year described by the property name`
                      }
                    }
                  },
                  email: {
                    type: 'string',
                    description: `Person's email address`
                  },
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
                  fte: {
                    type: 'object',
                    'x-patternProperties': {
                      '^[0-9]{0,2}': {
                        type: 'number',
                        description: `FTE equivalent of this person's time dedicated to the project`
                      }
                    }
                  },
                  position: {
                    type: 'string',
                    description: `Person's position`
                  }
                }
              })
            }
          },
          previousActivities: {
            type: 'object',
            description: 'Previous Activities section',
            properties: {
              previousActivitySummary: {
                type: 'string',
                description:
                  'High-level outline of activities approved in previous APD'
              },
              actualExpenditures: {
                type: 'object',
                'x-patternProperties': {
                  '^[0-9]{4}$': {
                    type: 'object',
                    properties: {
                      hithie: {
                        type: 'object',
                        description: 'HIT- and HIE-funded expenses',
                        properties: {
                          federalActual: {
                            type: 'number',
                            description: 'Total federal share actually spent'
                          },
                          totalApproved: {
                            type: 'number',
                            description: 'Total approved in the previous APD'
                          }
                        }
                      },
                      mmis: {
                        type: 'object',
                        description: 'HIT-funded expenses',
                        properties: {
                          50: {
                            federalActual: {
                              type: 'number',
                              description: 'Total federal share actually spent'
                            },
                            totalApproved: {
                              type: 'number',
                              description: 'Total approved in the previous APD'
                            }
                          },
                          75: {
                            federalActual: {
                              type: 'number',
                              description: 'Total federal share actually spent'
                            },
                            totalApproved: {
                              type: 'number',
                              description: 'Total approved in the previous APD'
                            }
                          },
                          90: {
                            federalActual: {
                              type: 'number',
                              description: 'Total federal share actually spent'
                            },
                            totalApproved: {
                              type: 'number',
                              description: 'Total approved in the previous APD'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          state: {
            type: 'string',
            description:
              'Two-letter ID of the state, territory, or district this APD belongs to, lowercase'
          },
          status: {
            type: 'string',
            description: 'Status'
          },
          updated: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp of the last save to this APD'
          },
          years: arrayOf({
            type: 'string'
          })
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Bearer xxx.yyy.zzz'
      }
    }
  }
};

export default openapi;
