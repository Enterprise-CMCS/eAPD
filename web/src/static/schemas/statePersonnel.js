import Joi from 'joi';

const statePersonnelSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': 'Title is required',
    'string.empty': 'Title is required'
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description is required',
    'string.empty': 'Description is required'
  }),
  years: Joi.object().required().messages({
    'string.base': 'Description is required', 
    'string.empty': 'Description is required'
  })
});

export default statePersonnelSchema;