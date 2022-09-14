const {
  activitiesDashboard, // copied
  activityOverview, // copied
  apdOverview, // used, added hack to workaround fundingSources
  assurancesAndCompliance, // used
  costAllocateFFP, // used, updated schema + frontend
  costAllocateFFPQuarterly,
  costAllocation,
  incentivePayments,
  keyMedicaid,
  keyPerson,
  milestones,
  nameAndFundingSource,
  nonPersonnelCosts,
  otherSources,
  outcomeMetric,
  perconCost,
  plannedActivitySchedule,
  privateContractor,
  standardsAndConditions,
  statePersonnel
} = require('@cms-eapd/common');

const Joi = require('joi');

// combine all schemas into one and validate once
// alternatively: loop through each section of APD and validate against respective schema
// compile all errors into new object (based on expectations from frontend)
// return the object of validation errors or null if there are no errors
const validateAPDDoc = apd => {
  const fundingSources = apd.activities.map(activity => {
    return activity.fundingSource;
  });
  const combinedSchema = Joi.object({
    // activities schema copied from schemas/activitiesDashboard.js
    name: Joi.any(),
    years: Joi.any(),
    apdOverview: apdOverview,
    keyStatePersonnel: Joi.any(),
    previousActivities: Joi.any(),
    activities: Joi.array()
      .min(1)
      .messages({
        'array.min': 'Activities have not been added for this APD.'
      })
      .items({
        alternatives: Joi.any(),
        contractorResources: Joi.any(),
        costAllocation: costAllocateFFP,
        costAllocationNarrative: Joi.any(),
        // summary and description schema copied from schemas/activitiesDashboard.js
        summary: Joi.string().trim().min(1).required().messages({
          'string.base': 'Provide a short overview of the activity.',
          'string.empty': 'Provide a short overview of the activity.',
          'string.min': 'Provide a short overview of the activity.'
        }),
        description: Joi.string().trim().min(1).required().messages({
          'string.base': 'Provide details to explain this activity.',
          'string.empty': 'Provide details to explain this activity.',
          'string.min': 'Provide details to explain this activity.'
        }),
        expenses: Joi.any(),
        fundingSource: Joi.any(),
        outcomes: Joi.any(),
        name: Joi.any(),
        plannedEndDate: Joi.any(),
        plannedStartDate: Joi.any(),
        schedule: Joi.any(),
        standardsAndConditions: Joi.any(),
        statePersonnel: Joi.any(),
        quarterlyFFP: Joi.any()
      }),
    proposedBudget: Joi.any(),
    assurancesAndCompliances: assurancesAndCompliance
  });
  const modifiedApd = {
    ...apd,
    apdOverview: {
      ...apd.apdOverview,
      fundingSources: fundingSources
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
