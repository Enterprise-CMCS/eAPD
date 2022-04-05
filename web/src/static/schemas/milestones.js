import Joi from 'joi';

const milestonesSchema = Joi.object({
  key: Joi.any(),
  milestone: Joi.string().required().messages({
    'string.base': 'Milestone is required.',
    'string.empty': 'Milestone is required.'
  }),
  endDate: Joi.date().iso().required().messages({
    'date.base': 'Provide and end date.',
    'date.empty': 'Provide and end date.',
    'date.format': 'Provide and end date.'
  })
});

export default milestonesSchema;