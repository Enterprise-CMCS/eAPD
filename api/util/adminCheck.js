const {
  hitechCombinedSchema,
  mmisCombinedSchema,
  APD_TYPE
} = require('@cms-eapd/common');

/**
 * Builds an error list for use in the frontend admin check panel
 * @param {Array} validationResults An array of errors
 * @returns an array of errors with section name, url, message
 */
const buildErrorList = (validationResults, apdId, activityIndexes) => {
  const getActivitiesName = errorPath => {
    const subSectionNameDict = {
      fundingSource: 'Activity Overview',
      name: 'Activity Overview',
      activityOverview: 'Activity Overview',
      summary: 'Activity Overview',
      description: 'Activity Overview',
      standardsAndConditions: 'Activity Overview',
      updateStatus: 'Activity Overview',
      isUpdateAPD: 'Activity Overview',
      annualUpdate: 'Activity Overview',
      asNeededUpdate: 'Activity Overview',
      activitySchedule: 'Activity Schedule',
      plannedStartDate: 'Activity Schedule',
      plannedEndDate: 'Activity Schedule',
      analysisOfAlternativesAndRisks: 'Analysis of Alternatives and Risks',
      conditionsForEnhancedFunding: 'Conditions for Enhanced Funding',
      milestones: 'Outcomes and Milestones',
      outcomes: 'Outcomes and Milestones',
      statePersonnel: 'State Staff and Expenses',
      expenses: 'State Staff and Expenses',
      contractorResources: 'Private Contractor Costs',
      costAllocation: 'Cost Allocation',
      costAllocationNarrative: 'Cost Allocation'
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
    // is used on two pages of the app. This handles mapping ffp to the
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
      statePrioritiesAndScope: 'State Priorities and Scope',
      previousActivities: 'Previous Activities',
      activities: getActivitiesName(errorPath),
      proposedBudget: 'Proposed Budget',
      securityPlanning: 'Security Planning',
      assurancesAndCompliances: 'Assurances and Compliance',
      budget: getActivitiesName(errorPath)
    };

    return `${sectionNameDict[errorPath[0]]}`;
  };

  const getActivitiesURLPath = errorPath => {
    const subSectionURLPath = {
      fundingSource: 'overview',
      name: 'overview',
      activityOverview: 'overview',
      description: 'overview',
      summary: 'overview',
      standardsAndConditions: 'overview',
      activitySchedule: 'overview',
      plannedStartDate: 'overview',
      plannedEndDate: 'overview',
      analysisOfAlternativesAndRisks: 'alternatives-risks',
      conditionsForEnhancedFunding: 'enhanced-funding',
      milestones: 'oms',
      outcomes: 'oms',
      statePersonnel: 'state-costs',
      expenses: 'state-costs',
      contractorResources: 'contractor-costs',
      costAllocation: 'cost-allocation',
      costAllocationNarrative: 'cost-allocation'
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
      statePrioritiesAndScope: 'priorities-scope',
      previousActivities: 'previous-activities',
      activities: getActivitiesURLPath(errorPath),
      proposedBudget: 'proposed-budget',
      securityPlanning: 'security-planning',
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
 * Manually check for HITECH validation errors
 * @param {Object} apd The full HITECH  APD
 * @returns an array of errors with section name, url, message
 */
const getManualHitechValidations = apd => {
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
 * Manually check for MMIS validation errors
 * @param {Object} apd The full MMIS APD
 * @returns an array of errors with section name, url, message
 */
const getManualMmisValidations = apd => {
  /*
   *  {
   *    message: 'Blah blah blah'
   *    path: [ 'activities', 0, 'costAllocation', 'years', '2022', 'other' ],
   *  }
   */

  const results = [];
  if (apd) {
    // do something
  }
  return results;
};

/**
 * Validates entire APD object using a combined schema. Schemas
 * are shared with the frontend to support inline field-level validation
 * @param {Object} apd The full apd
 * @returns an array of validation errors
 */
const adminCheckHitechApd = apd => {
  // apdOverview Schema relies on knowing the funding source(s)
  // to do a conditional validation.
  const getFundingSources = apd?.activities
    ?.map(activity => {
      return activity.fundingSource;
    })
    .filter(values => values !== null); // when activities are added the type is initially null

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
    hitechCombinedSchema.validate(modifiedApd, {
      abortEarly: false
    });

  const manualValidations = getManualHitechValidations(apd);

  const validationResults = [...schemaValidation, ...manualValidations];

  const errorList = buildErrorList(validationResults, apd._id, activityIndexes); // eslint-disable-line no-underscore-dangle
  return errorList;
};

const adminCheckMmisApd = apd => {
  const activityIndexes = {};
  apd?.activities?.forEach((activity, index) => {
    activityIndexes[activity.activityId] = index;
  });

  const { error: { details: schemaValidation = [] } = {} } =
    mmisCombinedSchema.validate(apd, {
      abortEarly: false
    });

  const manualValidations = getManualMmisValidations(apd);

  const validationResults = [...schemaValidation, ...manualValidations];
  const errorList = buildErrorList(validationResults, apd._id, activityIndexes); // eslint-disable-line no-underscore-dangle
  return errorList;
};

const adminCheckApd = apd => {
  switch (apd.apdType) {
    case APD_TYPE.HITECH:
      return adminCheckHitechApd(apd);
    case APD_TYPE.MMIS:
      return adminCheckMmisApd(apd);
    default:
      return [
        {
          message: 'APD Type is invalid.',
          path: ['apdType']
        }
      ];
  }
};

module.exports = {
  adminCheckApd
};
