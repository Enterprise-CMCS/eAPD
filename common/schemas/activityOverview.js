import Joi from 'joi';

export const activitySummarySchema = Joi.string()
  .trim()
  .min(1)
  .required()
  .messages({
    'string.base': 'Provide a short overview of the activity.',
    'string.empty': 'Provide a short overview of the activity.',
    'string.min': 'Provide a short overview of the activity.'
  });
export const activityDescriptionSchema = Joi.string()
  .trim()
  .min(1)
  .required()
  .messages({
    'string.base': 'Provide details to explain this activity.',
    'string.empty': 'Provide details to explain this activity.',
    'string.min': 'Provide details to explain this activity.'
  });
export const activityAlternativesSchema = Joi.any();

export const standardsAndConditionsSchema = Joi.object({
  doesNotSupport: Joi.any(),
  supports: Joi.string().trim().min(1).required().messages({
    'string.base':
      'Provide a description about how this activity will support the Medicaid standards and conditions.',
    'string.empty':
      'Provide a description about how this activity will support the Medicaid standards and conditions.',
    'string.min':
      'Provide a description about how this activity will support the Medicaid standards and conditions.'
  })
});

// No Standards and Conditions (SC)
export const hitechActivityOverviewNoSCSchema = Joi.object({
  summary: activitySummarySchema,
  description: activityDescriptionSchema,
  alternatives: activityAlternativesSchema
});

export const hitechActivityOverviewSchema = Joi.object({
  summary: activitySummarySchema,
  description: activityDescriptionSchema,
  alternatives: activityAlternativesSchema,
  standardsAndConditions: standardsAndConditionsSchema
});

export const activitySnapshotSchema = Joi.string().trim().required().messages({
  'string.base': 'Provide an Activity snapshot',
  'string.empty': 'Provide an Activity snapshot',
  'string.required': 'Provide an Activity snapshot'
});

export const problemStatementSchema = Joi.string().trim().required().messages({
  'string.base': 'Provide a Problem statement',
  'string.empty': 'Provide a Problem statement',
  'string.required': 'Provide a Problem statement'
});

export const proposedSolutionSchema = Joi.string().trim().required().messages({
  'string.base': 'Provide a Proposed solution',
  'string.empty': 'Provide a Proposed solution',
  'string.required': 'Provide a Proposed solution'
});

export const mmisActivityOverviewSchema = Joi.object({
  activitySnapshot: activitySnapshotSchema,
  problemStatement: problemStatementSchema,
  proposedSolution: proposedSolutionSchema
});
