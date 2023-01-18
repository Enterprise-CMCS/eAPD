import Joi from 'joi';

const statePrioritiesAndScopeSchema = Joi.object({
  medicaidProgramAndPriorities: Joi.string().min(1).required().messages({
    'string.required': 'Provide Medicaid Program and Priorities',
    'string.base': 'Provide Medicaid Program and Priorities',
    'string.empty': 'Provide Medicaid Program and Priorities'
  }),
  mesIntroduction: Joi.string().required().messages({
    'string.base': 'Provide a Medicaid Enterprise System Introduction',
    'string.empty': 'Provide a Medicaid Enterprise System Introduction',
    'string.required': 'Provide a Medicaid Enterprise System Introduction'
  }),
  scopeOfAPD: Joi.string().required().messages({
    'string.base': `Provide an Overview of the APD's Scope`,
    'string.empty': `Provide an Overview of the APD's Scope`,
    'string.required': `Provide an Overview of the APD's Scope`
  })
});

export default statePrioritiesAndScopeSchema;
