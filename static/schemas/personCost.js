import Joi from 'joi';

const personCostSchema = Joi.object().pattern(
    /\d{4}/,
    Joi.object({
      amt: Joi.number().positive().required().messages({
        'number.empty': 'Please provide a FTE cost greater than or equal to $0.',
        'number.format': 'Please provide a FTE cost greater than or equal to $0.',
        'number.positive':
          'Please provide a FTE cost greater than or equal to $0.'
      }),
      perc: Joi.number().positive().greater(0).required().messages({
        'number.empty': 'Provide a FTE number greater than or equal to 0.',
        'number.positive': 'Provide a FTE number greater than or equal to 0.',
        'number.greater': 'Provide a FTE number greater than or equal to 0.'
      })
  })
);

export default personCostSchema;