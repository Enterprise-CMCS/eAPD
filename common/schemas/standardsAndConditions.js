import Joi from 'joi';

const standardsConditionsSchema = Joi.object({
  doesNotSupport: Joi.any(),
  supports: Joi.string().trim().min(1).required().messages({
    'string.base':
      'Provide a description about how this activity will support the Medicaid standards and conditions.',
    'string.empty':
      'Provide a description about how this activity will support the Medicaid standards and conditions.',
    'string.min':
      'Provide a description about how this activity will support the Medicaid standards and conditions.'
  })
});

export default standardsConditionsSchema;
