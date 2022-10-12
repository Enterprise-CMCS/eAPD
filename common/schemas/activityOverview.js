import Joi from 'joi';

export const activitySummary = Joi.string().trim().min(1).required().messages({
  'string.base': 'Provide a short overview of the activity.',
  'string.empty': 'Provide a short overview of the activity.',
  'string.min': 'Provide a short overview of the activity.'
});
export const activityDescription = Joi.string()
  .trim()
  .min(1)
  .required()
  .messages({
    'string.base': 'Provide details to explain this activity.',
    'string.empty': 'Provide details to explain this activity.',
    'string.min': 'Provide details to explain this activity.'
  });
const overviewSchema = Joi.object({
  summary: activitySummary,
  description: activityDescription
});
export default overviewSchema;
