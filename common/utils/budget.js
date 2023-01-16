import roundedPercents from './roundedPercents';
import { arrToObj, convertToNumber } from './formatting';
import { deepCopy, roundObjectValues } from './utils';
import { APD_TYPE } from './constants';

export const CATEGORY_NAMES = [
  'statePersonnel',
  'contractors',
  'expenses',
  'combined'
];

export const FFP_OPTIONS = new Set(['90-10', '75-25', '50-50', '0-100']);

/**
 * Creates a default Funding Source object with years and total.
 * @param {Array} years The list of years in the APD
 * @returns the default Funding Source object
 * e.g. for years: [2022, 2023, 2024] the object would look like
 * {
 *   2022: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *   2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *   2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *   total: { total: 0, federal: 0, medicaid: 0, state: 0 }
 * }
 */
export const getDefaultFundingSourceObject = (years = []) => ({
  ...years.reduce(
    (o, year) => ({
      ...o,
      [year]: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      }
    }),
    {}
  ),
  total: {
    total: 0,
    federal: 0,
    medicaid: 0,
    state: 0
  }
});

/**
 * Creates a default Expense object with Funding Source objects for each
 * expense type
 * @param {Array} years The list of years in the APD
 * @param {Array} names
 * @returns the Expense object
 * e.g. for years: [2022, 2023, 2024] and default names the object would look like
 * {
 *   statePersonnel: {
 *     2022: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *     2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *     2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *     total: { total: 0, federal: 0, medicaid: 0, state: 0 }
 *   },
 *   contractors: {...}, // same as statePersonnel
 *   expenses: {...}, // same as statePersonnel
 *   combined: {...} // same as statePersonnel
 * }
 */
export const getDefaultFundingSourceByCategoryObject = (
  years = [],
  names = CATEGORY_NAMES
) =>
  names.reduce(
    (o, name) => ({
      ...o,
      [name]: getDefaultFundingSourceObject(years)
    }),
    {}
  );

/**
 * Creates a default Federal Share object by year and total.
 * @param {Array} years The list of years in the APD
 * @returns the default Federal Share object
 * e.g. for years: [2022, 2023, 2024] the object would look like
 * {
 *   2022: {
 *     1: { inHouse: 0, contractors: 0, combined: 0 },
 *     2: { inHouse: 0, contractors: 0, combined: 0 },
 *     3: { inHouse: 0, contractors: 0, combined: 0 },
 *     4: { inHouse: 0, contractors: 0, combined: 0 },
 *     subtotal: { inHouse: 0, contractors: 0, combined: 0 }
 *   },
 *   2023: {...}, // same as 2022
 *   2024: {...}, // same as 2022
 *   total: { inHouse: 0, contractors: 0, combined: 0 }
 * }
 */
export const defaultFederalShareByFFYQuarterObject = (years = []) =>
  years.reduce(
    (o, year) => ({
      ...o,
      years: {
        ...o.years,
        [year]: [1, 2, 3, 4].reduce(
          (q, quarter) => ({
            ...q,
            [quarter]: {
              inHouse: 0,
              contractors: 0,
              combined: 0
            }
          }),
          {
            subtotal: {
              inHouse: 0,
              contractors: 0,
              combined: 0
            }
          }
        )
      }
    }),
    {
      years: {},
      total: {
        inHouse: 0,
        contractors: 0,
        combined: 0
      }
    }
  );

/**
 * Creates a default Budget object by years
 * @param {Array} years The list of years in the APD
 * @returns the default Budget object
 * e.g, for years: [2022, 2023, 2024] the object would look like
 * {
 *   federalShareByFFYQuarter: {
 *     hitAndHie: {
 *       years: {
 *         2022: {...}, 2023: {...}, 2024: {...}, total: {...}
 *       }
 *       // see defaultFederalShareByFFYQuarterObject for details
 *     },
 *     mmis: {...} // same as hitAndHie
 *   },
 *   hie: {
 *     statePersonnel: {...}, contractors: {...}, expenses: {...}, combined: {...}
 *     // see getDefaultFundingSourceByCategoryObject for details
 *   },
 *   hit: {...}, // same as hie
 *   mmis: {...}, // same as hie
 *   hitAndHie: {...}, // same as hie
 *   mmisByFFP: {
 *     '90-10': {
 *       2022: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *       2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *       2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *       total: { total: 0, federal: 0, medicaid: 0, state: 0 }
 *       // see getDefaultFundingSourceObject for details
 *     },
 *     '75-25': {...}, // same as '90-10'
 *     '50-50': {...}, // same as '90-10'
 *     '0-100': {...}, // same as '90-10'
 *     combined: {...} // same as '90-10'
 *   },
 *   combined: {
 *     2022: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *     2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *     2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *     total: { total: 0, federal: 0, medicaid: 0, state: 0 }
 *     // see getDefaultFundingSourceObject for details
 *   },
 *   activityTotals: [],
 *   activities: {},
 *   years: [2022, 2023, 2024]
 * }
 */
export const defaultHITECHBudgetObject = (years = []) => ({
  federalShareByFFYQuarter: {
    hitAndHie: defaultFederalShareByFFYQuarterObject(years),
    mmis: defaultFederalShareByFFYQuarterObject(years)
  },
  hie: getDefaultFundingSourceByCategoryObject(years),
  hit: getDefaultFundingSourceByCategoryObject(years),
  mmis: getDefaultFundingSourceByCategoryObject(years),
  hitAndHie: getDefaultFundingSourceByCategoryObject(years),
  mmisByFFP: getDefaultFundingSourceByCategoryObject(years, [
    ...FFP_OPTIONS,
    'combined'
  ]),
  combined: getDefaultFundingSourceObject(years),
  activityTotals: [],
  activities: {},
  years
});

/**
 * Creates a default Budget object by years
 * @param {Array} years The list of years in the APD
 * @returns the default Budget object
 * e.g, for years: [2022, 2023, 2024] the object would look like
 * {
 *   federalShareByFFYQuarter: {
 *     mmis: {
 *       years: {
 *         2022: {...}, 2023: {...}, 2024: {...}, total: {...}
 *       }
 *       // see defaultFederalShareByFFYQuarterObject for details
 *     }
 *   },
 *   mmis: {
 *     statePersonnel: {...}, contractors: {...}, expenses: {...}, combined: {...}
 *     // see getDefaultFundingSourceByCategoryObject for details
 *   },
 *   mmisByFFP: {
 *     '90-10': {
 *       2022: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *       2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *       2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *       total: { total: 0, federal: 0, medicaid: 0, state: 0 }
 *       // see getDefaultFundingSourceObject for details
 *     },
 *     '75-25': {...}, // same as '90-10'
 *     '50-50': {...}, // same as '90-10'
 *     '0-100': {...}, // same as '90-10'
 *     combined: {...} // same as '90-10'
 *   },
 *   combined: {
 *     2022: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *     2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *     2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *     total: { total: 0, federal: 0, medicaid: 0, state: 0 }
 *     // see getDefaultFundingSourceObject for details
 *   },
 *   activityTotals: [],
 *   activities: {},
 *   years: [2022, 2023, 2024]
 * }
 */
export const defaultMMISBudgetObject = (years = []) => ({
  federalShareByFFYQuarter: {
    mmis: defaultFederalShareByFFYQuarterObject(years)
  },
  mmis: getDefaultFundingSourceByCategoryObject(years),
  mmisByFFP: getDefaultFundingSourceByCategoryObject(years, [
    ...FFP_OPTIONS,
    'combined'
  ]),
  combined: getDefaultFundingSourceObject(years),
  activityTotals: [],
  activities: {},
  years
});

/**
 * Creates a default Budget object by years
 * @param {Array} years The list of years in the APD
 * @returns the default Budget object
 * e.g, for years: [2022, 2023, 2024] the object would look like
 * {
 *   mmis: {
 *     hitAndHie: {
 *       years: {
 *         2022: {...}, 2023: {...}, 2024: {...}, total: {...}
 *       }
 *       // see defaultFederalShareByFFYQuarterObject for details
 *     }
 *   },
 *   mmis: {
 *     statePersonnel: {...}, contractors: {...}, expenses: {...}, combined: {...}
 *     // see getDefaultFundingSourceByCategoryObject for details
 *   },
 *   mmisByFFP: {
 *     '90-10': {
 *       2022: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *       2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *       2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *       total: { total: 0, federal: 0, medicaid: 0, state: 0 }
 *       // see getDefaultFundingSourceObject for details
 *     },
 *     '75-25': {...}, // same as '90-10'
 *     '50-50': {...}, // same as '90-10'
 *     '0-100': {...}, // same as '90-10'
 *     combined: {...} // same as '90-10'
 *   },
 *   combined: {
 *     2022: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *     2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *     2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *     total: { total: 0, federal: 0, medicaid: 0, state: 0 }
 *     // see getDefaultFundingSourceObject for details
 *   },
 *   activityTotals: [],
 *   activities: {},
 *   years: [2022, 2023, 2024]
 * }
 */
export const defaultBudgetObject = (years = []) => ({
  combined: getDefaultFundingSourceObject(years),
  activityTotals: [],
  activities: {},
  years
});

/**
 * Creates a default quarterly FFP object by FFYs
 * @param {Array} years The list of years in the APD
 * @returns the default quarterly FFP
 * e.g. for years: [2022, 2023, 2024] the object would look like
 * {
 *   costsByFFY: {
 *     2022: { federal: 0, medicaid: 0, state: 0, total: 0 },
 *     2023: { federal: 0, medicaid: 0, state: 0, total: 0 },
 *     2024: { federal: 0, medicaid: 0, state: 0, total: 0 },
 *     total: { federal: 0, medicaid: 0, state: 0, total: 0 },
 *   },
 *   quarterlyFFP: {
 *     years:  {
 *       2022: {
 *         1: {
 *           combined: { dollars: 0, percent: 0 },
 *           contractors: { dollars: 0, percent: 0 },
 *           inHouse: { dollars: 0, percent: 0 }
 *         },
 *         2: {...}, // same as 1
 *         3: {...}, // same as 1
 *         4: {...}, // same as 1
 *         subtotal: {...} // same as 1
 *       }
 *     },
 *     2023: {...}, // same as 2022
 *     2024: {...}, // same as 2022
 *     total: { combined: 0, contractors: 0, inHouse: 0 }
 *   }
 * }
 */
export const defaultQuarterlyFFPObject = (years = []) => ({
  costsByFFY: {
    ...arrToObj(years, () => ({
      federal: 0,
      medicaid: 0,
      state: 0,
      total: 0
    })),
    total: {
      federal: 0,
      medicaid: 0,
      state: 0,
      total: 0
    }
  },
  quarterlyFFP: {
    years: {
      ...arrToObj(years, () => ({
        ...arrToObj(['1', '2', '3', '4'], () => ({
          combined: { dollars: 0, percent: 0 },
          contractors: { dollars: 0, percent: 0 },
          inHouse: { dollars: 0, percent: 0 }
        })),
        subtotal: {
          combined: { dollars: 0, percent: 0 },
          contractors: { dollars: 0, percent: 0 },
          inHouse: { dollars: 0, percent: 0 }
        }
      }))
    },
    total: {
      combined: 0,
      contractors: 0,
      inHouse: 0
    }
  }
});

/**
 * Creates a default Activity Totals data object
 * @param {Array} years The list of years in the APD
 * @returns the default activity totals object
 * e.g. for years: [2022, 2023, 2024] the object would look like
 * {
 *   combined: { 2022: 0, 2023: 0, 2024: 0, total: 0 },
 *   contractors: { 2022: 0, 2023: 0, 2024: 0, total: 0 },
 *   expenses: { 2022: 0, 2023: 0, 2024: 0, total: 0 },
 *   otherFunding: {
 *     2022: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
 *     2023: { ... }, // same as 2022
 *     2024: { ... }, // same as 2022
 *   },
 *   statePersonnel: { 2022: 0, 2023: 0, 2024: 0, total: 0 }
 * }
 */
export const defaultActivityTotalsDataObject = (years = []) => ({
  combined: { ...arrToObj(years, 0), total: 0 },
  contractors: { ...arrToObj(years, 0), total: 0 },
  expenses: { ...arrToObj(years, 0), total: 0 },
  otherFunding: {
    ...arrToObj(years, () => ({
      contractors: 0,
      expenses: 0,
      statePersonnel: 0,
      total: 0
    }))
  },
  statePersonnel: { ...arrToObj(years, 0), total: 0 }
});

/**
 * Get the state and federal share of costs for an amount for
 * a given year of the current activity.
 * @param {Object} activity The activity budget object
 * @param {String} year As a four-character year string (e.g., '2018')
 * @param {Number} amount The amount to allocate over state and federal shares
 * @returns {Object} The state and federal share
 * e.g. for amount 1,000 returns { stateShare: 900, fedShare: 100 }
 */
export const getSharesOfTotalMedicaidCost = ({
  activity,
  year,
  amount = 0
} = {}) => {
  /**
   * example costAllocation object:
   * {
   *   costAllocation: {
   *     '2022': {
   *       ffp: { federal: 90, state: 10 },
   *       other: 105000
   *     },
   *     ...
   *   }
   * }
   * return the costAllocation as percentages
   */
  const [fedShare, stateShare] = roundedPercents(convertToNumber(amount), [
    (activity?.costAllocation?.[year]?.ffp?.federal || 0) / 100,
    (activity?.costAllocation?.[year]?.ffp?.state || 0) / 100
  ]);
  return { fedShare, stateShare };
};

/**
 * Updates the state personnel list and adds the key personnel with costs
 * to the list, if the activity is a Program Administration activity.
 * @param {String} name Activity name
 * @param {Array} statePersonnel List of state personnel for the activity
 * @param {Array} keyPersonnel List of key personnel for the APD
 * @returns {Array} The updated state personnel list
 */
export const updateStatePersonnel = ({
  name,
  statePersonnel,
  keyPersonnel
} = {}) => {
  if (Array.isArray(statePersonnel)) {
    const updatedStatePersonnel = [...statePersonnel];
    // If this is the Program Administration activity, add the APD key
    // personnel to it so they get included in downstream calculations.
    // TODO: Don't rely on the activity name. Instead, this should always be
    // activity index 0. However, that will require some tweaks to the tests.
    // Program Administration is the only activity that needs the key personnel
    // because it deals with the project overhead and is only used in HITECH APDs.
    if (name === 'Program Administration' && Array.isArray(keyPersonnel)) {
      updatedStatePersonnel.push(
        ...keyPersonnel
          .filter(kp => kp.hasCosts)
          .map(({ costs = {}, fte = {} }) => ({
            years: Object.keys(costs).reduce(
              (o, ffy) => ({
                ...o,
                [ffy]: { amt: costs[ffy] || 0, perc: fte[ffy] || 0 }
              }),
              {}
            )
          }))
      );
    }
    return updatedStatePersonnel;
  }
  return [];
};

// Todo: Add comment block documenting how this works
export const calculateKeyStatePersonnelCost = (keyPersonnel, year) => {
  // Need to figure out here what the cost should be per year.
  // Should it be the straight cost? Is it Cost x FTE. Is it Cost x FTE x Split(Fed/State)?

  // Assuming we just want the Cost X FTE here...
  // Also, do we need to check if `hasCosts === true`?
  if (keyPersonnel.costs?.[year] !== undefined) {
    const costs = keyPersonnel?.costs?.[year] || 0;
    const fte = keyPersonnel?.fte?.[year] || 0;
    return keyPersonnel?.fte?.[year] !== undefined
      ? convertToNumber(costs || 0) * convertToNumber(fte || 0)
      : costs;
  }
  return 0;
};

// Todo: Add comment block documenting how this works
export const calulateKeyStatePersonnelFedShare = (keyPersonnel, year) => {
  // Return the (cost * fte) * fed-split percentage
  return (
    keyPersonnel?.costs[year] *
    keyPersonnel?.fte[year] *
    (keyPersonnel?.split[year].federal / 100)
  );
};

// Todo: Add comment block documenting how this works
export const calulateKeyStatePersonnelStateShare = (keyPersonnel, year) => {
  // Return the (cost * fte) * state-split percentage
  return (
    keyPersonnel?.costs[year] *
    keyPersonnel?.fte[year] *
    (keyPersonnel?.split[year].state / 100)
  );
};

// Todo: Add comment block documenting how this works
// Tif question: what should this be?
export const calulateKeyStatePersonnelMedicaidShare = (keyPersonnel, year) => {
  keyPersonnel + year;
  return 0;
};

/**
 * For MMIS APDs app the key state personnel costs to the budget
 * before iterating over the activities and adding those costs.
 * @param {Object} budget The current budget object
 * @param {String} year As a four-character year string (e.g., '2018')
 * @param {Array} keyPersonnel List of key personnel for the APD
 * @returns {Object} an updated budget with key state personnel costs included
 */
export const addKeyStatePersonnel = ({ budget, years, keyPersonnel }) => {
  // Basically need to do everything the calculate budget does but only for
  // parts of the budget that are impacted by the Key State Personnel. So
  // just start bringing in each calculate budget function and refactor it
  // to work with just the key state personnel

  // Hackily update the mmis budget to have a default keyStatePersonnel object
  // Todo: make this not hacky. Refactor the defaultMMISBudgetObject above
  budget.mmis = {
    ...budget.mmis,
    keyStatePersonnel: getDefaultFundingSourceObject(years)
  };

  let updatedBudget = deepCopy(budget);
  if (Array.isArray(keyPersonnel)) {
    keyPersonnel?.forEach(keyPersonnel => {
      // Totals here is the initial value seen below which is the budget
      updatedBudget = years.reduce((budget, year) => {
        // For this first pass through, refactor the below code(from sumCostsForFundingSourceByCategory) to
        // add the keyPersonnel costs to the combined[year] and combined.total.total
        // This will need to be refactored to get cost based on split and/or FTE
        const cost = calculateKeyStatePersonnelCost(keyPersonnel, year);
        if (budget?.combined?.[year]?.total !== undefined) {
          budget.combined[year].total += cost;
        }
        if (budget?.combined?.total?.total !== undefined) {
          budget.combined.total.total += cost;
        }

        // Next we imitate sumShareCostsForFundingSource to update the mmis funding source budget.
        // Note: Not 100% sure this is needed. Need to understand if this needs to happen or only the sumMMISbyFFP
        // Todo: determine how to compute costCategoryShare
        budget['mmis']['keyStatePersonnel'][year].federal +=
          calulateKeyStatePersonnelFedShare(keyPersonnel, year);
        budget['mmis']['keyStatePersonnel'].total.federal +=
          calulateKeyStatePersonnelFedShare(keyPersonnel, year);

        budget['mmis']['keyStatePersonnel'][year].state +=
          calulateKeyStatePersonnelStateShare(keyPersonnel, year);
        budget['mmis']['keyStatePersonnel'].total.state +=
          calulateKeyStatePersonnelStateShare(keyPersonnel, year);

        budget['mmis']['keyStatePersonnel'][year].medicaid +=
          calulateKeyStatePersonnelMedicaidShare(keyPersonnel, year);
        budget['mmis']['keyStatePersonnel'].total.medicaid +=
          calulateKeyStatePersonnelMedicaidShare(keyPersonnel, year);

        // Plus the subtotals for the cost categories (i.e., the Medicaid share)
        budget['mmis'].combined[year].federal +=
          calulateKeyStatePersonnelFedShare(keyPersonnel, year);
        budget['mmis'].combined.total.federal +=
          calulateKeyStatePersonnelFedShare(keyPersonnel, year);

        budget['mmis'].combined[year].state +=
          calulateKeyStatePersonnelStateShare(keyPersonnel, year);
        budget['mmis'].combined.total.state +=
          calulateKeyStatePersonnelStateShare(keyPersonnel, year);

        budget['mmis'].combined[year].medicaid +=
          calulateKeyStatePersonnelMedicaidShare(keyPersonnel, year);
        budget['mmis'].combined.total.medicaid +=
          calulateKeyStatePersonnelMedicaidShare(keyPersonnel, year);

        return budget;
      }, updatedBudget);
    });
  }

  return updatedBudget;
};

/**
 * The cost from the item by year for the category.
 * statePersonnel is a special case, because it's years don't have a
 * number value, but an object with amount and percent
 * @param {Object} item The item to get the cost from
 * @param {Number} year The FFY
 * @returns {Number} The cost for the item for the year
 */
export const getCostFromItemByYear = (item, year) => {
  if (item?.years?.[year] !== undefined) {
    const costs = item?.years?.[year] || 0;
    return typeof costs === 'object'
      ? convertToNumber(costs?.amt || 0) * convertToNumber(costs?.perc || 0)
      : costs;
  }
  return 0;
};

/**
 * The cost type from the category. If the category is expenses or
 * statePersonnel then it should be converted to inHouse.
 * @param {String} category The category type
 * @returns The cost type
 */
export const getPropCostType = category =>
  category === 'contractors' ? 'contractors' : 'inHouse';

/**
 * Sums up the total costs for the category type and adds them to the
 * activity totals for the category for each year and the total of all
 * years for the category, and the combined cost of all categories
 * for each year and the total of all years.
 * @param {Array} items The list of items of the category type in the activity
 * @param {Object} activityTotals The activity total object
 * @param {*} category The category this cost comes from (e.g., "contractors", "statePersonnel")
 * @returns {Object} the updated activity total object
 */
export const sumActivityTotalByCategories = ({
  items,
  activityTotals,
  category
} = {}) => {
  let updatedActivityTotals = deepCopy(activityTotals);
  if (Array.isArray(items) && activityTotals?.data) {
    items.forEach(item => {
      if (item?.years !== undefined && typeof item.years === 'object') {
        updatedActivityTotals = Object.keys(item.years).reduce(
          (totals, year) => {
            const cost = getCostFromItemByYear(item, year) || 0;
            if (category) {
              if (totals?.data?.[category]?.[year] !== undefined) {
                totals.data[category][year] += cost;
              }
              if (totals?.data?.[category]?.total !== undefined) {
                totals.data[category].total += cost;
              }
            }
            if (totals?.data?.combined?.[year] !== undefined) {
              totals.data.combined[year] += cost;
            }
            if (totals?.data?.combined?.total !== undefined) {
              totals.data.combined.total += cost;
            }
            return totals;
          },
          updatedActivityTotals
        );
      }
    });
  }
  return updatedActivityTotals;
};

/**
 * Sums up the total cost of each category type and adds them to the
 * activity totals for each category for each year and the total of all
 * the years for each category, and the combined total for all categories
 * for each year and the total of all years.
 * @param {Object} activity The APD activity
 * @param {Array} years The list of years in the APD
 * @returns {Object} the activity total object
 */
export const sumActivityTotals = ({ activity, years } = {}) => {
  let activityTotals = {
    id: activity?.activityId?.toString() || '',
    name: activity?.name || '',
    fundingSource: activity?.fundingSource || null,
    data: {}
  };
  activityTotals.data = defaultActivityTotalsDataObject(years);
  activityTotals = sumActivityTotalByCategories({
    items: activity?.contractorResources,
    activityTotals,
    category: 'contractors'
  });
  activityTotals = sumActivityTotalByCategories({
    items: activity?.expenses,
    activityTotals,
    category: 'expenses'
  });
  activityTotals = sumActivityTotalByCategories({
    items: activity?.statePersonnel,
    activityTotals,
    category: 'statePersonnel'
  });
  return activityTotals;
};

/**
 * Sums the costs to the budget running totals. Adds costs to the funding
 * source and category for each year and the total of all years for the
 * category and the combined total for each year and the total of all years
 * for the funding source. If the funding source is HIE or HIT then also
 * add the costs for hitAndHie and category for each year and the total of
 * all the years for the category and the combined total for each year and
 * the total of all years for hitAndHie. Then also add the costs to the
 * combined total for each year and the total of all years.
 * @param {Object} budget The current budget object
 * @param {String} fundingSource The funding source for the Activity (e.g., "HIT", "HIE")
 * @param {String} category The category this cost comes from (e.g., "contractors", "statePersonnel")
 * @param {Array} items The list of items of the category type in the budget (e.g., a personnel in the list of "statePersonnel")
 * @return {Object} The budget object with the totals updated
 */
export const sumCostsForFundingSourceByCategory = ({
  budget,
  fundingSource,
  category,
  items
} = {}) => {
  let updatedBudget = deepCopy(budget);
  if (Array.isArray(items)) {
    items?.forEach(item => {
      if (item?.years) {
        // Totals here is the initial value seen below which is the budget
        updatedBudget = Object.keys(item.years).reduce((totals, year) => {
          const cost = getCostFromItemByYear(item, year);
          // New activities don't have a funding program by default, so in that case,
          // we can't capture program-specific funding numbers.
          if (fundingSource) {
            if (
              totals?.[fundingSource]?.[category]?.[year]?.total !== undefined
            ) {
              totals[fundingSource][category][year].total += cost;
            }
            if (
              totals?.[fundingSource]?.[category]?.total?.total !== undefined
            ) {
              totals[fundingSource][category].total.total += cost;
            }
            if (
              totals?.[fundingSource]?.combined?.[year]?.total !== undefined
            ) {
              totals[fundingSource].combined[year].total += cost;
            }
            if (totals?.[fundingSource]?.combined?.total?.total !== undefined) {
              totals[fundingSource].combined.total.total += cost;
            }

            if (fundingSource === 'hie' || fundingSource === 'hit') {
              if (totals?.hitAndHie?.[category]?.[year]?.total !== undefined) {
                totals.hitAndHie[category][year].total += cost;
              }
              if (totals?.hitAndHie?.[category]?.total?.total !== undefined) {
                totals.hitAndHie[category].total.total += cost;
              }
              if (totals?.hitAndHie?.combined?.[year]?.total !== undefined) {
                totals.hitAndHie.combined[year].total += cost;
              }
              if (totals?.hitAndHie?.combined?.total?.total !== undefined) {
                totals.hitAndHie.combined.total.total += cost;
              }
            }
          }

          if (totals?.combined?.[year]?.total !== undefined) {
            totals.combined[year].total += cost;
          }
          if (totals?.combined?.total?.total !== undefined) {
            totals.combined.total.total += cost;
          }

          return totals;
        }, updatedBudget);
      }
    });
  }
  return updatedBudget;
};

/**
 * Sums up the total costs for all of the categories in the activity.
 * Sum them up by funding source by each category and combined costs
 * and add them to a total combined cost for all funding sources and categories.
 * @param {Object} budget The current budget object
 * @param {Object} activity The APD activity
 * @param {String} fundingSource the funding source for the activity
 * @return {Object} the updated budget object
 */
export const sumTotalCostsByCategory = ({
  budget,
  activity,
  fundingSource
} = {}) => {
  let updatedBudget = deepCopy(budget);
  updatedBudget = sumCostsForFundingSourceByCategory({
    budget: updatedBudget,
    fundingSource,
    category: 'contractors',
    items: activity?.contractorResources || []
  });
  updatedBudget = sumCostsForFundingSourceByCategory({
    budget: updatedBudget,
    fundingSource,
    category: 'expenses',
    items: activity?.expenses || []
  });
  updatedBudget = sumCostsForFundingSourceByCategory({
    budget: updatedBudget,
    fundingSource,
    category: 'statePersonnel',
    items: activity?.statePersonnel || []
  });
  return updatedBudget;
};

/**
 * Sums up the federal, state, medicaid shares and the total costs
 * for each FFY of the activity
 * @param {Object} costsByFFY The costs by FFY
 * @param {Number} year The FFY
 * @param {Number} totalCost the total cost of the activity
 * @param {Object} totalMedicaidCostShares an object of fedShare and stateShare
 * @param {Number} totalMedicaidCost the total medicaid share of the activity
 * @returns the updated costsByFFY, e.g. if the fed split is 90/10 and
 * the total cost is $1000 and the total medicaid costs is $800, then
 * {
 *   '1931': { federal: 360, medicaid: 400, state: 40, total: 500 },
 *   '1932': { federal: 180, medicaid: 200, state: 20, total: 250 },
 *   '1933': { federal: 180, medicaid: 200, state: 20, total: 250 },
 *   total: { federal: 720, medicaid: 800, state: 80, total: 1000 }
 * }
 */
export const sumCostsByFFY = ({
  costsByFFY,
  year,
  totalCost,
  totalMedicaidCostShares,
  totalMedicaidCost = 0
} = {}) => {
  // Record these costs for each FFY of the activity. These are used in
  // the cost allocation display, so the user can see at an activity
  // level their total costs and cost distributions.
  const updatedCostsByFFY = deepCopy(costsByFFY);
  if (costsByFFY && year && totalCost && totalMedicaidCostShares) {
    return {
      ...updatedCostsByFFY,
      [year]: {
        federal: totalMedicaidCostShares?.fedShare || 0,
        medicaid: totalMedicaidCost,
        state: totalMedicaidCostShares?.stateShare || 0,
        total: totalCost
      },
      total: {
        federal:
          updatedCostsByFFY.total.federal + totalMedicaidCostShares.fedShare,
        medicaid: updatedCostsByFFY.total.medicaid + totalMedicaidCost,
        state:
          updatedCostsByFFY.total.state + totalMedicaidCostShares.stateShare,
        total: updatedCostsByFFY.total.total + totalCost
      }
    };
  }
  return updatedCostsByFFY;
};

/**
 * Sum up the federal, state, and medicaid costs for the activity,
 * by funding source (hie, hit, or hitAndHie) and category ('contractors',
 * 'expenses', 'statePersonnel') for each year and the total of all the years,
 * funding source for each year and the total of all the years, and combined
 * for each year and the total of all the years.
 * @param {Object} budget The existing budget
 * @param {String} fundingSource The funding source to update
 * @param {Number} year The FFY
 * @param {Number} totalMedicaidCost the total medicaid share of the activity
 * @param {Object} totalMedicaidCostShares an object of fedShare and stateShare
 * @param {Object} costCategoryShare The share of the costs between the payees (state, federal, medicaid)
 * @returns {Object} the updated budget
 */
export const sumShareCostsForFundingSource = ({
  budget,
  fundingSource,
  year,
  totalMedicaidCost = 0,
  totalMedicaidCostShares,
  costCategoryShare
} = {}) => {
  const updatedBudget = deepCopy(budget);
  if (budget && year && costCategoryShare && totalMedicaidCostShares) {
    // Update the three cost categories for the funding source
    if (
      fundingSource &&
      updatedBudget?.[fundingSource] !== undefined &&
      typeof updatedBudget?.[fundingSource] === 'object'
    ) {
      ['contractors', 'expenses', 'statePersonnel'].forEach(category => {
        if (
          updatedBudget?.[fundingSource]?.[category] !== undefined &&
          typeof updatedBudget?.[fundingSource]?.[category] === 'object'
        ) {
          updatedBudget[fundingSource][category][year].federal +=
            costCategoryShare.fedShare[category];
          updatedBudget[fundingSource][category].total.federal +=
            costCategoryShare.fedShare[category];

          updatedBudget[fundingSource][category][year].state +=
            costCategoryShare.stateShare[category];
          updatedBudget[fundingSource][category].total.state +=
            costCategoryShare.stateShare[category];

          updatedBudget[fundingSource][category][year].medicaid +=
            costCategoryShare.medicaidShare[category];
          updatedBudget[fundingSource][category].total.medicaid +=
            costCategoryShare.medicaidShare[category];
        }
      });

      // Plus the subtotals for the cost categories (i.e., the Medicaid share)
      updatedBudget[fundingSource].combined[year].federal +=
        totalMedicaidCostShares.fedShare;
      updatedBudget[fundingSource].combined.total.federal +=
        totalMedicaidCostShares.fedShare;

      updatedBudget[fundingSource].combined[year].state +=
        totalMedicaidCostShares.stateShare;
      updatedBudget[fundingSource].combined.total.state +=
        totalMedicaidCostShares.stateShare;

      updatedBudget[fundingSource].combined[year].medicaid += totalMedicaidCost;
      updatedBudget[fundingSource].combined.total.medicaid += totalMedicaidCost;
    }
    if (fundingSource !== 'hitAndHie') {
      updatedBudget.combined[year].federal += totalMedicaidCostShares.fedShare;
      updatedBudget.combined.total.federal += totalMedicaidCostShares.fedShare;
      updatedBudget.combined[year].state += totalMedicaidCostShares.stateShare;
      updatedBudget.combined.total.state += totalMedicaidCostShares.stateShare;
      updatedBudget.combined[year].medicaid += totalMedicaidCost;
      updatedBudget.combined.total.medicaid += totalMedicaidCost;
    }
  }

  return updatedBudget;
};

/**
 * Sums the MMIS totals for each category and total of all the categories
 * for each year and the total costs for each year.
 * @param {Object} budget The budget object
 * @param {Number} year The FFY
 * @param {*} totalCost
 * @param {*} totalMedicaidCost
 * @param {Object} allocation The allocation object
 * @param {Number} totalMedicaidCostShares
 * @returns {Object} the updated budget
 */
export const sumMMISbyFFP = ({
  budget,
  year,
  totalCost,
  totalMedicaidCost,
  allocation,
  totalMedicaidCostShares
} = {}) => {
  const updatedBudget = deepCopy(budget);
  if (budget && year && allocation && totalMedicaidCostShares) {
    // For MMIS, we need to track costs by "FFP type", too - that is,
    // the cost allocation.  So we need to know total costs for MMIS
    // at the 90/10 level, at the 75/25 level, and at the 50/50 level.

    // Compute a string that represents the MMIS level for this activity
    const ffpLevel = `${allocation[year].ffp.federal}-${allocation[year].ffp.state}`;

    // Then do basically the same as updateCosts() above, but we only
    // need to track subtotals, not individual cost categories
    const array = [ffpLevel, 'combined'];
    array.forEach(category => {
      if (updatedBudget?.mmisByFFP?.[category]?.[year]?.federal !== undefined) {
        updatedBudget.mmisByFFP[category][year].federal +=
          totalMedicaidCostShares.fedShare;
      }
      if (updatedBudget?.mmisByFFP?.[category]?.total?.federal !== undefined) {
        updatedBudget.mmisByFFP[category].total.federal +=
          totalMedicaidCostShares.fedShare;
      }

      if (updatedBudget?.mmisByFFP?.[category]?.[year]?.state !== undefined) {
        updatedBudget.mmisByFFP[category][year].state +=
          totalMedicaidCostShares.stateShare;
      }
      if (updatedBudget?.mmisByFFP?.[category]?.total?.state !== undefined) {
        updatedBudget.mmisByFFP[category].total.state +=
          totalMedicaidCostShares.stateShare;
      }

      if (
        updatedBudget?.mmisByFFP?.[category]?.[year]?.medicaid !== undefined
      ) {
        updatedBudget.mmisByFFP[category][year].medicaid += totalMedicaidCost;
      }
      if (updatedBudget?.mmisByFFP?.[category]?.total?.medicaid !== undefined) {
        updatedBudget.mmisByFFP[category].total.medicaid += totalMedicaidCost;
      }

      if (updatedBudget?.mmisByFFP?.[category]?.[year]?.total !== undefined) {
        updatedBudget.mmisByFFP[category][year].total += totalCost;
      }
      if (updatedBudget?.mmisByFFP?.[category]?.total?.total !== undefined) {
        updatedBudget.mmisByFFP[category].total.total += totalCost;
      }
    });
  }

  return updatedBudget;
};

/**
 * Sums up the federal, state, medicaid, and total costs per
 * funding source (including MMIS) by FFY
 * @param {Object} budget The budget object
 * @param {String} fundingSource The funding source
 * @param {Number} year The FFY
 * @param {Object} costCategoryShare The federal, state, and medicaid share of the total costs
 * @param {Object} totalMedicaidCostShares The percentage of the total cost shared by federal and state
 * @param {Number} totalMedicaidCost The total cost minus total other funding
 * @param {Object} allocation The allocation of the costs between federal and state
 * @param {Number} totalCost The total costs for the APD for the FFY
 * @returns the updated budget
 */
export const sumShareCosts = ({
  budget,
  fundingSource,
  year,
  totalCost,
  totalMedicaidCost,
  allocation,
  totalMedicaidCostShares,
  costCategoryShare
} = {}) => {
  let updatedBudget = deepCopy(budget);

  if (
    budget &&
    year &&
    costCategoryShare &&
    totalMedicaidCostShares &&
    allocation
  ) {
    // New activities don't have a funding program by default, so don't
    // the program-specific totals for those activities.
    updatedBudget = sumShareCostsForFundingSource({
      budget: updatedBudget,
      fundingSource,
      year,
      totalMedicaidCost,
      totalMedicaidCostShares,
      costCategoryShare
    });

    if (fundingSource === 'hie' || fundingSource === 'hit') {
      // We need to track HIE and HIT combined, so we have a funding source
      // called hitAndHie.  If this is HIE or HIT, roll it into that one too.
      updatedBudget = sumShareCostsForFundingSource({
        budget: updatedBudget,
        fundingSource: 'hitAndHie',
        year,
        totalMedicaidCost,
        totalMedicaidCostShares,
        costCategoryShare
      });
    } else if (fundingSource === 'mmis') {
      updatedBudget = sumMMISbyFFP({
        budget: updatedBudget,
        year,
        totalCost,
        totalMedicaidCost,
        allocation,
        totalMedicaidCostShares
      });
    }
  }
  return updatedBudget;
};

/**
 * Sums up the federal share subtotal for each year by category type and all
 * categories combined. Sum up the federal share subtotal for each category
 * type and all categories combined. Then sum up the cost and percent for each
 * year and each quarter of the year by category type and all categories combined.
 * Sum up the percent for each year by category type.
 * @param {String} activityKey The key of the activity
 * @param {Number} fedShareAmount The amount of the federal share
 * @param {String} category The category type of the cost
 * @param {Number} year The FFY
 * @param {Object} quarterlyInfo The quarterly info for the budget
 * @return {Object} The updated Activity FFP object
 */
export const sumActivityQuarterlyFFP = ({
  activityFFP,
  fedShareAmount,
  category,
  year,
  quarterlyInfo
} = {}) => {
  const updatedActivityFFP = deepCopy(activityFFP);
  if (activityFFP && category && year && quarterlyInfo) {
    const categoryCostType = getPropCostType(category); // contractors or inHouse

    // Gather up the totals for the cost types and the combined total. Do
    // this here so these values aren't affected by the percentages input
    // by the state. These totals are based only on the federal share
    // computed from the activity total costs.
    updatedActivityFFP.years[year].subtotal[categoryCostType].dollars +=
      fedShareAmount;
    updatedActivityFFP.years[year].subtotal.combined.dollars += fedShareAmount;

    // Note that the grand activity total categories are just numbers, not
    // objects - we drop the percentage altogether.
    updatedActivityFFP.total[categoryCostType] += fedShareAmount;
    updatedActivityFFP.total.combined += fedShareAmount;

    // Shortcut to loop over quarters.  :)
    [...Array(4)].forEach((_, q) => {
      // Compute the federal share for this quarter.
      const federalPct = quarterlyInfo.federalPcts[q];
      const qFFP = quarterlyInfo.qFFPs[q];

      // Total cost and percent for this type.  Note that we don't
      // sum the percent here because there are two categories being
      // merged into one - if we summed, the "state" percents would
      // all be doubled.
      updatedActivityFFP.years[year][q + 1][categoryCostType].dollars += qFFP;
      updatedActivityFFP.years[year][q + 1][categoryCostType].percent =
        federalPct;

      // Then the quarterly combined dollars.  We don't bother
      // with percent for combined because it doesn't make sense.
      updatedActivityFFP.years[year][q + 1].combined.dollars += qFFP;

      // Fiscal year percentage. Because "expense" and "statePersonnel"
      // are combined into the "inHouse" property, we need to be careful
      // about not adding the percent multiple times.  So, only
      // add the percent if this is not an "expense" type.
      if (category !== 'expenses') {
        updatedActivityFFP.years[year].subtotal[categoryCostType].percent +=
          federalPct;
      }
    });
  }

  return updatedActivityFFP;
};

/**
 * Sums up the federal share subtotals by year and across all years for
 * category type and all categories combined. Sum up the federal share subtotals
 * by quarter by category type and all categories combined.
 * @param {Object} quarterlyFFP The quarterly FFP object
 * @param {String} fundingSource The funding source
 * @param {Number} fedShareAmount The amount of the federal share
 * @param {String} category The category type of the cost
 * @param {Number} year The FFY
 * @param {Object} quarterlyInfo The quarterly info for the budget
 * @return {Object} The updated quarterly FFP object
 */
export const sumQuarterlyFFP = ({
  quarterlyFFP,
  fundingSource,
  fedShareAmount,
  category,
  year,
  quarterlyInfo
} = {}) => {
  const updatedQuarterlyFFP = deepCopy(quarterlyFFP);
  if (quarterlyFFP && category && year && quarterlyInfo) {
    const categoryCostType = getPropCostType(category); // contractors or inHouse

    // New activities don't have a funding program by default. In that
    // case, don't add this activity's costs to the program-level totals.
    if (fundingSource) {
      // For the expense type, add the federal share for the
      // quarter and the fiscal year subtotal.
      updatedQuarterlyFFP.years[year].subtotal[categoryCostType] +=
        fedShareAmount;

      // Also add the federal share to the cross-expense
      // quarterly subtotal and fiscal year subtotal
      updatedQuarterlyFFP.years[year].subtotal.combined += fedShareAmount;

      // And finally, add it to the expense type grand
      // total and the federal share grand total
      updatedQuarterlyFFP.total[categoryCostType] += fedShareAmount;
      updatedQuarterlyFFP.total.combined += fedShareAmount;
    }

    // Shortcut to loop over quarters.  :)
    [...Array(4)].forEach((_, q) => {
      // Compute the federal share for this quarter.
      const qFFP = quarterlyInfo.qFFPs[q];

      // New activities don't have a funding program by default. In that
      // case, don't add this activity's quarterly costs to the
      // program-level roll-ups.
      if (fundingSource) {
        // For the expense type, add the federal share for the quarter.
        updatedQuarterlyFFP.years[year][q + 1][categoryCostType] += qFFP;

        // Also add the federal share to the cross-expense quarterly subtotal
        updatedQuarterlyFFP.years[year][q + 1].combined += qFFP;
      }
    });
  }
  return updatedQuarterlyFFP;
};

/**
 * Calculates the percent of the total costs for each category type
 * @param {Object} activityTotals The activity total object
 * @param {Number} year The year to get the percentages for
 * @returns {Array} of the category percentages
 */
export const calculateCategoryPercentages = ({ activityTotals, year } = {}) => {
  // This represents the percentage each cost category contributes to the
  // total activity cost.  This is useful for distributing the total
  // in a way that we get whole numbers and preserve sums.
  if (activityTotals && year && activityTotals?.data?.combined?.[year]) {
    const totalCost = activityTotals?.data?.combined?.[year];
    return [
      (activityTotals?.data?.contractors?.[year] || 0) / (totalCost || 0),
      (activityTotals?.data?.expenses?.[year] || 0) / (totalCost || 0),
      (activityTotals?.data?.statePersonnel?.[year] || 0) / (totalCost || 0)
    ];
  }
  return [0, 0, 0];
};

/**
 * Calculates the other funding amounts for the activity and year for
 * contractors, expenses, state personnel, and total.
 * @param {Object} activityTotals The activity total object
 * @param {Number} totalOtherFunding The total amount of other funding
 * @param {Array} categoryPercentages The array of percentages for each cost category
 * @param {Number} year The year to calculate other funding for
 * @returns {Object} the updated activity total object
 * e.g., if total other funding is 100 and the percentages are [0.5, 0.3, 0.2] for 2022
 * then the updated activity total other funding object will be:
 * {
 *   otherFunding: {
 *     2022: { contractors: 50, expenses: 30, statePersonnel: 20, total: 100 }
 *   }
 * }
 */
export const calculateOtherFundingByYear = ({
  activityTotals,
  totalOtherFunding = 0,
  categoryPercentages,
  year
} = {}) => {
  const updatedActivityTotals = deepCopy(activityTotals);
  if (activityTotals && categoryPercentages && year) {
    // Calculate how much of the activity's other funding for the current
    // federal fiscal year is applied to each cost category.
    updatedActivityTotals.data.otherFunding[year].total = totalOtherFunding;
    [
      updatedActivityTotals.data.otherFunding[year].contractors,
      updatedActivityTotals.data.otherFunding[year].expenses,
      updatedActivityTotals.data.otherFunding[year].statePersonnel
    ] = roundedPercents(totalOtherFunding, categoryPercentages);
  }

  return updatedActivityTotals;
};

/**
 * Compute the state, federal, and medicaid shares for each cost category,
 * based on the percentages from categoryPercentages. The fedShare values
 * are based on the federal share of the total medicaid costs. The stateShare
 * values are based on the state share of the total medicaid costs. The
 * medicaidShare values are based on the total medicaid costs.
 * @param {Object} totalMedicaidCostShares The totals of the costs to be paid by federal and state
 * @param {Number} totalMedicaidCost The total amount to be paid by medicaid
 * @param {Array} categoryPercentages The array of percentages for each cost category
 * @return {Object} the amount to be paid by state, federal, and medicaid
 * e.g., if the totalMedicaidCost is 300, totalMedicaidCostShares is
 * { fedShare: 270, stateShare: 30 } and the categoryPercentages are
 * [0.333, 0.333, 0.333], then the return value is:
 * {
 *   fedShare: { contractors: 90, expenses: 90, statePersonnel: 90 },
 *   stateShare: { contractors: 10, expenses: 10, statePersonnel: 10 },
 *   medicaidShare: { contractors: 100, expenses: 100, statePersonnel: 100 }
 * }
 */
export const calculateShareCostsByCategory = ({
  totalMedicaidCostShares,
  totalMedicaidCost = 0,
  categoryPercentages
} = {}) => {
  // Converts an array where the values correspond to contractors,
  // expenses, and state personnel values, respectively.
  const costShareReducer = (acc, value, i) => ({
    ...acc,
    [['contractors', 'expenses', 'statePersonnel'][i]]: value
  });

  if (totalMedicaidCostShares && categoryPercentages) {
    // Compute the state and federal share for each cost category, based on
    // the federal and state shares and the percentages calculated above.
    const fedShare = roundedPercents(
      totalMedicaidCostShares.fedShare,
      categoryPercentages
    ).reduce(costShareReducer, {});
    const stateShare = roundedPercents(
      totalMedicaidCostShares.stateShare,
      categoryPercentages
    ).reduce(costShareReducer, {});
    const medicaidShare = roundedPercents(
      totalMedicaidCost,
      categoryPercentages
    ).reduce(costShareReducer, {});

    /* ☝  What is that all about?
      We need to display the "Medicaid share" of all of these costs, broken
      down by state and federal share.  The Medicaid share is the total cost
      minus any "other funding" that the user entered into the cost
      allocation section.  The federal and state shares are dictated by which
      allocation the user selected - 90/10, 75/25, or 50/50 (federal/state).

      When the user is inputting data, the activity costs they enter combine
      to create the absolute total cost.  Thus, the state personnel,
      contractor, and non-personnel expense costs that we have available to
      us each include some portion of the "other funding."  We can't just
      use the values the user gave us.

      Instead, we compute how much of the absolute total cost each of those
      cost categories contribute.  Then we use those percentages to
      distribute the Medicaid share across the cost categories.  Here's
      an example:

      User Input:
        State personnel:  $400
        Contractors:      $500
        Non-personnel:    $100
        Other funding:    $200
        Cost allocation:  90/10
      
      Computed:
        Absolute total:   $1000:  sum of all costs
        Medicaid share:    $800:  Absolute total - other funding
        Federal share:     $720:  90% of Medicaid share
          State personnel: $288:  40% of federal share
          Contractors:     $360:  50% of federal share
          Non-personnel:    $72:  10% of federal share
        State share:        $80:  10% of Medicaid share
          State personnel:  $32:  40% of state share
          Contractors:      $40:  50% of state share
          Non-personnel:     $8:  10% of state share
    */

    return {
      fedShare,
      stateShare,
      medicaidShare
    };
  }
  return {
    fedShare: { contractors: 0, expenses: 0, statePersonnel: 0 },
    stateShare: { contractors: 0, expenses: 0, statePersonnel: 0 },
    medicaidShare: {
      contractors: 0,
      expenses: 0,
      statePersonnel: 0
    }
  };
};

/**
 * Calculate the activity totals by year and by quarter. Calculate the federal
 * share by year and by quarter.
 * @param {Object} budget The budget
 * @param {Object} activity The activity of the APD
 * @param {String} fundingSource The funding source
 * @param {Number} year The FFY
 * @param {Object} costCategoryShare The state and federal share for each cost category
 */
export const calculateQuarterlyCosts = ({
  budget,
  activity,
  fundingSource,
  year,
  costCategoryShare
} = {}) => {
  let updatedBudget = deepCopy(budget);
  if (budget && activity && year && costCategoryShare) {
    const ffp = deepCopy(activity.quarterlyFFP[year]);
    const ffpSource = fundingSource === 'mmis' ? 'mmis' : 'hitAndHie';

    ['contractors', 'expenses', 'statePersonnel'].forEach(category => {
      const ffpType = getPropCostType(category);

      // This is the percentage of the total federal share that the state
      // is requesting, per quarter.  Go ahead and covert it to a 0-1
      // value so we can precompute the federal dollar share per quarter
      // using the nice rounding function.
      const quarterlyInfo = {
        federalPcts: [
          ffp[1][ffpType] / 100,
          ffp[2][ffpType] / 100,
          ffp[3][ffpType] / 100,
          ffp[4][ffpType] / 100
        ],
        qFFPs: []
      };

      const fedShareAmount = costCategoryShare.fedShare[category];
      // Compute the federal dollar payment across the quarters.
      quarterlyInfo.qFFPs = roundedPercents(
        fedShareAmount,
        quarterlyInfo.federalPcts
      );

      updatedBudget.activities[activity.activityId].quarterlyFFP =
        sumActivityQuarterlyFFP({
          activityFFP:
            updatedBudget.activities[activity.activityId].quarterlyFFP,
          fedShareAmount,
          category,
          year,
          quarterlyInfo
        });

      if (
        updatedBudget?.federalShareByFFYQuarter?.[ffpSource] !== undefined &&
        typeof updatedBudget?.federalShareByFFYQuarter?.[ffpSource] === 'object'
      )
        updatedBudget.federalShareByFFYQuarter[ffpSource] = sumQuarterlyFFP({
          quarterlyFFP: updatedBudget.federalShareByFFYQuarter[ffpSource],
          fundingSource,
          fedShareAmount,
          category,
          year,
          quarterlyInfo
        });
    });
  }
  return updatedBudget;
};

/**
 * Calculate the budget for the APD
 * @param {Object} apd The APD object
 */
export const calculateBudget = apd => {
  // Clone the incoming state, so we don't accidentally change anything.
  const {
    years,
    activities,
    keyStatePersonnel: { keyPersonnel } = {},
    apdType // eslint-disable-line no-underscore-dangle
  } = deepCopy(apd);

  // Create a default budget object so that all of the properties and stuff
  // will exist, so we don't have to have a bunch of code checking for it.
  let newBudget;
  switch (apdType) {
    case APD_TYPE.HITECH:
      newBudget = defaultHITECHBudgetObject(years);
      break;
    case APD_TYPE.MMIS:
      newBudget = defaultMMISBudgetObject(years);
      break;
    default:
      newBudget = defaultBudgetObject(years);
  }

  if (years && activities && keyPersonnel) {
    // Before looping over the activities, if it's an MMIS APD update the budget
    // to include Key State Personnel
    if (apdType === APD_TYPE.MMIS) {
      // Tif: Loop over key state personnel and each year and update the budget with all of the impacted
      // fields/totals/etc...
      newBudget = addKeyStatePersonnel({
        budget: newBudget,
        years,
        keyPersonnel
      });
    }

    // Since all of our expenses are tied up in activities, we'll start
    // by looking at all of them and doing Magic Math™. (It's not magic.)
    activities.forEach(activity => {
      // Update the statePersonnel with keyPersonnel, if applicable
      if (apdType === APD_TYPE.HITECH) {
        activity.statePersonnel = updateStatePersonnel({
          name: activity.name,
          statePersonnel: activity.statePersonnel,
          keyPersonnel
        });
      }

      // We need to know the funding source so we know where to apply
      // this data in the big rollup budget.
      const fundingSource =
        apdType === APD_TYPE.MMIS
          ? 'mmis'
          : activity.fundingSource?.toLowerCase();

      // And of course we need to know how the costs are allocated between
      // the state and federal shares.
      const allocation = activity.costAllocation;

      // Create a default quarterly FFP per activity object,
      // so that all of the properties and stuff will exist
      newBudget.activities[activity.activityId] =
        defaultQuarterlyFFPObject(years);

      // Sum up the total cost of each cost category per fiscal year for the activity
      let activityTotals = sumActivityTotals({ activity, years });

      // First compute the total of each cost category both within
      // fiscal years and across them, for all cost categories.  We
      // need these completed before we can compute what percentage
      // each cost category contributes to the total cost, further down.
      // While we're here, also compute the cost category totals per activity.
      newBudget = sumTotalCostsByCategory({
        budget: newBudget,
        activity,
        fundingSource
      });

      // Now loop back over the years and compute state and federal shares
      // of all the costs.
      years.forEach(year => {
        const totalOtherFunding = convertToNumber(allocation[year].other);
        const totalCost = activityTotals.data.combined[year];
        // Todo: For MMIS APDs add key state personnel costs to totalCost?
        const totalMedicaidCost = totalCost - totalOtherFunding;

        // This is the total medicaid costs broken into state and federal shares
        const totalMedicaidCostShares = getSharesOfTotalMedicaidCost({
          activity,
          year,
          amount: totalMedicaidCost
        });

        // This represents the percentage each cost category contributes to the
        // total activity cost.  This is useful for distributing the total
        // in a way that we get whole numbers and preserve sums.
        const categoryPercentages = calculateCategoryPercentages({
          activityTotals,
          year
        });

        // Add the other funding amounts for the activity and year
        activityTotals = calculateOtherFundingByYear({
          activityTotals,
          totalOtherFunding,
          categoryPercentages,
          year
        });

        // Compute the state and federal share for each cost category, based on
        // the federal and state shares and the percentages calculated above.
        const costCategoryShare = calculateShareCostsByCategory({
          totalMedicaidCostShares,
          totalMedicaidCost,
          categoryPercentages
        });

        // Record these costs for each FFY of the activity
        newBudget.activities[activity.activityId].costsByFFY = sumCostsByFFY({
          costsByFFY: newBudget.activities[activity.activityId].costsByFFY,
          year,
          totalCost,
          totalMedicaidCostShares,
          totalMedicaidCost
        });

        // Calculate the federal, state, and medicaid shares per
        // funding source (including MMIS) by FFY
        newBudget = sumShareCosts({
          budget: newBudget,
          fundingSource,
          year,
          totalCost,
          totalMedicaidCost,
          allocation,
          totalMedicaidCostShares,
          costCategoryShare
        });

        // Now we compute the federal share per fiscal quarter for
        // this activity.
        newBudget = calculateQuarterlyCosts({
          budget: newBudget,
          activity,
          fundingSource,
          year,
          costCategoryShare
        });
      });

      // Add the updated activity totals for the activity to the budget
      newBudget.activityTotals.push(activityTotals);
    });
  }

  return roundObjectValues(newBudget);
};
