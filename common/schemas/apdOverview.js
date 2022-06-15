import Joi from 'joi';

const apdOverviewSchema = () => {
  return Joi.object({
    fundingSources: Joi.array().items(Joi.string()).required(),
    programOverview: Joi.string().trim().min(1).required().messages({
      'string.base': 'Provide a brief introduction to the state program.',
      'string.empty': 'Provide a brief introduction to the state program.',
      'string.min': 'Provide a brief introduction to the state program.'
    }),
    narrativeHIT: Joi.string()
      .trim()
      .min(1)
      .messages({
        'string.base': 'Provide a summary of HIT-funded activities.',
        'string.empty': 'Provide a summary of HIT-funded activities.',
        'string.min': 'Provide a summary of HIT-funded activities.'
      })
      .when('fundingSources', {
        is: Joi.array().items(Joi.string().only('HIT').required(), Joi.any()),
        then: Joi.required()
      }),
    narrativeHIE: Joi.string()
      .trim()
      .min(1)
      .messages({
        'string.base': 'Provide a summary of HIE-funded activities.',
        'string.empty': 'Provide a summary of HIE-funded activities.',
        'string.min': 'Provide a summary of HIE-funded activities.'
      })
      .when('fundingSources', {
        is: Joi.array().items(Joi.string().only('HIE').required(), Joi.any()),
        then: Joi.required()
      }),
    narrativeMMIS: Joi.string()
      .trim()
      .min(1)
      .messages({
        'string.base': 'Provide a summary of MMIS-funded activities.',
        'string.empty': 'Provide a summary of MMIS-funded activities.',
        'string.min': 'Provide a summary of MMIS-funded activities.'
      })
      .when('fundingSources', {
        is: Joi.array().items(Joi.string().only('MMIS').required(), Joi.any()),
        then: Joi.required()
      })
  });
};

export default apdOverviewSchema;
