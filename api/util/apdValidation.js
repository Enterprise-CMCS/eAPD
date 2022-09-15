const {
  activitiesDashboard, // copied
  activityOverview, // copied
  apdOverview, // used, added hack to workaround fundingSources
  assurancesAndCompliance, // used
  costAllocateFFP, // used, updated schema + frontend
  costAllocateFFPQuarterly, // not used, problematic
  costAllocation, // used, updated schema
  incentivePayments, // skipped, need to refactor schema + frontend
  keyMedicaid, // copied
  keyPerson, // skipped, validation expecting strings but initial values seem to be booleans?
  milestones, // used
  nameAndFundingSource, // copied
  nonPersonnelCosts, // used
  otherSources, // skipped, need to integrate/update existing schema
  outcomeMetric, // used
  personCost, // used, added via .keys joi method to statePersonnel
  plannedActivitySchedule, // copied, could be refactored potentially
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
      // medicaidDirector and medicaidOffice schema copied from schemas/keyMedicaid.js
      medicaidDirector: Joi.object().keys({
        name: Joi.string().required().messages({
          'string.base': 'Provide the name of the State Medicaid Director.',
          'string.empty': 'Provide the name of the State Medicaid Director.',
          'string.min': 'Provide the name of the State Medicaid Director.',
          'string.required': 'Provide the name of the State Medicaid Director.'
        }),
        email: Joi.string().required().messages({
          'string.base':
            'Provide the email address of the State Medicaid Director.',
          'string.empty':
            'Provide the email address of the State Medicaid Director.'
        }),
        phone: Joi.string().required().messages({
          'string.base':
            'Provide a valid phone number for the State Medicaid Director.',
          'string.empty':
            'Provide a valid phone number for the State Medicaid Director.'
        })
      }),
      medicaidOffice: Joi.object({
        address1: Joi.string().min(1).required().messages({
          'string.base':
            'Provide a mailing street address for the Medicaid office.',
          'string.empty':
            'Provide a mailing street address for the Medicaid office.'
        }),
        address2: Joi.any(), // manually added field
        state: Joi.any(), // manually added field
        city: Joi.string().min(1).required().messages({
          'string.base': 'Provide a city name.',
          'string.empty': 'Provide a city name.'
        }),
        zip: Joi.string().required().messages({
          'string.base': 'Provide a zip code.',
          'string.empty': 'Provide a zip code.'
        })
      }),
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
        expenses: Joi.array().items(nonPersonnelCosts),
        // fundingSource schema copied from schemas/nameAndFundingSource.js
        fundingSource: Joi.string().required().messages({
          'string.base': 'Must select program type.',
          'string.empty': 'Must select program type.'
        }),
        outcomes: Joi.array().items(outcomeMetric),
        // name schema copied from schemas/nameAndFundingSource.js
        name: Joi.string().required().messages({
          'string.base': 'Activity Name is required.',
          'string.empty': 'Activity Name is required.'
        }),
        plannedEndDate: Joi.date()
          .format('YYYY-MM-DD')
          .iso()
          .allow('')
          .min(Joi.ref('plannedStartDate'))
          .messages({
            'date.format': 'Provide an end date.',
            'date.min': 'Provide an end date that is after the start date.',
            'any.ref': 'Provide an end date that is after the start date.'
          }),
        plannedStartDate: Joi.date()
          .format('YYYY-MM-DD')
          .iso()
          .required()
          .messages({
            'date.required': 'Provide a start date.',
            'date.base': 'Provide a start date.',
            'date.empty': 'Provide a start date.',
            'date.format': 'Provide a start date.'
          }),
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
