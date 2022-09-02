const Joi = require('joi').extend(require('@joi/date'));

const milestonesSchema = Joi.object({
  key: Joi.any(),
  milestone: Joi.string().required().messages({
    'string.base': 'Milestone is required.',
    'string.empty': 'Milestone is required.'
  }),
  endDate: Joi.date()
    .format('YYYY-MM-DD')
    .iso()
    .required()
    .messages({
      'date.required': 'Provide a completion date.',
      'date.base': 'Provide a completion date.',
      'date.empty': 'Provide a completion date.',
      'date.format': 'Provide a completion date.'
    })
});

export default milestonesSchema;
