import Joi from 'joi';

const schemas = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Activity Name is required.',
    'string.empty': 'Activity Name is required.'
  }),
  fundingSource: Joi.string().required().messages({
    'string.base': 'Must select program type.',
    'string.empty': 'Must select program type.'
  })
});

export default schemas;
