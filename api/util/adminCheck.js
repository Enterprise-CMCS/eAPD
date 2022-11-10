const { combinedSchemas } = require('@cms-eapd/common');

/**
 * Builds an error list for use in the frontend admin check panel
 * @param {Array} validationResults An array of errors
 * @returns an array of errors with section name, url, message
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
      outcomes: 'Outcomes and Metrics',
      plannedEndDate: 'Activity Schedule and Milestones',
      plannedStartDate: 'Activity Schedule and Milestones',
      schedule: 'Outcomes and Metrics',
      standardsAndConditions: 'Activity Overview',
      statePersonnel: 'State Staff and Expenses',
      summary: 'Activity Overview'
    };

    if (typeof errorPath[1] === 'undefined') {
      return `Activities`;
    }

    // Edge case #1: The budget holds a calculated value that we validate
    // against. Since it's not part of the apd object, we handle it here
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
    // Edge case #2: The costAllocation section of the apd data structure
    // is used on two pages of the app. This handles mapping fpp to the
    // Budget and FFP page instead of the Cost Allocation and Other Funding page
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
      plannedEndDate: 'schedule-and-milestones',
      plannedStartDate: 'schedule-and-milestones',
      name: 'overview',
      fundingSource: 'overview',
      schedule: 'schedule-and-milestones',
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

    // Edge case #1: The budget holds a calculated value that we validate
    // against. Since it's not part of the apd object, we handle it here
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

    // Edge case #2: The costAllocation section of the apd data structure
    // is used on two pages of the app. This handles mapping fpp to the
    // Budget and FFP page instead of the Cost Allocation and Other Funding page
    if (
      ['activities', 'costAllocation', 'ffp'].every(val =>
        errorPath.includes(val)
      )
    ) {
      return `/apd/${apdId}/activity/${errorPath[1]}/ffp`;
    }

    return `/apd/${apdId}/${sectionURLPath[errorPath[0]]}`;
  };

  const fullErrorList = validationResults.map(elem => {
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
 * Manually check for validation errors
 * @param {Object} apd The full APD
 * @returns an array of errors with section name, url, message
 */
const getManualValidations = apd => {
  /*
   *  {
   *    message: 'Blah blah blah'
   *    path: [ 'activities', 0, 'costAllocationNarrative', 'years', '2022', 'otherSources' ],
   *  }
   */

  const results = [];
  apd?.activities?.forEach((activity, index) => {
    Object.keys(activity.costAllocation).forEach(year => {
      if (
        activity.costAllocation[year].other > 0 &&
        activity.costAllocationNarrative.years[year].otherSources === ''
      ) {
        results.push({
          message: 'Provide a description of other funding.',
          path: [
            'activities',
            index,
            'costAllocationNarrative',
            'years',
            year,
            'otherSources'
          ]
        });
      }
    });
  });
  return results;
};

/**
 * Validates entire APD object using a combined schema. Schemas
 * are shared with the frontend to support inline field-level validation
 * @param {Object} apd The full apd
 * @returns an array of validation errors
 * }
 */
const adminCheckApd = apd => {
  // apdOverview Schema relies on knowing the funding source(s)
  // to do a conditional validation
  const getFundingSources = apd?.activities?.map(activity => {
    return activity.fundingSource;
  });

  const activityIndexes = {};
  apd?.activities?.forEach((activity, index) => {
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

  const { error: { details: schemaValidation = [] } = {} } =
    combinedSchemas.validate(modifiedApd, {
      abortEarly: false
    });

  const manualValidations = getManualValidations(apd);

  const validationResults = [...schemaValidation, ...manualValidations];

  const errorList = buildErrorList(validationResults, apd._id, activityIndexes); // eslint-disable-line no-underscore-dangle
  return errorList;
};

module.exports = {
  adminCheckApd
};
