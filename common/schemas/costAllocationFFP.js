import Joi from 'joi';

export const activityCostAllocationFFP = Joi.object({
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

const costAllocationFFPSchema = Joi.object().pattern(
  /\d{4}/,
  Joi.object({
    ffp: activityCostAllocationFFP,
    other: Joi.any()
  })
);

export default costAllocationFFPSchema;
