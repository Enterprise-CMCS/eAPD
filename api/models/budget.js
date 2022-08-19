const mongoose = require('mongoose');

const shareByCostType = new mongoose.Schema(
  {
    inHouse: Number,
    contractors: Number,
    combined: Number
  },
  { _id: false }
);

const shareByCostTypeByQuarter = new mongoose.Schema(
  {
    1: shareByCostType,
    2: shareByCostType,
    3: shareByCostType,
    4: shareByCostType,
    subtotal: shareByCostType
  },
  { _id: false }
);

const fedStateSplit = new mongoose.Schema(
  {
    total: Number,
    federal: Number,
    medicaid: Number,
    state: Number
  },
  { _id: false }
);

const fedStateSplitByCost = new mongoose.Schema(
  {
    statePersonnel: {
      years: {
        type: Map,
        of: fedStateSplit
      },
      total: fedStateSplit
    },
    contractors: {
      years: {
        type: Map,
        of: fedStateSplit
      },
      total: fedStateSplit
    },
    expenses: {
      years: {
        type: Map,
        of: fedStateSplit
      },
      total: fedStateSplit
    },
    combined: {
      years: {
        type: Map,
        of: fedStateSplit
      },
      total: fedStateSplit
    }
  },
  { _id: false }
);

const costPercentByCostType = new mongoose.Schema(
  {
    inHouse: {
      dollars: Number,
      percent: Number
    },
    contractors: {
      dollars: Number,
      percent: Number
    },
    combined: {
      dollars: Number,
      percent: Number
    }
  },
  { _id: false }
);

const costPercentByCostTypeByQuarter = new mongoose.Schema(
  {
    1: costPercentByCostType,
    2: costPercentByCostType,
    3: costPercentByCostType,
    4: costPercentByCostType,
    subtotal: costPercentByCostType
  },
  { _id: false }
);

const activities = new mongoose.Schema({
  costsByFFY: {
    years: {
      type: Map,
      of: fedStateSplit
    },
    total: fedStateSplit
  },
  quarterlyFFP: {
    years: {
      type: Map,
      of: costPercentByCostTypeByQuarter
    },
    total: shareByCostType
  }
});

const budgetSchema = new mongoose.Schema({
  federalShareByFFYQuarter: {
    hitAndHie: {
      year: {
        type: Map,
        of: shareByCostTypeByQuarter
      },
      total: shareByCostType
    },
    mmis: {
      year: {
        type: Map,
        of: shareByCostTypeByQuarter
      },
      total: shareByCostType
    }
  },
  hie: fedStateSplitByCost,
  hit: fedStateSplitByCost,
  mmis: fedStateSplitByCost,
  hitAndHie: fedStateSplitByCost,
  mmisByFFP: {
    '90-10': {
      years: {
        type: Map,
        of: fedStateSplit
      },
      total: fedStateSplit
    },
    '75-25': {
      years: {
        type: Map,
        of: fedStateSplit
      },
      total: fedStateSplit
    },
    '50-50': {
      years: {
        type: Map,
        of: fedStateSplit
      },
      total: fedStateSplit
    },
    '0-100': {
      years: {
        type: Map,
        of: fedStateSplit
      },
      total: fedStateSplit
    },
    combined: {
      years: {
        type: Map,
        of: fedStateSplit
      },
      total: fedStateSplit
    }
  },
  combined: {
    years: {
      type: Map,
      of: fedStateSplit
    },
    total: fedStateSplit
  },
  activityTotals: [
    {
      id: String,
      name: String,
      fundingSource: {
        type: String,
        enum: ['HIT', 'HIE', 'MMIS']
      },
      data: {
        combined: {
          years: {
            type: Map,
            of: Number
          },
          total: Number
        },
        contractors: {
          years: {
            type: Map,
            of: Number
          },
          total: Number
        },
        expenses: {
          years: {
            type: Map,
            of: Number
          },
          total: Number
        },
        statePersonnel: {
          years: {
            type: Map,
            of: Number
          },
          total: Number
        },
        otherFunding: {
          type: Map,
          of: new mongoose.Schema(
            {
              contractors: Number,
              expenses: Number,
              statePersonnel: Number,
              total: Number
            },
            { _id: false }
          )
        }
      }
    }
  ],
  activities: {
    type: Map,
    of: activities
  }
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
