import Joi from 'joi';

const costAllocationNarrativeSchema = Joi.object({
  years: Joi.any(),
  methodology: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide a description of the cost allocation methodology.',
    'string.empty': 'Provide a description of the cost allocation methodology.',
    'string.min': 'Provide a description of the cost allocation methodology.'
  })
});

export default costAllocationNarrativeSchema;
