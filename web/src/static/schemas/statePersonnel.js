import Joi from 'joi';

const statePersonnelSchema = Joi.object({
  key: Joi.string(),
  title: Joi.string().required().messages({
    'string.empty': 'Title is required'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required'
  })
});

export default statePersonnelSchema;