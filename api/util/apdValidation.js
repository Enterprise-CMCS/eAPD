const {
  activitiesDashboard, // copied, only really validating non-empty array

  // activityOverview,
  activitySummary, // modified schema to export individual fields
  activityDescription, // modified schema to export individual fields

  apdOverview, // used, added hack to workaround fundingSources needing to be passed in
  assurancesAndCompliance, // used

  // costAllocateFFP,
  // otherSources,
  activityCostAllocationFFP, // modified schema to export individual fields
  activityCostAllocationOther, // modified schema to export individual fields

  costAllocateFFPQuarterly, // skipped, problematic
  costAllocation, // used, updated schema

  // incentivePayments,
  proposedBudgetEhAmt, // modified schema to export individual fields
  proposedBudgetEpAmt, // modified schema to export individual fields

  // keyMedicaid,
  medicaidDirector, // modified schema to export individual fields
  medicaidOffice, // modified schema to export individual fields

  keyPerson, // used, issue with bool/string
  milestones, // used

  // nameAndFundingSource,
  activityName, // modified schema to export individual fields
  activityFundingSource, // modified schema to export individual fields

  nonPersonnelCosts, // used
  outcomeMetric, // used
  personCost, // used, added via .keys joi method to statePersonnel

  // plannedActivitySchedule,
  activityStartDate, // modified schema to export individual fields, refactored frontend
  activityEndDate, // modified schema to export individual fields, refactored frontend

  privateContractor, // used, issue with bool/string
  standardsAndConditions, // used, updated schema
  statePersonnel // used, added personCost to it
} = require('@cms-eapd/common');

const Joi = require('joi').extend(require('@joi/date'));

// combine all schemas into one and validate once
// alternatively: loop through each section of APD and validate against respective schema
// compile all errors into new object (based on expectations from frontend)
// return the object of validation errors or null if there are no errors
const validateAPDDoc = apd => {
  const getFundingSources = apd.activities.map(activity => {
    return activity.fundingSource;
  });

  const combinedSchema = Joi.object({
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

  const modifiedApd = {
    ...apd,
    apdOverview: {
      ...apd.apdOverview,
      fundingSources: getFundingSources
    }
  };
  const validationResults = combinedSchema.validate(modifiedApd, {
    abortEarly: false
  });
  console.log(validationResults);
  return apd;
};

module.exports = {
  validateAPDDoc
};
