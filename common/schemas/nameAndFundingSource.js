import Joi from 'joi';

export const activityName = Joi.string().required().messages({
  'string.base': 'Activity Name is required.',
  'string.empty': 'Activity Name is required.'
});

export const activityFundingSource = Joi.string().required().messages({
  'string.base': 'Must select program type.',
  'string.empty': 'Must select program type.'
});

const nameAndFundingSourceSchema = Joi.object({
  name: activityName,
  fundingSource: activityFundingSource
});

export default nameAndFundingSourceSchema;
