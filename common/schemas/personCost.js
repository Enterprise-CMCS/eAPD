const Joi = require('joi')

const personCostSchema = Joi.object().pattern(
    /\d{4}/,
    Joi.object({
      amt: Joi.number().positive().allow(0).required().messages({
        'number.base': 'Please provide a FTE cost greater than or equal to $0.',
        'number.empty': 'Please provide a FTE cost greater than or equal to $0.',
        'number.format': 'Please provide a FTE cost greater than or equal to $0.',
        'number.positive': 'Please provide a FTE cost greater than or equal to $0.',
        'number.allow': 'Please provide a FTE cost greater than or equal to $0.'
      }),
      perc: Joi.number().positive().allow(0).required().messages({
        'number.base': 'Provide a FTE number greater than or equal to 0.',
        'number.empty': 'Provide a FTE number greater than or equal to 0.',
        'number.positive': 'Provide a FTE number greater than or equal to 0.',
        'number.greater': 'Provide a FTE number greater than or equal to 0.',
        'number.allow': 'Provide a FTE number greater than or equal to 0.'
      })
  })
);

export default personCostSchema;