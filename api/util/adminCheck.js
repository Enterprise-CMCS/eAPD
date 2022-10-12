const { combinedSchemas } = require('@cms-eapd/common');

/**
 * Builds an error list for use in the frontend admin check panel
 * @param {Array} validationResults An array of errors
 * @returns an array of errors with section name, url,
 * error message and completion status
 */
const buildErrorList = (validationResults, apdId, activityIndexes) => {
  const getActivitiesName = errorPath => {
    const subSectionNameDict = {
      contractorResources: 'Private Contractor Costs',
      costAllocation: 'Cost Allocation',
      costAllocationNarrative: 'Cost Allocation',
      description: 'Activity Overview',
      name: 'Activity Overview',
      fundingSource: 'Activity Overview',
      expenses: 'State Staff and Expenses',
      outcomes: 'Outcomes and Milestones',
      plannedEndDate: 'Activity Schedule',
      plannedStartDate: 'Activity Schedule',
      schedule: 'Outcomes and Milestones',
      standardsAndConditions: 'Activity Overview',
      statePersonnel: 'State Staff and Expenses',
      summary: 'Activity Overview'
    };

    if (typeof errorPath[1] === 'undefined') {
      return `Activities`;
    }

    // Edge cases
    if (
      [
        'budget',
        'activities',
        'quarterlyFFP',
        'years',
        'subtotal',
        'percent'
      ].every(val => errorPath.includes(val))
    ) {
      return `Activity ${activityIndexes[errorPath[2]] + 1} Budget and FFP`;
    }
    if (
      ['activities', 'costAllocation', 'ffp'].every(val =>
        errorPath.includes(val)
      )
    ) {
      return `Activity ${errorPath[1] + 1} Budget and FFP`;
    }

    return `Activity ${errorPath[1] + 1} ${subSectionNameDict[errorPath[2]]}`;
  };

  const getSectionName = errorPath => {
    const sectionNameDict = {
      apdOverview: 'APD Overview',
      keyStatePersonnel: 'Key State Personnel',
      previousActivities: 'Previous Activities',
      activities: getActivitiesName(errorPath),
      proposedBudget: 'Proposed Budget',
      assurancesAndCompliances: 'Assurances and Compliance',
      budget: getActivitiesName(errorPath)
    };

    return `${sectionNameDict[errorPath[0]]}`;
  };

  const getActivitiesURLPath = errorPath => {
    const subSectionURLPath = {
      contractorResources: 'contractor-costs',
      costAllocation: 'cost-allocation',
      costAllocationNarrative: 'cost-allocation',
      description: 'overview',
      expenses: 'state-costs',
      outcomes: 'oms',
      plannedEndDate: 'overview',
      plannedStartDate: 'overview',
      name: 'overview',
      fundingSource: 'overview',
      schedule: 'oms',
      standardsAndConditions: 'overview',
      statePersonnel: 'state-costs',
      summary: 'overview'
    };

    if (typeof errorPath[1] === 'undefined') {
      return `activities`;
    }

    return `activity/${errorPath[1]}/${subSectionURLPath[errorPath[2]]}`;
  };

  const getURLPath = errorPath => {
    const sectionURLPath = {
      apdOverview: 'apd-overview',
      keyStatePersonnel: 'state-profile',
      previousActivities: 'previous-activities',
      activities: getActivitiesURLPath(errorPath),
      proposedBudget: 'proposed-budget',
      assurancesAndCompliances: 'assurances-and-compliance'
    };

    // Edge cases
    if (
      [
        'budget',
        'activities',
        'quarterlyFFP',
        'years',
        'subtotal',
        'percent'
      ].every(val => errorPath.includes(val))
    ) {
      return `/apd/${apdId}/activity/${activityIndexes[errorPath[2]]}/ffp`;
    }

    if (
      ['activities', 'costAllocation', 'ffp'].every(val =>
        errorPath.includes(val)
      )
    ) {
      return `/apd/${apdId}/activity/${errorPath[1]}/ffp`;
    }

    return `/apd/${apdId}/${sectionURLPath[errorPath[0]]}`;
  };

  const fullErrorList = validationResults.error.details.map(elem => {
    const sectionName = getSectionName(elem.path);
    const linkURL = getURLPath(elem.path);

    return {
      section: sectionName,
      link: linkURL,
      fieldDescription: elem.message
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
const adminCheckApd = apd => {
  // apdOverview Schema relies on knowing the funding source(s)
  // to do a conditional validation
  const getFundingSources = apd?.activities?.map(activity => {
    return activity.fundingSource;
  });

  let activityIndexes = {};
  const getActivityIndexes = apd?.activities?.forEach((activity, index) => {
    activityIndexes[activity.activityId] = index;
  });

  // Inject funding sources into apd object to support conditional validations
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
    return [];
  }

  const errorList = buildErrorList(validationResults, apd._id, activityIndexes); // eslint-disable-line no-underscore-dangle
  return errorList;
};

module.exports = {
  adminCheckApd
};
