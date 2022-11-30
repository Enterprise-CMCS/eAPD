import Joi from 'joi';

const statePersonnelSchema = Joi.object({
  key: Joi.string(),
  title: Joi.string().required().messages({
    'string.empty': 'Provide a personnel title.',
    'string.base': 'Provide a personnel title.',
    'string.format': 'Provide a personnel title.'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Provide a personnel description.',
    'string.base': 'Provide a personnel description.',
    'string.format': 'Provide a personnel description.'
  }),
  years: Joi.object()
});

export default statePersonnelSchema;
