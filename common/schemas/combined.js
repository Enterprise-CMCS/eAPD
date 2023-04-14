import Joi from 'joi';

import {
  // activitiesDashboard,
  apdNameSchema,
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
  hitechCostAllocationSchema,
  mmisCostAllocationSchema,
  costAllocationNarrativeSchema,
  proposedBudgetSchema,
  securityPlanningSchema,
  hitechAssurancesAndComplianceSchema,
  mmisAssurancesAndComplianceSchema,
  budgetActivitiesSchema
} from './index.js';

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
  name: apdNameSchema,
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
      costAllocation: hitechCostAllocationSchema,
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
  apdType: Joi.any().valid('MMIS').required().messages({
    'any.only': 'APD Type must be MMIS'
  }),
  status: Joi.any(),
  stateId: Joi.any(),
  name: apdNameSchema,
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
    fundingSource: Joi.string().valid('MMIS').required(),
    activityOverview: mmisActivityOverviewSchema,
    analysisOfAlternativesAndRisks: analysisOfAlternativesAndRisksSchema,
    conditionsForEnhancedFunding: conditionsForEnhancedFundingSchema,
    activitySchedule: activityScheduleSchema,
    milestones: Joi.array().items(milestonesSchema),
    outcomes: Joi.array().items(outcomeMetricsSchema),
    statePersonnel: Joi.array().items(statePersonnelSchema),
    expenses: Joi.array().items(expensesSchema),
    contractorResources: Joi.array().items(contractorResourcesSchema),
    costAllocation: mmisCostAllocationSchema,
    costAllocationNarrative: costAllocationNarrativeSchema,
    quarterlyFFP: Joi.any() // quarterlyFFP is validated in the budget
  }),
  securityPlanning: securityPlanningSchema,
  assurancesAndCompliances: mmisAssurancesAndComplianceSchema,
  budget: Joi.object({
    _id: Joi.any(),
    __v: Joi.any(),
    __t: Joi.any(),
    years: Joi.any(),
    mmis: Joi.any(),
    combined: Joi.any(),
    ddi: Joi.any(),
    mando: Joi.any(),
    activityTotals: Joi.any(),
    activities: budgetActivitiesSchema
  })
});
