import mongoose from 'mongoose';
import activitySchema from './apdActivity.js';

const mmisActivitySchema = new mongoose.Schema({
  _id: false,
  fundingSource: { type: String, default: 'MMIS' },
  activityOverview: {
    activitySnapshot: String,
    problemStatement: String,
    proposedSolution: String
  },
  analysisOfAlternativesAndRisks: {
    alternativeAnalysis: String,
    costBenefitAnalysis: String,
    feasibilityStudy: String,
    requirementsAnalysis: String,
    forseeableRisks: String
  },
  conditionsForEnhancedFunding: {
    enhancedFundingQualification: Boolean,
    enhancedFundingJustification: String
  }
});

mmisActivitySchema.add(activitySchema);

export default mmisActivitySchema;
