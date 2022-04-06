import Joi from 'joi';

const milestonesSchema = Joi.object({
  key: Joi.any(),
  milestone: Joi.string().required().messages({
    'string.base': 'Milestone is required.',
    'string.empty': 'Milestone is required.'
  }),
  endDate: Joi.date().iso().required().messages({
    'date.base': 'Provide a completion date.',
    'date.empty': 'Provide a completion date.',
    'date.format': 'Provide a completion date.'
  })
});

export default milestonesSchema;