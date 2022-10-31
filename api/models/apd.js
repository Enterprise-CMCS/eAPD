require('./budget');
const mongoose = require('mongoose');
const { generateKey } = require('@cms-eapd/common');

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
      default: null
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
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
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
  name: {
    type: String,
    required: true
  },
  years: [
    {
      _id: false,
      type: String,
      required: true,
      validate: {
        validator: v => {
          const re = /^[0-9]{4}$/;
          return v == null || re.test(v);
        },
        message: 'Provided year is invalid.'
      }
    }
  ],
  apdOverview: {
    programOverview: String,
    narrativeHIT: String,
    narrativeHIE: String,
    narrativeMMIS: String
  },
  keyStatePersonnel: {
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
    },
    keyPersonnel: [
      {
        _id: false,
        name: String,
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
    ]
  },
  previousActivities: {
    previousActivitySummary: {
      type: String,
      required: true
    },
    actualExpenditures: {
      type: Map,
      required: true,
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
    }
  },
  activities: [
    {
      _id: false,
      activityId: {
        type: String,
        default: () => generateKey()
      },
      alternatives: String,
      contractorResources: [
        {
          _id: false,
          description: String,
          end: Date,
          hourly: {
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
          useHourly: Boolean,
          name: String,
          start: Date,
          totalCost: {
            type: Number
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
        enum: ['HIE', 'HIT', 'MMIS', null]
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
  // Currently there are no inputs in activity schedule summary
  // but this should be used to follow the sections pattern
  // activityScheduleSummary: {},
  proposedBudget: {
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
    }
  },
  assurancesAndCompliances: {
    procurement: [federalCitation],
    recordsAccess: [federalCitation],
    softwareRights: [federalCitation],
    security: [federalCitation]
  },
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Budget',
    default: null
  }
});

const APD = mongoose.model('APD', apdSchema);

module.exports = APD;
