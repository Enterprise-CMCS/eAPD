import Joi from 'joi';

const incentivePaySchema = Joi.object({
  data: Joi.object({
    ehCt: Joi.any(),
    epCt: Joi.any(),
    ehAmt: Joi.object().pattern(
      /\d{4}/,
      Joi.object().pattern(
        /[1-4]{1}/,
        Joi.number().integer().positive().allow(0).required().messages({
          'number.base': 'Provide a whole number greater than or equal to $0.',
          'number.empty': 'Provide a whole number greater than or equal to $0.',
          'number.integer':
            'Use only whole numbers when providing dollar amount',
          'number.format':
            'Use only whole numbers when providing dollar amount',
          'number.positive':
            'Provide a whole number greater than or equal to $0.'
        })
      )
    ),
    epAmt: Joi.object().pattern(
      /\d{4}/,
      Joi.object().pattern(
        /[1-4]{1}/,
        Joi.number().integer().positive().allow(0).required().messages({
          'number.base': 'Provide a whole number greater than or equal to $0.',
          'number.empty': 'Provide a whole number greater than or equal to $0.',
          'number.integer':
            'Use only whole numbers when providing dollar amount',
          'number.format':
            'Use only whole numbers when providing dollar amount',
          'number.positive':
            'Provide a whole number greater than or equal to $0.'
        })
      )
    )
  })
});

export default incentivePaySchema;
