import Joi from 'joi';

const schemas = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide a private contractor or vendor name.',
    'string.empty': 'Provide a private contractor or vendor name.',
    'string.min': 'Provide a private contractor or vendor name.'
  }),
  description: Joi.string().trim().min(1).required().messages({
    'string.base':
      'Provide a procurement methodology and description of services.',
    'string.empty':
      'Provide a procurement methodology and description of services.',

    'string.min':
      'Provide a procurement methodology and description of services.'
  }),
  start: Joi.date().iso().required().messages({
    'date.base': 'Provide a start date.',
    'date.empty': 'Provide a start date.',
    'date.format': 'Provide a start date.'
  }),
  end: Joi.date().iso().min(Joi.ref('start')).required().messages({
    'date.base': 'Provide an end date.',
    'date.empty': 'Provide an end date.',
    'date.format': 'Provide a valid end date.',
    'date.min': 'Provide an end date that is after the start date.'
  }),
  totalCost: Joi.number().positive().required().messages({
    'number.base': 'Provide a contract cost.',
    'number.empty': 'Provide a contract cost.',
    'number.format': 'Provide a contract cost greater than or equal to $0.',
    'number.positive': 'Provide a contract cost greater than or equal to $0.'
  }),
  useHourly: Joi.string().required().messages({
    'string.base': 'Must select hourly or yearly.',
    'string.empty': 'Must select hourly or yearly.'
  }),
  hourly: Joi.alternatives().conditional('useHourly', {
    is: 'yes',
    then: Joi.object().pattern(
      /\d{4}/,
      Joi.object({
        hours: Joi.number().positive().required().messages({
          'number.base': 'Provide a number of hours.',
          'number.empty': 'Provide a number of hours.',
          'number.format': 'Provide a valid number of hours.',
          'number.positive':
            'Provide a number of hours greater than or equal to 0.'
        }),
        rate: Joi.number().positive().greater(0).required().messages({
          'number.base': 'Provide an hourly rate.',
          'number.empty': 'Provide an hourly rate.',
          'number.format': 'Provide a valid dollar value.',
          'number.positive': 'Provide an hourly rate greater than $0.',
          'number.greater': 'Provide an hourly rate greater than $0.'
        })
      })
    ),
    otherwise: Joi.any()
  }),
  years: Joi.alternatives().conditional('useHourly', {
    is: 'no',
    then: Joi.object().pattern(
      /\d{4}/,
      Joi.number().positive().greater(0).required().messages({
        'number.base': 'Provide an annual cost.',
        'number.empty': 'Provide an annual cost.',
        'number.format': 'Provide a valid dollar value.',
        'number.positive': 'Provide an annual cost greater than $0.',
        'number.greater': 'Provide an annual cost greater than $0.'
      })
    ),
    otherwise: Joi.any()
  })
});

export default schemas;
