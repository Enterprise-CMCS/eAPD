import Joi from 'joi';

export const activityNameSchema = Joi.string().trim().required().messages({
  'string.base': 'Provide an Activity name.',
  'string.empty': 'Provide an Activity name.'
});

export const activityFundingSourceSchema = Joi.string()
  .trim()
  .required()
  .messages({
    'string.base': 'Select a Program Type.',
    'string.empty': 'Select a Program Type.'
  });

const nameAndFundingSourceSchema = Joi.object({
  name: activityNameSchema,
  fundingSource: activityFundingSourceSchema
});

export default nameAndFundingSourceSchema;
