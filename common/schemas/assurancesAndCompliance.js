import Joi from 'joi';

const complianceSchema = Joi.object({
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

export const hitechAssurancesAndComplianceSchema = Joi.object({
  procurement: Joi.array().items(complianceSchema).required(),
  recordsAccess: Joi.array().items(complianceSchema).required(),
  softwareRights: Joi.array().items(complianceSchema).required(),
  security: Joi.array().items(complianceSchema).required()
});

export const mmisAssurancesAndComplianceSchema = Joi.object({
  procurement: Joi.array().items(complianceSchema).required(),
  recordsAccess: Joi.array().items(complianceSchema).required(),
  softwareRights: Joi.array().items(complianceSchema).required(),
  independentVV: Joi.array().items(complianceSchema).required()
});
