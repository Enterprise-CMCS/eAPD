const Joi = require('joi');

const itemSchema = Joi.object({
  checked: Joi.boolean().required().label('Select').messages({
    'boolean.base': 'Select yes or no',
    'boolean.empty': 'Select yes or no'
  }),
  title: Joi.string().required(),
  explanation: Joi.alternatives().conditional('checked', {
    is: false,
    then: Joi.string().trim().min(1).required().label('Provide').messages({
      'string.base': 'Provide an explanation',
      'string.empty': 'Provide an explanation',
      'string.min': 'Provide an explanation'
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
