import Joi from 'joi';

const costAllocateSchema = Joi.object({
  methodology: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide a description of the cost allocation methodology.',
    'string.empty': 'Provide a description of the cost allocation methodology.',
    'string.min': 'Provide a description of the cost allocation methodology.'
  })
});

export default costAllocateSchema;
