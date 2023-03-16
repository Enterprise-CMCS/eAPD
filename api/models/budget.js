import mongoose from 'mongoose';

export const discriminatorOptions = { discriminatorKey: 'type' };

export const shareByCostType = new mongoose.Schema(
  {
    inHouse: Number,
    contractors: Number,
    combined: Number
  },
  { _id: false }
);

export const shareByCostTypeByQuarter = new mongoose.Schema(
  {
    1: shareByCostType,
    2: shareByCostType,
    3: shareByCostType,
    4: shareByCostType,
    subtotal: shareByCostType
  },
  { _id: false }
);

export const fedStateSplit = new mongoose.Schema(
  {
    total: Number,
    federal: Number,
    medicaid: Number,
    state: Number
  },
  { _id: false }
);

export const fedStateSplitByCost = new mongoose.Schema(
  {
    statePersonnel: {
      type: Map,
      of: fedStateSplit
    },
    keyStatePersonnel: {
      type: Map,
      of: fedStateSplit
    },
    contractors: {
      type: Map,
      of: fedStateSplit
    },
    expenses: {
      type: Map,
      of: fedStateSplit
    },
    combined: {
      type: Map,
      of: fedStateSplit
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

export const costPercentByCostTypeByQuarter = new mongoose.Schema(
  {
    1: costPercentByCostType,
    2: costPercentByCostType,
    3: costPercentByCostType,
    4: costPercentByCostType,
    subtotal: costPercentByCostType
  },
  { _id: false }
);

export const activities = new mongoose.Schema({
  costsByFFY: {
    type: Map,
    of: fedStateSplit
  }
});

const budgetSchema = new mongoose.Schema({
  years: [
    {
      _id: false,
      type: String
    }
  ],
  combined: {
    type: Map,
    of: fedStateSplit
  },
  activityTotals: [
    {
      _id: false,
      id: String,
      name: String,
      fundingSource: {
        type: String,
        enum: ['HIT', 'HIE', 'MMIS', null]
      },
      data: {
        combined: {
          type: Map,
          of: Number
        },
        contractors: {
          type: Map,
          of: Number
        },
        expenses: {
          type: Map,
          of: Number
        },
        statePersonnel: {
          type: Map,
          of: Number
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

export default mongoose.model('Budget', budgetSchema);
