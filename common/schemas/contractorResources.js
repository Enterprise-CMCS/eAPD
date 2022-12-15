const Joi = require('joi').extend(require('@joi/date'));

const contractorResourcesSchema = Joi.object({
  id: Joi.any(),
  key: Joi.any(),
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
  start: Joi.date().format('YYYY-MM-DD').iso().required().messages({
    'date.required': 'Provide a start date.',
    'date.base': 'Provide a start date.',
    'date.empty': 'Provide a start date.',
    'date.format': 'Provide a start date.'
  }),
  end: Joi.date()
    .format('YYYY-MM-DD')
    .iso()
    .min(Joi.ref('start'))
    .required()
    .messages({
      'date.required': 'Provide an end date.',
      'date.base': 'Provide an end date.',
      'date.empty': 'Provide an end date.',
      'date.format': 'Provide an end date.',
      'date.min': 'Provide an end date that is after the start date.',
      'any.ref': 'Provide an end date that is after the start date.'
    }),
  totalCost: Joi.number().positive().allow(0).required().messages({
    'number.base': 'Provide a contract cost greater than or equal to $0.',
    'number.empty': 'Provide a contract cost greater than or equal to $0.',
    'number.format': 'Provide a contract cost greater than or equal to $0.',
    'number.positive': 'Provide a contract cost greater than or equal to $0.',
    'number.allow': 'Provide a contract cost greater than or equal to $0.'
  }),
  useHourly: Joi.alternatives()
    .try(Joi.string().valid('true', 'false'), Joi.boolean())
    .required()
    .messages({
      'alternatives.match': 'Must select hourly or yearly.',
      'alternatives.types': 'Must select hourly or yearly.',
      'string.base': 'Must select hourly or yearly.',
      'string.empty': 'Must select hourly or yearly.'
    }),
  hourly: Joi.alternatives().conditional('useHourly', {
    is: 'yes',
    then: Joi.object().pattern(
      /\d{4}/,
      Joi.object({
        hours: Joi.number().positive().allow(0).required().messages({
          'number.base':
            'Provide a number of hours greater than or equal to 0.',
          'number.positive':
            'Provide a number of hours greater than or equal to 0.',
          'number.allow':
            'Provide a number of hours greater than or equal to 0.',
          'number.empty':
            'Provide a number of hours greater than or equal to 0.',
          'number.format': 'Provide a valid number of hours.'
        }),
        rate: Joi.number().positive().allow(0).required().messages({
          'number.base': 'Provide an hourly rate greater than or equal to $0.',
          'number.empty': 'Provide an hourly rate greater than or equal to $0.',
          'number.positive':
            'Provide an hourly rate greater than or equal to $0.',
          'number.allow': 'Provide an hourly rate greater than or equal to $0.',
          'number.format': 'Provide a valid dollar value.'
        })
      })
    ),
    otherwise: Joi.any()
  }),
  years: Joi.alternatives().conditional('useHourly', {
    is: 'no',
    then: Joi.object().pattern(
      /\d{4}/,
      Joi.number().positive().allow(0).required().messages({
        'number.base': 'Provide an annual cost greater than or equal to $0.',
        'number.empty': 'Provide an annual cost greater than or equal to $0.',
        'number.positive':
          'Provide an annual cost greater than or equal to $0.',
        'number.allow': 'Provide an annual cost greater than or equal to $0.',
        'number.format': 'Provide a valid dollar value.'
      })
    ),
    otherwise: Joi.any()
  }),
  files: Joi.any()
});

export default contractorResourcesSchema;
