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

const activitySchema = new mongoose.Schema({
  _id: false,
  activityId: {
    type: String,
    default: () => generateKey()
  },
  name: String,
  activityOverview: {},
  activitySchedule: {
    plannedEndDate: Date,
    plannedStartDate: Date
  },
  milestones: [
    {
      _id: false,
      endDate: Date,
      milestone: String
    }
  ],
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
});

module.exports = {
  activitySchema
};
