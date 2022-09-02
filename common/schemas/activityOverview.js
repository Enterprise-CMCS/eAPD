import Joi from 'joi';

const overviewSchema = Joi.object({
  summary: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide a short overview of the activity.',
    'string.empty': 'Provide a short overview of the activity.',
    'string.min': 'Provide a short overview of the activity.'
  }),
  description: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide details to explain this activity.',
    'string.empty': 'Provide details to explain this activity.',
    'string.min': 'Provide details to explain this activity.'
  })
});

export default overviewSchema;
