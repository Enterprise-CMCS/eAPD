const {
  hitechOverviewSchema,
  mmisOverviewSchema,
  keyStatePersonnelSchema,
  statePriortiesAndScopeSchema,
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
  createdAt: Joi.any(),
  updatedAt: Joi.any(),
  apdType: Joi.any(),
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
  createdAt: Joi.any(),
  updatedAt: Joi.any(),
  status: Joi.any(),
  stateId: Joi.any(),
  apdType: Joi.any(),
  name: Joi.string().messages({
    'string.base': 'Provide an APD name',
    'string.empty': 'Provide an APD name'
  }),
  years: Joi.any(),
  yearOptions: Joi.any(),
  apdOverview: mmisOverviewSchema,
  keyStatePersonnel: keyStatePersonnelSchema,
  statePrioritiesAndScope: statePriortiesAndScopeSchema,
  previousActivities: Joi.any(),
  // activities schema copied from schemas/activitiesDashboard.js
  activities: Joi.array()
    .min(1)
    .messages({
      'array.base': 'Activities have not been added for this APD.',
      'array.min': 'Activities have not been added for this APD.'
    })
    .items({
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
    activities: Joi.object().pattern(
      /[a-zA-Z0-9]{8}/,
      Joi.object({
        _id: Joi.any(),
        costsByFFY: Joi.any(),
        quarterlyFFP: Joi.object({
          years: Joi.object().pattern(
            /\d{4}/,
            Joi.object({
              1: Joi.any(),
              2: Joi.any(),
              3: Joi.any(),
              4: Joi.any(),
              subtotal: Joi.object({
                combined: Joi.any(),
                contractors: Joi.object({
                  dollars: Joi.any(),
                  percent: Joi.number().precision(3).valid(1).messages({
                    'any.default':
                      'Private Contractor Costs quarterly percentages must total 100%',
                    'any.only':
                      'Private Contractor Costs quarterly percentages must total 100%'
                  })
                }),
                inHouse: Joi.object({
                  dollars: Joi.any(),
                  percent: Joi.number().precision(3).valid(1).messages({
                    'any.default':
                      'State Staff and Expenses (In-House Costs) quarterly percentages must total 100%',
                    'any.only':
                      'State Staff and Expenses (In-House Costs) quarterly percentages must total 100%'
                  })
                })
              })
            })
          ),
          total: Joi.any()
        })
      })
    )
  })
});
