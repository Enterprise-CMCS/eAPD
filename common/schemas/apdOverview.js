import Joi from 'joi';

const apdOverviewSchema = Joi.object({
  fundingSources: Joi.array().items(Joi.string()).required(),
  programOverview: Joi.string().messages({
    'string.empty': 'Provide a brief introduction to the state program.'
  }),
  narrativeHIT: Joi.when('fundingSources', {
    is: Joi.array().items(Joi.string().valid('HIT').required(), Joi.any()),
    then: Joi.string().messages({
      'string.empty': 'Provide a summary of HIT-funded activities.'
    }),
    otherwise: Joi.any()
  }),
  narrativeHIE: Joi.when('fundingSources', {
    is: Joi.array().items(Joi.string().valid('HIE').required(), Joi.any()),
    then: Joi.string().messages({
      'string.empty': 'Provide a summary of HIE-funded activities.'
    }),
    otherwise: Joi.any()
  }),
  narrativeMMIS: Joi.when('fundingSources', {
    is: Joi.array().items(Joi.string().valid('MMIS').required(), Joi.any()),
    then: Joi.string().messages({
      'string.empty': 'Provide a summary of MMIS-funded activities.'
    }),
    otherwise: Joi.any()
  })
});

export default apdOverviewSchema;
