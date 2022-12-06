import Joi from 'joi';

export const activityNameSchema = Joi.string().required().messages({
  'string.base': 'Provide an Activity Name',
  'string.empty': 'Provide an Activity Name'
});

export const activityFundingSourceSchema = Joi.string().required().messages({
  'string.base': 'Select a Program Type',
  'string.empty': 'Select a Program Type'
});

const nameAndFundingSourceSchema = Joi.object({
  name: activityNameSchema,
  fundingSource: activityFundingSourceSchema
});

export default nameAndFundingSourceSchema;
