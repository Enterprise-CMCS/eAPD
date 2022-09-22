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
} = require('@cms-eapd/common');

const Joi = require('joi');

const combinedSchema = Joi.object({
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

/**
 * Builds an error list for use in the admin check panel
 * @param {Array} validationResults An array of errors
 * @returns an array of errors with section name, url, error message
 * }
 */
const buildErrorList = (validationResults, apdId) => {
  const getSectionName = errorPath => {
    const subSectionNameDict = {
      contractorResources: 'Private Contractor Costs',
      costAllocation: 'Cost Allocation',
      description: 'Activity Overview',
      expenses: 'State Staff and Expenses',
      outcomes: 'Outcomes and Milestones',
      plannedEndDate: 'Activity Schedule',
      plannedStartDate: 'Activity Schedule',
      schedule: 'Outcomes and Milestones',
      standardsAndConditions: 'Activity Overview',
      statePersonnel: 'State Staff and Expenses',
      summary: 'Activity Overview'
    };
    const sectionNameDict = {
      apdOverview: 'Activity Overview',
      keyStatePersonnel: 'Key State Personnel',
      previousActivities: 'Previous Activities',
      activities: `Activity ${errorPath[1] + 1} ${
        subSectionNameDict[errorPath[2]]
      }`,
      proposedBudget: 'Proposed Budget',
      assurancesAndCompliances: 'Assurances and Compliance'
    };

    return `${sectionNameDict[errorPath[0]]}`;
  };

  const getURLPath = errorPath => {
    const subSectionURLPath = {
      contractorResources: 'contractor-costs',
      costAllocation: 'cost-allocation',
      description: 'overview',
      expenses: 'state-costs',
      outcomes: 'oms',
      plannedEndDate: 'overview',
      plannedStartDate: 'overview',
      schedule: 'oms',
      standardsAndConditions: 'overview',
      statePersonnel: 'state-costs',
      summary: 'overview'
    };
    const sectionURLPath = {
      apdOverview: 'apd-overview',
      keyStatePersonnel: 'state-profile',
      previousActivities: 'previous-activities',
      activities: `activities/${errorPath[1]}/${
        subSectionURLPath[errorPath[2]]
      }`,
      proposedBudget: 'proposed-budget',
      assurancesAndCompliances: 'assurances-and-compliance'
    };

    return `/apd/${apdId}/${sectionURLPath[errorPath[0]]}`;
  };

  const fullErrorList = validationResults.error.details.map(elem => {
    const sectionName = getSectionName(elem.path);
    const linkURL = getURLPath(elem.path);

    return {
      section: sectionName,
      link: linkURL,
      fieldDescription: elem.message,
      complete: false
    };
  });

  return fullErrorList;
};

/**
 * Validates entire APD object using a combined schema
 * Schemas are shared with the frontend to support inline validation
 * @param {Object} apd The full apd object
 * @returns an array of validation errors
 * }
 */
const validateAPDDoc = apd => {
  // apdOverview Schema relies on knowing the funding source(s)
  // to do a conditional validation
  const getFundingSources = apd.activities.map(activity => {
    return activity.fundingSource;
  });

  // Inject funding sources into apd object
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

  if (!validationResults.error) {
    return null;
  }

  const errorList = buildErrorList(validationResults, apd._id);
  console.log(errorList);
  return errorList;
};

module.exports = {
  validateAPDDoc
};
