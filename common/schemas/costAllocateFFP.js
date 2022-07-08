const Joi = require('joi');

const costAllocateFFPSchema = Joi.object({
  costAllocation: Joi.object().pattern(
    /\d{4}/,
    Joi.object({
      ffp: Joi.object({
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
            'alternatives.any': 'Select a federal-state split.'
          })
      }),
      other: Joi.any()
    })
  )
});

export default costAllocateFFPSchema;
