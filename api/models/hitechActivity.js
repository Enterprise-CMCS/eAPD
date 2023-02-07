import mongoose from 'mongoose';
import activitySchema from './apdActivity.js';

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

export default hitechActivitySchema;
