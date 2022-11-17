const {
  hitechOverviewSchema,
  mmisOverviewSchema,
  keyStatePersonnelSchema,
  statePrioritiesAndScopeSchema,
  activityNameSchema,
  activityFundingSourceSchema,
  hitechActivityOverviewSchema,
  mmisActivityOverviewSchema,
  activityScheduleSchema,
  analysisOfAlternativesAndRisksSchema,
  conditionsForEnhancedFundingSchema,
  milestonesSchema,
  outcomeMetricsSchema,
  statePersonnelSchema,
  expensesSchema,
  contractorResourcesSchema,
  costAllocationSchema,
  costAllocationNarrativeSchema,
  proposedBudgetSchema,
  securityPlanningSchema,
  hitechAssurancesAndComplianceSchema,
  mmisAssurancesAndComplianceSchema,
  budgetActivitiesSchema
} = require('./index');

const Joi = require('joi');

export const hitechCombinedSchema = Joi.object({
  _id: Joi.any(),
  __v: Joi.any(),
  __t: Joi.any(),
  id: Joi.any(),
  createdAt: Joi.any(),
  updatedAt: Joi.any(),
  apdType: Joi.any().valid('HITECH').required().messages({
    'any.only': 'APD Type must be HITECH'
  }),
  status: Joi.any(),
  stateId: Joi.any(),
  name: Joi.string().messages({
    'string.base': 'Provide an APD name',
    'string.empty': 'Provide an APD name'
  }),
  years: Joi.any(),
  yearOptions: Joi.any(),
  apdOverview: hitechOverviewSchema,
  keyStatePersonnel: keyStatePersonnelSchema,
  previousActivities: Joi.any(),
  // activities schema copied from schemas/activitiesDashboard.js
  activities: Joi.array()
    .min(1)
    .messages({
      'array.base': 'Activities have not been added for this APD.',
      'array.min': 'Activities have not been added for this APD.'
    })
    .items({
      id: Joi.any(),
      activityId: Joi.any(),
      name: activityNameSchema,
      fundingSource: activityFundingSourceSchema,
      activityOverview: hitechActivityOverviewSchema,
      activitySchedule: activityScheduleSchema,
      milestones: Joi.array().items(milestonesSchema),
      outcomes: Joi.array().items(outcomeMetricsSchema),
      statePersonnel: Joi.array().items(statePersonnelSchema),
      expenses: Joi.array().items(expensesSchema),
      contractorResources: Joi.array().items(contractorResourcesSchema),
      costAllocation: costAllocationSchema,
      costAllocationNarrative: costAllocationNarrativeSchema,
      quarterlyFFP: Joi.any() // quarterlyFFP is validated in the budget
    }),
  proposedBudget: proposedBudgetSchema,
  assurancesAndCompliances: hitechAssurancesAndComplianceSchema,
  budget: Joi.object({
    _id: Joi.any(),
    __v: Joi.any(),
    __t: Joi.any(),
    years: Joi.any(),
    federalShareByFFYQuarter: Joi.any(),
    hie: Joi.any(),
    hit: Joi.any(),
    mmis: Joi.any(),
    hitAndHie: Joi.any(),
    mmisByFFP: Joi.any(),
    combined: Joi.any(),
    activityTotals: Joi.any(),
    activities: budgetActivitiesSchema
  })
});

export const mmisCombinedSchema = Joi.object({
  _id: Joi.any(),
  __v: Joi.any(),
  __t: Joi.any(),
  id: Joi.any(),
  createdAt: Joi.any(),
  updatedAt: Joi.any(),
  status: Joi.any(),
  stateId: Joi.any(),
  apdType: Joi.any().valid('MMIS').required().messages({
    'any.only': 'APD Type must be MMIS'
  }),
  name: Joi.string().messages({
    'string.base': 'Provide an APD name',
    'string.empty': 'Provide an APD name'
  }),
  years: Joi.any(),
  yearOptions: Joi.any(),
  apdOverview: mmisOverviewSchema,
  keyStatePersonnel: keyStatePersonnelSchema,
  statePrioritiesAndScope: statePrioritiesAndScopeSchema,
  previousActivities: Joi.any(),
  // activities schema copied from schemas/activitiesDashboard.js
  activities: Joi.array().items({
    id: Joi.any(),
    activityId: Joi.any(),
    name: activityNameSchema,
    activityOverview: mmisActivityOverviewSchema,
    activitySchedule: activityScheduleSchema,
    analysisOfAlternativesAndRisks: analysisOfAlternativesAndRisksSchema,
    conditionsForEnhancedFunding: conditionsForEnhancedFundingSchema,
    milestones: Joi.array().items(milestonesSchema),
    outcomes: Joi.array().items(outcomeMetricsSchema),
    statePersonnel: Joi.array().items(statePersonnelSchema),
    expenses: Joi.array().items(expensesSchema),
    contractorResources: Joi.array().items(contractorResourcesSchema),
    costAllocation: costAllocationSchema,
    quarterlyFFP: Joi.any() // quarterlyFFP is validated in the budget
  }),
  securityPlanning: securityPlanningSchema,
  assurancesAndCompliances: mmisAssurancesAndComplianceSchema,
  budget: Joi.object({
    _id: Joi.any(),
    __v: Joi.any(),
    __t: Joi.any(),
    years: Joi.any(),
    federalShareByFFYQuarter: Joi.any(),
    mmis: Joi.any(),
    mmisByFFP: Joi.any(),
    combined: Joi.any(),
    activityTotals: Joi.any(),
    activities: budgetActivitiesSchema
  })
});
