import Joi from 'joi';

export const activityCostAllocationOther = Joi.number()
  .positive()
  .allow(0)
  .required()
  .messages({
    'number.base':
      'Provide an other funding amount greater than or equal to $0.',
    'number.positive':
      'Provide an other funding amount greater than or equal to $0.',
    'number.allow':
      'Provide an other funding amount greater than or equal to $0.',
    'number.empty':
      'Provide an other funding amount greater than or equal to $0.',
    'number.format': 'Provide a valid funding amount.'
  });

const otherSourcesSchema = Joi.object({
  costAllocation: Joi.object().pattern(
    /\d{4}/,
    Joi.object({
      ffp: Joi.any(),
      other: activityCostAllocationOther
    })
  )
});

export default otherSourcesSchema;
