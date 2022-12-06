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

export const activitySnapshotSchema = Joi.string().required().messages({
  'string.base': 'Provide an Activity Snapshot',
  'string.empty': 'Provide an Activity Snapshot',
  'string.required': 'Provide an Activity Snapshot'
});

export const problemStatementSchema = Joi.string().required().messages({
  'string.base': 'Provide a Problem Statement',
  'string.empty': 'Provide a Problem Statement',
  'string.required': 'Provide a Problem Statement'
});

export const proposedSolutionSchema = Joi.string().required().messages({
  'string.base': 'Provide a Proposed Solution',
  'string.empty': 'Provide a Proposed Solution',
  'string.required': 'Provide a Proposed Solution'
});

export const mmisActivityOverviewSchema = Joi.object({
  activitySnapshot: activitySnapshotSchema,
  problemStatement: problemStatementSchema,
  proposedSolution: proposedSolutionSchema
});
