import Joi from 'joi';

const securityPlanningSchema = Joi.object({
  securityAndInterfacePlan: Joi.string().trim().required().min(1).messages({
    'string.base': 'Provide Security and Interface Plan',
    'string.empty': 'Provide Security and Interface Plan',
    'string.required': 'Provide Security and Interface Plan'
  }),
  businessContinuityAndDisasterRecovery: Joi.string()
    .trim()
    .required()
    .min(1)
    .messages({
      'string.base': 'Provide Business Continuity and Disaster Recovery',
      'string.empty': 'Provide Business Continuity and Disaster Recovery',
      'string.required': 'Provide Business Continuity and Disaster Recovery'
    })
});

export default securityPlanningSchema;
