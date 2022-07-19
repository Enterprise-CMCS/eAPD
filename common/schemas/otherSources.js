import Joi from 'joi';

const otherSourcesSchema = Joi.object({
  costAllocation: Joi.object().pattern(
    /\d{4}/,
    Joi.object({
      ffp: Joi.any(),
      other: Joi.number().positive().allow(0).required().messages({
        'number.base':
          'Provide a number of hours greater than or equal to 0.',
        'number.positive':
          'Provide a number of hours greater than or equal to 0.',
        'number.allow':
          'Provide a number of hours greater than or equal to 0.',
        'number.empty':
          'Provide a number of hours greater than or equal to 0.',
        'number.format': 'Provide a valid number of hours.'
      })
    })
  )
});

export default otherSourcesSchema;