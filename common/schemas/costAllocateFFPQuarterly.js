const Joi = require('joi');

const costAllocateFFPQuarterlySchema = Joi.object({
  1: Joi.any(),
  2: Joi.any(),
  3: Joi.any(),
  4: Joi.any(),
  subtotal: Joi.object({
    combined: Joi.any(),
    contractors: Joi.object({
      dollars: Joi.any(),
      percent: Joi.number().min(0).max(1).messages({
        'number.min':
          'Update the quarterly percentages so that the subtotal does not exceed 100%.',
        'number.max':
          'Update the quarterly percentages so that the subtotal does not exceed 100%.'
      })
    }),
    inHouse: Joi.object({
      dollars: Joi.any(),
      percent: Joi.number().min(0).max(1).messages({
        'number.min':
          'Update the quarterly percentages so that the subtotal does not exceed 100%.',
        'number.max':
          'Update the quarterly percentages so that the subtotal does not exceed 100%.'
      })
    })
  })
});

export default costAllocateFFPQuarterlySchema;
