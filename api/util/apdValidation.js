const { combinedSchemas } = require('@cms-eapd/common');

/**
 * Builds an error list for use in the frontend admin check panel
 * @param {Array} validationResults An array of errors
 * @returns an array of errors with section name, url,
 * error message and completion status
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
 * Schemas are shared with the frontend to support inline
 * and field-level validation
 * @param {Object} apd The full apd object
 * @returns an array of validation errors
 * }
 */
const validateAPDDoc = apd => {
  // apdOverview Schema relies on knowing the funding source(s)
  // to do a conditional validation
  const getFundingSources = apd?.activities?.map(activity => {
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

  const validationResults = combinedSchemas.validate(modifiedApd, {
    abortEarly: false
  });

  if (!validationResults.error) {
    return null;
  }

  const errorList = buildErrorList(validationResults, apd._id);

  return errorList;
};

module.exports = {
  validateAPDDoc
};
