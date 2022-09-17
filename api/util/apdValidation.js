const {
  activitiesDashboard, // copied, only really validating non-empty array

  // activityOverview,
  activitySummary, // modified schema to export individual fields
  activityDescription, // modified schema to export individual fields

  apdOverview, // used, added hack to workaround fundingSources
  assurancesAndCompliance, // used
  costAllocateFFP, // used, updated schema + frontend
  costAllocateFFPQuarterly, // skipped, problematic
  costAllocation, // used, updated schema
  incentivePayments, // skipped, need to refactor schema + frontend

  // keyMedicaid,
  medicaidDirector, // modified schema to export individual fields
  medicaidOffice, // modified schema to export individual fields

  keyPerson, // skipped, validation expecting strings but initial values seem to be booleans?
  milestones, // used

  // nameAndFundingSource,
  activityName, // modified schema to export individual fields
  activityFundingSource, // modified schema to export individual fields

  nonPersonnelCosts, // used
  otherSources, // skipped, need to integrate/update existing schema
  outcomeMetric, // used
  personCost, // used, added via .keys joi method to statePersonnel

  // plannedActivitySchedule,
  activityStartDate, // modified schema to export individual fields, refactored frontend
  activityEndDate, // modified schema to export individual fields, refactored frontend

  privateContractor, // used, issue with useHourly being a bool and validation expecting string
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
      keyPersonnel: Joi.array().items(Joi.any())
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
        costAllocation: costAllocateFFP,
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
      incentivePayments: Joi.any()
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
