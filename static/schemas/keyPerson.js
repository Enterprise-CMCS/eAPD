import Joi from 'joi';

const schemas = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name is required',
    'string.empty': 'Name is required'
  }),
  email: Joi.string().required().messages({
    'string.base': 'Email is required',
    'string.empty': 'Email is required'
  }),
  position: Joi.string().required().messages({
    'string.base': 'Role is required',
    'string.empty': 'Role is required'
  }),
  hasCosts: Joi.string().required().messages({
    'string.base': 'Indicate whether or not this person has costs.',
    'string.empty': 'Indicate whether or not this person has costs.'
  }),
  costs: Joi.alternatives().conditional('hasCosts', {
    is: 'yes',
    then: Joi.object().pattern(
      /\d{4}/,
      Joi.number().positive().required().messages({
        'number.base': 'Provide a cost with benefits.',
        'number.empty': 'Provide a cost with benefits.',
        'number.format': 'Costs with Benefits should not be less than 0.',
        'number.positive': 'Costs with Benefits should not be less than 0.'
      })
    ),
    otherwise: Joi.any()
  }),
  fte: Joi.alternatives().conditional('hasCosts', {
    is: 'yes',
    then: Joi.object().pattern(
      /\d{4}/,
      Joi.number().positive().required().messages({
        'number.base': 'Provide an FTE.',
        'number.empty': 'Provide an FTE.',
        'number.format': 'FTE should not be less than 0.',
        'number.positive': 'FTE should not be less than 0.'
      })
    ),
    otherwise: Joi.any()
  })
})

export default schemas;
