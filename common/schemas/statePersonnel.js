const Joi = require('joi');

const statePersonnelSchema = Joi.object({
  key: Joi.string(),
  title: Joi.string().required().messages({
    'string.empty': 'Provide a personnel title.'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Provide a personnel description.'
  }),
  years: Joi.object()
});

export default statePersonnelSchema;
