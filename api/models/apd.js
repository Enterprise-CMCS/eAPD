const mongoose = require('mongoose');

const quarterlyFFP = new mongoose.Schema(
  {
    combined: {
      type: Number,
      default: 0
    },
    contractors: {
      type: Number,
      default: 0
    },
    inHouse: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

const federalCitation = new mongoose.Schema(
  {
    title: String,
    checked: {
      type: Boolean,
      default: null,
      validate: {
        validator: v => {
          return !null;
        },
        message: 'Choose an option for federal citation'
      }
    },
    explanation: String
  },
  { _id: false }
);

const incentivePayment = new mongoose.Schema(
  {
    1: {
      type: Number,
      default: 0
    },
    2: {
      type: Number,
      default: 0
    },
    3: {
      type: Number,
      default: 0
    },
    4: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

const apdSchema = new mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'archived', 'submitted', 'approved'],
    required: true
  },
  stateId: {
    type: String,
    required: true
  },
  activities: [
    {
      _id: false,
      alternatives: {
        type: String,
        validate: {
          validator(v) {
            return v.trim().length > 0;
          },
          message: 'Provide a statement of alternative considerations and supporting justification'
        },
      },
      contractorResources: [
        {
          _id: false,
          description: {
            type: String,
            description: 'Must include a contractor resource description'
          },
          end: Date,
          hourly: {
            data: {
              type: Map,
              of: new mongoose.Schema(
                {
                  hours: {
                    type: Number,
                    default: 0
                  },
                  rate: {
                    type: Number,
                    default: 0
                  }
                },
                { _id: false }
              )
            },
            useHourly: Boolean
          },
          name: String,
          start: Date,
          totalCost: {
            type: Number,
            default: 0
          },
          years: {
            type: Map,
            of: Number
          }
        }
      ],
      costAllocation: {
        type: Map,
        of: new mongoose.Schema(
          {
            ffp: {
              federal: {
                type: Number,
                default: 0
              },
              state: {
                type: Number,
                default: 0
              }
            },
            other: {
              type: Number,
              default: 0
            }
          },
          { _id: false }
        )
      },
      costAllocationNarrative: {
        methodology: String,
        years: {
          type: Map,
          of: new mongoose.Schema(
            {
              otherSources: String
            },
            { _id: false }
          )
        }
      },
      description: String,
      expenses: [
        {
          _id: false,
          description: String,
          category: String,
          years: {
            type: Map,
            of: Number
          }
        }
      ],
      fundingSource: {
        type: String,
        enum: ['HIE', 'HIT', 'MMIS', null],
        validate: {
          validator(v) {
            return v !== null;
          },
          message: "Please select a funding source"
        }
      },
      name: String,
      outcomes: [
        {
          _id: false,
          outcome: String,
          metrics: [
            {
              _id: false,
              metric: String
            }
          ]
        }
      ],
      plannedEndDate: Date,
      plannedStartDate: Date,
      schedule: [
        {
          _id: false,
          endDate: Date,
          milestone: String
        }
      ],
      standardsAndConditions: {
        doesNotSupport: String,
        supports: String
      },
      statePersonnel: [
        {
          _id: false,
          title: String,
          description: String,
          years: {
            type: Map,
            of: new mongoose.Schema(
              {
                amt: {
                  type: Number,
                  default: 0
                },
                perc: {
                  type: Number,
                  default: 0
                }
              },
              { _id: false }
            )
          }
        }
      ],
      summary: String,
      quarterlyFFP: {
        type: Map,
        of: new mongoose.Schema(
          {
            1: quarterlyFFP,
            2: quarterlyFFP,
            3: quarterlyFFP,
            4: quarterlyFFP
          },
          { _id: false }
        )
      }
    }
  ],
  federalCitations: {
    procurement: [federalCitation],
    recordsAccess: [federalCitation],
    softwareRights: [federalCitation],
    security: [federalCitation]
  },
  incentivePayments: {
    ehAmt: {
      type: Map,
      of: incentivePayment
    },
    ehCt: {
      type: Map,
      of: incentivePayment
    },
    epAmt: {
      type: Map,
      of: incentivePayment
    },
    epCt: {
      type: Map,
      of: incentivePayment
    }
  },
  keyPersonnel: [
    {
      _id: false,
      name: {
        type: String,
        validate: {
          validator: v => {
            return v.trim().length > 0;
          },
          message: 'Provide a key personnel name'
        }
      },
      position: String,
      email: String,
      isPrimary: Boolean,
      fte: {
        type: Map,
        of: {
          type: Number,
          default: 0
        }
      },
      hasCosts: Boolean,
      costs: {
        type: Map,
        of: {
          type: Number,
          default: 0
        }
      }
    }
  ],
  narrativeHIE: String,
  narrativeHIT: String,
  narrativeMMIS: String,
  previousActivityExpenses: {
    type: Map,
    of: new mongoose.Schema(
      {
        hithie: {
          federalActual: {
            type: Number,
            default: 0
          },
          totalApproved: {
            type: Number,
            default: 0
          }
        },
        mmis: {
          50: {
            federalActual: {
              type: Number,
              default: 0
            },
            totalApproved: {
              type: Number,
              default: 0
            }
          },
          75: {
            federalActual: {
              type: Number,
              default: 0
            },
            totalApproved: {
              type: Number,
              default: 0
            }
          },
          90: {
            federalActual: {
              type: Number,
              default: 0
            },
            totalApproved: {
              type: Number,
              default: 0
            }
          }
        }
      },
      { _id: false }
    )
  },
  previousActivitySummary: String,
  programOverview: {
    type: String,
    validate: {
      validator: v => {
        return v.trim().length > 0;
      },
      message: 'Please provide a program overview'
    }
  },
  stateProfile: {
    medicaidDirector: {
      name: String,
      email: String,
      phone: String
    },
    medicaidOffice: {
      address1: String,
      address2: String,
      city: String,
      state: String,
      zip: String
    }
  },
  years: [
    {
      _id: false,
      type: String,
      validate: {
        validator: v => {
          const re = /^[0-9]{4}$/;
          return v == null || re.test(v);
        },
        message: 'Provided year is invalid.'
      }
    }
  ],
  metadata: {
    incomplete: Number,
    todo: [],
    recents: []
  }
});

const APD = mongoose.model('APD', apdSchema);

module.exports = APD;
