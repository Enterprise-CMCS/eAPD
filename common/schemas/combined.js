const {
  activitiesDashboard,
  activitySummary,
  activityDescription,
  apdOverview,
  assurancesAndCompliance,
  activityCostAllocationFFP,
  activityCostAllocationOther,
  // costAllocateFFPQuarterly, can't use because it validates against a calculated value
  costAllocation,
  proposedBudgetEhAmt,
  proposedBudgetEpAmt,
  medicaidDirector,
  medicaidOffice,
  keyPerson,
  milestones,
  activityName,
  activityFundingSource,
  nonPersonnelCosts,
  outcomeMetric,
  personCost,
  activityStartDate,
  activityEndDate,
  privateContractor,
  standardsAndConditions,
  statePersonnel
} = require('./index');

const Joi = require('joi');

const combinedApdSchema = Joi.object({
  _id: Joi.any(),
  name: Joi.any(),
  years: Joi.any(),
  apdOverview: apdOverview,
  keyStatePersonnel: Joi.object({
    medicaidDirector: medicaidDirector,
    medicaidOffice: medicaidOffice,
    keyPersonnel: Joi.array().items(keyPerson)
  }),
  previousActivities: Joi.any(),
  // activities schema copied from schemas/activitiesDashboard.js
  activities: Joi.array()
    .min(1)
    .messages({
      'array.min': 'Activities have not been added for this APD.'
    })
    .items({
      alternatives: Joi.any(),
      contractorResources: Joi.array().items(privateContractor),
      costAllocation: Joi.object().pattern(
        /\d{4}/,
        Joi.object({
          ffp: activityCostAllocationFFP,
          other: activityCostAllocationOther
        })
      ),
      costAllocationNarrative: costAllocation,
      summary: activitySummary,
      description: activityDescription,
      expenses: Joi.array().items(nonPersonnelCosts),
      fundingSource: activityFundingSource,
      outcomes: Joi.array().items(outcomeMetric),
      name: activityName,
      plannedEndDate: activityEndDate,
      plannedStartDate: activityStartDate,
      schedule: Joi.array().items(milestones),
      standardsAndConditions: standardsAndConditions,
      statePersonnel: Joi.array().items(
        statePersonnel.keys({
          years: personCost
        })
      ),
      quarterlyFFP: Joi.any()
    }),
  proposedBudget: Joi.object({
    incentivePayments: Joi.object({
      ehCt: Joi.any(),
      epCt: Joi.any(),
      ehAmt: proposedBudgetEhAmt,
      epAmt: proposedBudgetEpAmt
    })
  }),
  assurancesAndCompliances: assurancesAndCompliance
});

export default combinedApdSchema;
