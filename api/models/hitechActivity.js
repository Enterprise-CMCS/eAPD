const mongoose = require('mongoose');
const { activitySchema } = require('./apdActivity');

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

const hitechActivitySchema = new mongoose.Schema({
  _id: false,
  fundingSource: String,
  activityOverview: {
    summary: String,
    description: String,
    alternatives: String,
    standardsAndConditions: {
      doesNotSupport: String,
      supports: String
    }
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
  }
});

hitechActivitySchema.add(activitySchema);

module.exports = {
  incentivePayment,
  hitechActivitySchema
};
