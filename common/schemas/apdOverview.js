import Joi from 'joi';

const apdOverviewSchema = Joi.object({
  // Funding sources is not a user input but we use this as a dependency for
  // conditionally validating the narratives below
  fundingSources: Joi.array().items(Joi.string()).required(),
  programOverview: Joi.string().messages({
    'string.base': 'Provide a brief introduction to the state program.',
    'string.empty': 'Provide a brief introduction to the state program.'
  }),
  narrativeHIT: Joi.when('fundingSources', {
    is: Joi.array().items(Joi.string().valid('HIT').required(), Joi.any()),
    then: Joi.string().messages({
      'string.base': 'Provide a summary of HIT-funded activities.',
      'string.empty': 'Provide a summary of HIT-funded activities.'
    }),
    otherwise: Joi.any()
  }),
  narrativeHIE: Joi.when('fundingSources', {
    is: Joi.array().items(Joi.string().valid('HIE').required(), Joi.any()),
    then: Joi.string().messages({
      'string.base': 'Provide a summary of HIE-funded activities.',
      'string.empty': 'Provide a summary of HIE-funded activities.'
    }),
    otherwise: Joi.any()
  }),
  narrativeMMIS: Joi.when('fundingSources', {
    is: Joi.array().items(Joi.string().valid('MMIS').required(), Joi.any()),
    then: Joi.string().messages({
      'string.base': 'Provide a summary of MMIS-funded activities.',
      'string.empty': 'Provide a summary of MMIS-funded activities.'
    }),
    otherwise: Joi.any()
  })
});

export default apdOverviewSchema;
