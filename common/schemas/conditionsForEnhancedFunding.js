import Joi from 'joi';

const conditionsForEnhancedFundingSchema = Joi.object({
  enhancedFundingQualification: Joi.boolean().required().messages({
    'boolean.base': 'Select an Enhanced Funding Qualification',
    'boolean.required': 'Select an Enhanced Funding Qualification'
  }),
  enhancedFundingJustification: Joi.when('enhancedFundingQualification', {
    is: true,
    then: Joi.string().trim().required().messages({
      'string.base': 'Provide an Enhanced Funding Justification',
      'string.empty': 'Provide an Enhanced Funding Justification',
      'string.required': 'Provide an Enhanced Funding Justification'
    }),
    otherwise: Joi.any()
  })
});

export default conditionsForEnhancedFundingSchema;
