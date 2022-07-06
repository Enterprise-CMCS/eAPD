const Joi = require('joi');

const costAllocationFFPSchema = Joi.object({
  costAllocation: Joi.object().pattern(
    /\d{4}/,
    Joi.object({
      ffp: Joi.object({
        federal: Joi.number().min(50).max(90).messages({
          'date.base': 'Select a federal-state split.',
          'date.empty': 'Select a federal-state split.',
          'date.min': 'Select a federal-state split.',
          'date.max': 'Select a federal-state split.'
        }),
        state: Joi.number().min(10).max(50).messages({
          'date.base': 'Select a federal-state split.',
          'date.empty': 'Select a federal-state split.',
          'date.min': 'Select a federal-state split.',
          'date.max': 'Select a federal-state split.'
        })
      }),
      other: Joi.any()
    })
  )
});

export default costAllocationFFPSchema;
