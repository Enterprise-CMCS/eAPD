const Joi = require('joi');

const itemSchema = Joi.object({
  checked: Joi.boolean().required().label('checked').messages({
    'boolean.base': 'Select yes or no',
    'boolean.empty': 'Select yes or no',
    'boolean.required': 'Select yes or no'
  }),
  title: Joi.string().required(),
  explanation: Joi.alternatives().conditional('checked', {
    is: false,
    then: Joi.string().trim().min(1).required().label('explanation').messages({
      'string.base': 'Provide an explanation',
      'string.empty': 'Provide an explanation',
      'string.min': 'Provide an explanation',
      'string.required': 'Provide an explanation'
    }),
    otherwise: Joi.any()
  })
});

const schemas = Joi.object({
  procurement: Joi.array().items(itemSchema).required(),
  recordsAccess: Joi.array().items(itemSchema).required(),
  softwareRights: Joi.array().items(itemSchema).required(),
  security: Joi.array().items(itemSchema).required()
});

export default schemas;
