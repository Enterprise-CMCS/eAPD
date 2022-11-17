import Joi from 'joi';

export const costAllocationMethodologySchema = Joi.string()
  .trim()
  .min(1)
  .required()
  .messages({
    'string.base': 'Provide a description of the cost allocation methodology.',
    'string.empty': 'Provide a description of the cost allocation methodology.',
    'string.min': 'Provide a description of the cost allocation methodology.'
  });

const costAllocationNarrativeSchema = Joi.object({
  years: Joi.any(),
  methodology: costAllocationMethodologySchema
});

export default costAllocationNarrativeSchema;
