import Joi from 'joi';

const analysisOfAlternativesAndRisksSchema = Joi.object({
  alternativeAnalysis: Joi.string().allow(''),
  costBenefitAnalysis: Joi.string().allow(''),
  feasibilityStudy: Joi.string().allow(''),
  requirementsAnalysis: Joi.string().allow(''),
  forseeableRisks: Joi.string().allow('')
});

export default analysisOfAlternativesAndRisksSchema;
