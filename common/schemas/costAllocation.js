const Joi = require('joi');

export const costAllocationFFPSchema = Joi.object({
  federal: Joi.number().required(),
  state: Joi.alternatives()
    .conditional('federal', {
      switch: [
        {
          is: 90,
          then: Joi.number().valid(10)
        },
        {
          is: 75,
          then: Joi.number().valid(25)
        },
        {
          is: 50,
          then: Joi.number().valid(50)
        }
      ]
    })
    .messages({
      'alternatives.base': 'Select a federal-state split.',
      'alternatives.any': 'Select a federal-state split.'
    })
});

export const costAllocationOtherSchema = Joi.number()
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

const costAllocationSchema = Joi.object().pattern(
  /\d{4}/,
  Joi.object({
    ffp: costAllocationFFPSchema,
    other: costAllocationOtherSchema
  })
);

export default costAllocationSchema;
