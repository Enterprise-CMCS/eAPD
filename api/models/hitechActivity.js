const mongoose = require('mongoose');
const { activitySchema } = require('./apdActivity');

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
  }
});

hitechActivitySchema.add(activitySchema);

module.exports = {
  hitechActivitySchema
};
