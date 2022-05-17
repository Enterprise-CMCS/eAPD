import Joi from 'joi';

const apdOverviewSchema = Joi.object({
  programOverview: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide a brief introduction to the state program.',
    'string.empty': 'Provide a brief introduction to the state program.',
    'string.min': 'Provide a brief introduction to the state program.'
  }),
});

export default apdOverviewSchema;
