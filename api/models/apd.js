const mongoose = require('mongoose');

const quarterlyFFP = new mongoose.Schema(
  {
    combined: Number,
    contractors: Number,
    inHouse: Number
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
    1: Number,
    2: Number,
    3: Number,
    4: Number
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
      alternatives: String,
      contractorResources: [
        {
          _id: false,
          description: String,
          end: Date,
          hourly: {
            data: {
              type: Map,
              of: new mongoose.Schema(
                {
                  hours: Number,
                  rate: Number
                },
                { _id: false }
              )
            },
            useHourly: Boolean
          },
          name: String,
          start: Date,
          totalCost: Number,
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
              federal: Number,
              state: Number
            },
            other: Number
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
                amt: Number,
                perc: Number
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
      name: String,
      position: String,
      email: String,
      isPrimary: Boolean,
      fte: {
        type: Map,
        of: Number
      },
      hasCosts: Boolean,
      costs: {
        type: Map,
        of: Number
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
          federalActual: Number,
          totalApproved: Number
        },
        mmis: {
          50: {
            federalActual: Number,
            totalApproved: Number
          },
          75: {
            federalActual: Number,
            totalApproved: Number
          },
          90: {
            federalActual: Number,
            totalApproved: Number
          }
        }
      },
      { _id: false }
    )
  },
  previousActivitySummary: String,
  programOverview: String,
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
  ]
});

const APD = mongoose.model('APD', apdSchema);

module.exports = APD;
