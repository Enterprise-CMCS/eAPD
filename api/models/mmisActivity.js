const mongoose = require('mongoose');
const { activitySchema } = require('./apdActivity');

const mmisActivitySchema = new mongoose.Schema({
  _id: false,
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

module.exports = {
  mmisActivitySchema
};
