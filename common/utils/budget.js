import roundedPercents from './roundedPercents';
import { arrToObj, convertToNumber } from './formatting';
import { deepCopy, roundValues } from './utils';

export const CATEGORY_NAMES = [
  'statePersonnel',
  'contractors',
  'expenses',
  'combined'
];

export const FFP_OPTIONS = new Set(['90-10', '75-25', '50-50', '0-100']);

/**
 * Creates a default Funding Source object with years and total.
 * @param {Array} years
 * @returns the default Funding Source object
 * e.g. for years: [2022, 2023, 2024] the object would look like
 * {
 *   2022: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *   2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *   2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
 *   total: { total: 0, federal: 0, medicaid: 0, state: 0 }
 * }
 */
export const getDefaultFundingSourceObject = years => ({
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
 * Creates a default Expense object with Funding Source objects for each expense type
 * @param {Array} years
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
  years,
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
 * @param {Array} years The FFYs
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
export const defaultFederalShareByFFYQuarterObject = years =>
  years.reduce(
    (o, year) => ({
      ...o,
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
    }),
    {
      total: {
        inHouse: 0,
        contractors: 0,
        combined: 0
      }
    }
  );

/**
 * Creates a default Budget object by years
 * @param {Array} years
 * @returns the default Budget object
 * e.g, for years: [2022, 2023, 2024] the object would look like
 * {
 *   federalShareByFFYQuarter: {
 *     hitAndHie: {
 *       2022: {...}, 2023: {...}, 2024: {...}, total: {...}
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
export const defaultBudgetObject = years => ({
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
 * Creates a default quarterly FFP object by FFYs
 * @param {Array} years The FFYs
 * @returns the default quarterly FFP
 * e.g. for years: [2022, 2023, 2024] the object would look like
 * {
 *   costsByFFY: {
 *     2022: { federal: 0, medicaidShare: 0, state: 0, total: 0 },
 *     2023: { federal: 0, medicaidShare: 0, state: 0, total: 0 },
 *     2024: { federal: 0, medicaidShare: 0, state: 0, total: 0 },
 *     total: { federal: 0, medicaidShare: 0, state: 0, total: 0 },
 *   },
 *   quarterlyFFP: {
 *     2022: {
 *       1: {
 *         combined: { dollars: 0, percent: 0 },
 *         contractors: { dollars: 0, percent: 0 },
 *         inHouse: { dollars: 0, percent: 0 }
 *       },
 *       2: {...}, // same as 1
 *       3: {...}, // same as 1
 *       4: {...}, // same as 1
 *       subtotal: {...} // same as 1
 *     },
 *     2023: {...}, // same as 2022
 *     2024: {...}, // same as 2022
 *     total: { combined: 0, contractors: 0, inHouse: 0 }
 *   }
 * }
 */
export const defaultQuarterlyFFPObject = years => ({
  costsByFFY: {
    ...arrToObj(years, () => ({
      federal: 0,
      medicaidShare: 0,
      state: 0,
      total: 0
    })),
    total: {
      federal: 0,
      medicaidShare: 0,
      state: 0,
      total: 0
    }
  },
  quarterlyFFP: {
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
    })),
    total: {
      combined: 0,
      contractors: 0,
      inHouse: 0
    }
  }
});

/**
 * Creates a default Activity Totals object
 * @param {Integer} id Activity id
 * @param {String} name Activity name
 * @param {String} fundingSource The CMS funding program of the cost
 * @param {Array} years As a four-character year string (e.g., '2018')
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
export const defaultActivityTotalsDataObject = years => ({
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
 * @returns {{fedShare:Number, stateShare:Number}} The state and federal share
 */
export const getAllocationOfTotalMedicaidCost = (activity, year, amount) => {
  const [fedShare, stateShare] = roundedPercents(convertToNumber(amount), [
    activity.costAllocation[year].ffp.federal / 100,
    activity.costAllocation[year].ffp.state / 100
  ]);
  return { fedShare, stateShare };
};

/**
 * Updates the state personnel list and adds the key personnel with costs
 * to the list, if the activity is a Program Administration activity.
 * @param {String} name Activity name
 * @param {Array} statePersonnel List of state personnel for the activity
 * @param {Array} keyPersonnel List of key personnel for the APD
 * @returns
 */
export const updateStatePersonnel = (name, statePersonnel, keyPersonnel) => {
  const updatedStatePersonnel = [...statePersonnel];
  // If this is the Program Administration activity, add the APD key
  // personnel to it so they get included in downstream calculations.
  // TODO: Don't rely on the activity name. Instead, this should always be
  // activity index 0. However, that will require some tweaks to the tests.
  if (name === 'Program Administration') {
    updatedStatePersonnel.push(
      ...keyPersonnel
        .filter(kp => kp.hasCosts)
        .map(({ costs, fte }) => ({
          years: Object.keys(costs).reduce(
            (o, ffy) => ({
              ...o,
              [ffy]: { amt: costs[ffy], perc: fte[ffy] }
            }),
            {}
          )
        }))
    );
  }
  return updatedStatePersonnel;
};

/**
 * Return the cost from the item by year for the category.
 * statePersonnel is a special case, because it's years don't have a
 * number value, but an object with amount and percent
 * @param {Object} item The item to get the cost from
 * @param {Integer} year The FFY
 */
export const getCostFromItemByYear = (item, year) =>
  typeof item.years[year] === 'object'
    ? convertToNumber(item.years[year].amt) *
      convertToNumber(item.years[year].perc)
    : item.years[year];

/**
 * Return the cost type from the category
 * @param {String} category The category type
 * @returns The cost type
 */
export const getPropCostType = category =>
  category === 'contractors' ? 'contractors' : 'inHouse';

/**
 * Sums up the costs for each category type and adds them to the budget totals.
 * @param {Object} activityTotals The activity total object
 * @param {*} category The category this cost comes from (e.g., "contractors", "statePersonnel")
 * @param {Array} items The list of items of the category type in the activity
 * @returns {Object} the updated activity total object
 */
export const calculateActivityTotalByProp = (
  activityTotals,
  category,
  items
) => {
  let updatedActivityTotals = deepCopy(activityTotals);
  items.forEach(item => {
    updatedActivityTotals = Object.keys(item.years).reduce((totals, year) => {
      const cost = getCostFromItemByYear(item, year);
      totals.data[category][year] += cost;
      totals.data[category].total += cost;
      totals.data.combined[year] += cost;
      totals.data.combined.total += cost;
      return totals;
    }, updatedActivityTotals);
  });
  return updatedActivityTotals;
};

/**
 * Sum up the total cost of each cost category per fiscal year for the activity as well.
 * @param {Object} activity The APD activity
 * @param {Array} years The list of years in the APD
 * @returns {Object} the activity total object
 */
export const calculateActivityTotals = (activity, years) => {
  let activityTotals = {
    id: activity.id,
    name: activity.name,
    fundingSource: activity.fundingSource,
    data: {}
  };
  activityTotals.data = defaultActivityTotalsDataObject(years);
  activityTotals = calculateActivityTotalByProp(
    activityTotals,
    'contractors',
    activity.contractorResources
  );
  activityTotals = calculateActivityTotalByProp(
    activityTotals,
    'expenses',
    activity.expenses
  );
  activityTotals = calculateActivityTotalByProp(
    activityTotals,
    'statePersonnel',
    activity.statePersonnel
  );
  return activityTotals;
};

/**
 * Adds a costs to the budget running totals.
 * @param {Object} budget The current budget object
 * @param {String} fundingSource The funding source for the Activity
 * @param {String} category The category this cost comes from (e.g., "contractors", "statePersonnel")
 * @param {Array} items The list of items of the category type in the budget
 * @return {Object} The budget object with the totals updated
 */
export const calculateCostsForFundingSourceByProp = (
  budget,
  fundingSource,
  category,
  items
) => {
  let updatedBudget = deepCopy(budget);
  items.forEach(item => {
    updatedBudget = Object.keys(item.years).reduce((totals, year) => {
      const cost = getCostFromItemByYear(item, year);
      // New activities don't have a funding program by default, so in that case,
      // we can't capture program-specific funding numbers.
      if (fundingSource) {
        totals[fundingSource][category][year].total += cost;
        totals[fundingSource][category].total.total += cost;
        totals[fundingSource].combined[year].total += cost;
        totals[fundingSource].combined.total.total += cost;

        if (fundingSource === 'hie' || fundingSource === 'hit') {
          totals.hitAndHie[category][year].total += cost;
          totals.hitAndHie[category].total.total += cost;
          totals.hitAndHie.combined[year].total += cost;
          totals.hitAndHie.combined.total.total += cost;
        }
      }

      // Because HIT and HIE sources have already added to the grand
      // totals, don't also do it for the combined source.
      // should include costs for items that don't have fundingSources
      if (fundingSource !== 'hitAndHie') {
        totals.combined[year].total += cost;
        totals.combined.total.total += cost;
      }

      return totals;
    }, updatedBudget);
  });
  return updatedBudget;
};

/**
 * Sum up the total costs for activity
 * @param {Object} activity The APD activity
 * @param {String} fundingSource the funding source for the activity
 * @param {Array} years The list of years in the APD
 * @return {Object} the updated budget object
 */
export const calculateTotalCostsByCategory = (
  budget,
  activity,
  fundingSource
) => {
  let updatedBudget = deepCopy(budget);
  updatedBudget = calculateCostsForFundingSourceByProp(
    updatedBudget,
    fundingSource,
    'contractors',
    activity.contractorResources
  );
  updatedBudget = calculateCostsForFundingSourceByProp(
    updatedBudget,
    fundingSource,
    'expenses',
    activity.expenses
  );
  updatedBudget = calculateCostsForFundingSourceByProp(
    updatedBudget,
    fundingSource,
    'statePersonnel',
    activity.statePersonnel
  );
  return updatedBudget;
};

/**
 * Calculates the percentage each cost category contributes to the total activity cost
 * @param {Object} activityTotals The activity total object
 * @param {Integer} year The year to get the percentages for
 */
export const calculateCostCategoryPercentages = (activityTotals, year) => {
  // This represents the percentage each cost category contributes to the
  // total activity cost.  This is useful for distributing the total
  // in a way that we get whole numbers and preserve sums.
  const totalCost = activityTotals.data.combined[year];
  return [
    activityTotals.data.contractors[year] / totalCost || 0,
    activityTotals.data.expenses[year] / totalCost || 0,
    activityTotals.data.statePersonnel[year] / totalCost || 0
  ];
};

/**
 * Calcuates the other funding amounts for the activity and year
 * @param {Object} activityTotals The activity total object
 * @param {Integer} totalOtherFunding The total amount of other funding
 * @param {Array} costCategoryPercentages The array of percentages for each cost category
 * @param {Integer} year The year to calculate other funding for
 * @returns {Object} the updated activity total object
 */
export const calculateOtherFundingByYear = (
  activityTotals,
  totalOtherFunding,
  costCategoryPercentages,
  year
) => {
  const updatedActivityTotals = deepCopy(activityTotals);

  // Calculate how much of the activity's other funding for the current
  // federal fiscal year is applied to each cost category.
  updatedActivityTotals.data.otherFunding[year].total = totalOtherFunding;
  [
    updatedActivityTotals.data.otherFunding[year].contractors,
    updatedActivityTotals.data.otherFunding[year].expenses,
    updatedActivityTotals.data.otherFunding[year].statePersonnel
  ] = roundedPercents(totalOtherFunding, costCategoryPercentages);

  return updatedActivityTotals;
};

/**
 * Compute the state and federal share for each cost category, based on
 * the federal and state shares and the percentages from costCategoryPercentages.
 * @param {Object} medicaidCostShares The totals of the costs to be paid by federal and state
 * @param {Integer} totalMedicaidCost The total amount to be paid by medicaid
 * @param {Array} costCategoryPercentages The array of percentages for each cost category
 * @return {Object} the amount to be paid by state, federal, and medicaid
 */
export const calculateCostCategoryShare = (
  medicaidCostShares,
  totalMedicaidCost,
  costCategoryPercentages
) => {
  // Converts an array where the values correspond to contractors,
  // expenses, and state personnel values, respectively.
  const costShareReducer = (acc, value, i) => ({
    ...acc,
    [['contractors', 'expenses', 'statePersonnel'][i]]: value
  });

  // Compute the state and federal share for each cost category, based on
  // the federal and state shares and the percentages calculated above.
  const fedShare = roundedPercents(
    medicaidCostShares.fedShare,
    costCategoryPercentages
  ).reduce(costShareReducer, {});
  const stateShare = roundedPercents(
    medicaidCostShares.stateShare,
    costCategoryPercentages
  ).reduce(costShareReducer, {});
  const medicaidShare = roundedPercents(
    totalMedicaidCost,
    costCategoryPercentages
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
};

/**
 * Calculate the costs for each FFY of the activity
 * @param {Object} budget The existing budget
 * @param {String} activityKey The activity key
 * @param {Integer} year The FFY
 * @param {Integer} totalCost the total cost of the activity
 * @param {Object} medicaidCostShares an object of fedShare and stateShare
 * @param {Integer} totalMedicaidCost the total medicaid share of the activity
 * @returns the updated costsByFFY
 */
export const calculateCostsByFFY = (
  budget,
  activityKey,
  year,
  totalCost,
  medicaidCostShares,
  totalMedicaidCost
) => {
  // Record these costs for each FFY of the activity. These are used in
  // the cost allocation display, so the user can see at an activity
  // level their total costs and cost distributions.
  const { costsByFFY } = budget.activities[activityKey];
  return {
    ...costsByFFY,
    [year]: {
      federal: medicaidCostShares.fedShare,
      medicaidShare: totalMedicaidCost,
      state: medicaidCostShares.stateShare,
      total: totalCost
    },
    total: {
      federal: costsByFFY.total.federal + medicaidCostShares.fedShare,
      medicaidShare: costsByFFY.total.medicaidShare + totalMedicaidCost,
      state: costsByFFY.total.state + medicaidCostShares.stateShare,
      total: costsByFFY.total.total + totalCost
    }
  };
};

/**
 * Update the running totals for the various cost categories, subtotals,
 * and totals for a given funding source (hie, hit, or hitAndHie).
 * @param {Object} budget The existing budget
 * @param {String} fundingSource The funding source to update
 * @param {Integer} year The FFY
 * @param {Object} costCategoryShare The share of the costs between the payees (state, federal, medicaid)
 * @param {Object} medicaidCostShares an object of fedShare and stateShare
 * @param {Integer} totalMedicaidCost the total medicaid share of the activity
 * @returns {Object} the updated budget
 */
const calculateShareCostsForFundingSource = (
  budget,
  fundingSource,
  year,
  costCategoryShare,
  medicaidCostShares,
  totalMedicaidCost
) => {
  const updatedBudget = deepCopy(budget);
  // Update the three cost categories for the funding source
  if (fundingSource) {
    ['contractors', 'expenses', 'statePersonnel'].forEach(category => {
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
    });

    // Plus the subtotals for the cost categories (i.e., the Medicaid share)
    updatedBudget[fundingSource].combined[year].federal +=
      medicaidCostShares.fedShare;
    updatedBudget[fundingSource].combined.total.federal +=
      medicaidCostShares.fedShare;

    updatedBudget[fundingSource].combined[year].state +=
      medicaidCostShares.stateShare;
    updatedBudget[fundingSource].combined.total.state +=
      medicaidCostShares.stateShare;

    updatedBudget[fundingSource].combined[year].medicaid += totalMedicaidCost;
    updatedBudget[fundingSource].combined.total.medicaid += totalMedicaidCost;
  }
  if (fundingSource !== 'hitAndHie') {
    updatedBudget.combined[year].federal += medicaidCostShares.fedShare;
    updatedBudget.combined.total.federal += medicaidCostShares.fedShare;
    updatedBudget.combined[year].state += medicaidCostShares.stateShare;
    updatedBudget.combined.total.state += medicaidCostShares.stateShare;
    updatedBudget.combined[year].medicaid += totalMedicaidCost;
    updatedBudget.combined.total.medicaid += totalMedicaidCost;
  }

  return updatedBudget;
};

/**
 * Calculates the MMIS totals by categories
 * @param {Object} budget The budget object
 * @param {Object} allocation The allocation object
 * @param {Integer} year The FFY
 * @param {Integer} medicaidCostShares
 * @param {*} totalMedicaidCost
 * @param {*} totalCost
 * @returns {Object} the updated budget
 */
export const calculateMMISbyFFP = (
  budget,
  allocation,
  year,
  medicaidCostShares,
  totalMedicaidCost,
  totalCost
) => {
  const updatedBudget = deepCopy(budget);
  // For MMIS, we need to track costs by "FFP type", too - that is,
  // the cost allocation.  So we need to know total costs for MMIS
  // at the 90/10 level, at the 75/25 level, and at the 50/50 level.

  // Compute a string that represents the MMIS level for this activity
  const ffpLevel = `${allocation[year].ffp.federal}-${allocation[year].ffp.state}`;

  // Then do basically the same as updateCosts() above, but we only
  // need to track subtotals, not individual cost categories
  [ffpLevel, 'combined'].forEach(category => {
    updatedBudget.mmisByFFP[category][year].federal +=
      medicaidCostShares.fedShare;
    updatedBudget.mmisByFFP[category].total.federal +=
      medicaidCostShares.fedShare;

    updatedBudget.mmisByFFP[category][year].state +=
      medicaidCostShares.stateShare;
    updatedBudget.mmisByFFP[category].total.state +=
      medicaidCostShares.stateShare;

    updatedBudget.mmisByFFP[category][year].medicaid += totalMedicaidCost;
    updatedBudget.mmisByFFP[category].total.medicaid += totalMedicaidCost;

    updatedBudget.mmisByFFP[category][year].total += totalCost;
    updatedBudget.mmisByFFP[category].total.total += totalCost;
  });

  return updatedBudget;
};

/**
 * Calculate the federal, state, and medicaid shares per
 * funding source (including MMIS) by FFY
 * @param {Object} budget The budget object
 * @param {String} fundingSource The funding source
 * @param {Integer} year The FFY
 * @param {Object} costCategoryShare The federal, state, and medicaid share of the total costs
 * @param {Object} medicaidCostShares The percentage of the total cost shared by federal and state
 * @param {Integer} totalMedicaidCost The total cost minus total other funding
 * @param {Object} allocation The allocation of the costs between federal and state
 * @param {Integer} totalCost The total costs for the APD for the FFY
 * @returns the updated budget
 */
export const calculateShareCosts = (
  budget,
  fundingSource,
  year,
  costCategoryShare,
  medicaidCostShares,
  totalMedicaidCost,
  allocation,
  totalCost
) => {
  let updatedBudget = deepCopy(budget);

  // New activities don't have a funding program by default, so don't
  // the program-specific totals for those activities.
  updatedBudget = calculateShareCostsForFundingSource(
    updatedBudget,
    fundingSource,
    year,
    costCategoryShare,
    medicaidCostShares,
    totalMedicaidCost
  );

  if (fundingSource === 'hie' || fundingSource === 'hit') {
    // We need to track HIE and HIT combined, so we have a funding source
    // called hitAndHie.  If this is HIE or HIT, roll it into that one too.
    updatedBudget = calculateShareCostsForFundingSource(
      updatedBudget,
      'hitAndHie',
      year,
      costCategoryShare,
      medicaidCostShares,
      totalMedicaidCost
    );
  } else if (fundingSource === 'mmis') {
    updatedBudget = calculateMMISbyFFP(
      updatedBudget,
      allocation,
      year,
      medicaidCostShares,
      totalMedicaidCost,
      totalCost
    );
  }
  return updatedBudget;
};

/**
 * Calculate the FFP per activity for a given year.
 * @param {Object} budget The current budget
 * @param {String} activityKey The key of the activity
 * @param {Integer} fedShareAmount The amount of the federal share
 * @param {String} category The category type of the cost
 * @param {Integer} year The FFY
 * @param {Object} quarterlyInfo The quarterly info for the budget
 * @return {Object} The updated Activity FFP object
 */
export const calculateActivityFFP = (
  budget,
  activityKey,
  fedShareAmount,
  category,
  year,
  quarterlyInfo
) => {
  const activityFFP = budget.activities[activityKey].quarterlyFFP;
  const categoryCostType = getPropCostType(category);

  // Gather up the totals for the cost types and the combined total. Do
  // this here so these values aren't affected by the percentages input
  // by the state. These totals are based only on the federal share
  // computed from the activity total costs.
  activityFFP[year].subtotal[categoryCostType].dollars += fedShareAmount;
  activityFFP[year].subtotal.combined.dollars += fedShareAmount;

  // Note that the grand activity total categories are just numbers, not
  // objects - we drop the percentage altogether.
  activityFFP.total[categoryCostType] += fedShareAmount;
  activityFFP.total.combined += fedShareAmount;

  // Shortcut to loop over quarters.  :)
  [...Array(4)].forEach((_, q) => {
    // Compute the federal share for this quarter.
    const federalPct = quarterlyInfo.federalPcts[q];
    const qFFP = quarterlyInfo.qFFPs[q];

    // Total cost and percent for this type.  Note that we don't
    // sum the percent here because there are two categories being
    // merged into one - if we summed, the "state" percents would
    // all be doubled.
    activityFFP[year][q + 1][categoryCostType].dollars += qFFP;
    activityFFP[year][q + 1][categoryCostType].percent = federalPct;

    // Then the quarterly combined dollars.  We don't bother
    // with percent for combined because it doesn't make sense.
    activityFFP[year][q + 1].combined.dollars += qFFP;

    // Fiscal year percentage. Because "expense" and "statePersonnel"
    // are combined into the "inHouse" property, we need to be careful
    // about not adding the percent multiple times.  So, only
    // add the percent if this is not an "expense" type.
    if (category !== 'expenses') {
      activityFFP[year].subtotal[categoryCostType].percent += federalPct;
    }
  });

  return activityFFP;
};

/**
 * Calculate the federal share by the FFY quarter
 * @param {Object} budget The budget object
 * @param {String} fundingSource The funding source
 * @param {String} ffpSource The FFP funding source
 * @param {Integer} fedShareAmount The amount of the federal share
 * @param {String} category The category type of the cost
 * @param {Integer} year The FFY
 * @param {Object} quarterlyInfo The quarterly info for the budget
 * @return {Object} The updated quarterly FFP object
 */
export const calculateQuarterlyFFP = (
  budget,
  fundingSource,
  ffpSource,
  fedShareAmount,
  category,
  year,
  quarterlyInfo
) => {
  const quarterlyFFP = budget.federalShareByFFYQuarter[ffpSource];
  const categoryCostType = getPropCostType(category);

  // New activities don't have a funding program by default. In that
  // case, don't add this activity's costs to the program-level totals.
  if (fundingSource) {
    // For the expense type, add the federal share for the
    // quarter and the fiscal year subtotal.
    quarterlyFFP[year].subtotal[categoryCostType] += fedShareAmount;

    // Also add the federal share to the cross-expense
    // quarterly subtotal and fiscal year subtotal
    quarterlyFFP[year].subtotal.combined += fedShareAmount;

    // And finally, add it to the expense type grand
    // total and the federal share grand total
    quarterlyFFP.total[categoryCostType] += fedShareAmount;
    quarterlyFFP.total.combined += fedShareAmount;
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
      quarterlyFFP[year][q + 1][categoryCostType] += qFFP;

      // Also add the federal share to the cross-expense quarterly subtotal
      quarterlyFFP[year][q + 1].combined += qFFP;
    }
  });
  return quarterlyFFP;
};

/**
 *
 * @param {Object} budget The budget
 * @param {Object} activity The activity of the APD
 * @param {String} fundingSource The funding source
 * @param {Integer} year The FFY
 * @param {Object} costCategoryShare The state and federal share for each cost category
 */
export const calculateQuarterlyCosts = (
  budget,
  activity,
  fundingSource,
  year,
  costCategoryShare
) => {
  let updatedBudget = deepCopy(budget);
  const ffp = activity.quarterlyFFP[year];
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

    updatedBudget.activities[activity.key].quarterlyFFP = calculateActivityFFP(
      updatedBudget,
      activity.key,
      fedShareAmount,
      category,
      year,
      quarterlyInfo
    );

    updatedBudget.federalShareByFFYQuarter[ffpSource] = calculateQuarterlyFFP(
      updatedBudget,
      fundingSource,
      ffpSource,
      fedShareAmount,
      category,
      year,
      quarterlyInfo
    );
  });
  return updatedBudget;
};

/**
 * Calculate the budget for the APD
 * @param {Object} apd The APD object
 */
export const updateBudget = apd => {
  // Clone the incoming state, so we don't accidentally change anything.
  const {
    data: {
      years,
      activities,
      keyStatePersonnel: { keyPersonnel }
    }
  } = deepCopy(apd);

  // Create a default budget object so that all of the properties and stuff
  // will exist, so we don't have to have a bunch of code checking for it.
  let newBudget = defaultBudgetObject(years);

  // Since all of our expenses are tied up in activities, we'll start
  // by looking at all of them and doing Magic Math™. (It's not magic.)
  activities.forEach(activity => {
    // Update the statePersonnel with keyPersonnel, if applicable
    activity.statePersonnel = updateStatePersonnel(
      activity.name,
      activity.statePersonnel,
      keyPersonnel
    );

    // We need to know the funding source so we know where to apply
    // this data in the big rollup budget.
    const fundingSource = activity.fundingSource?.toLowerCase();

    // And of course we need to know how the costs are allocated between
    // the state and federal shares.
    const allocation = activity.costAllocation;

    // Create a default quarterly FFP per activity object,
    // so that all of the properties and stuff will exist
    newBudget.activities[activity.key] = defaultQuarterlyFFPObject(years);

    // Sum up the total cost of each cost category per fiscal year for the activity
    let activityTotals = calculateActivityTotals(activity, years);

    // First compute the total of each cost category both within
    // fiscal years and across them, for all cost categories.  We
    // need these completed before we can compute what percentage
    // each cost category contributes to the total cost, further down.
    // While we're here, also compute the cost category totals per activity.
    newBudget = calculateTotalCostsByCategory(
      newBudget,
      activity,
      fundingSource
    );

    // Now loop back over the years and compute state and federal shares
    // of all the costs.
    years.forEach(year => {
      const totalOtherFunding = convertToNumber(allocation[year].other);
      const totalCost = activityTotals.data.combined[year];
      const totalMedicaidCost = totalCost - totalOtherFunding;

      // This is the total medicaid costs broken into state and federal shares
      const medicaidCostShares = getAllocationOfTotalMedicaidCost(
        activity,
        year,
        totalMedicaidCost
      );

      // This represents the percentage each cost category contributes to the
      // total activity cost.  This is useful for distributing the total
      // in a way that we get whole numbers and preserve sums.
      const costCategoryPercentages = calculateCostCategoryPercentages(
        activityTotals,
        year
      );

      // Add the other funding amounts for the activity and year
      activityTotals = calculateOtherFundingByYear(
        activityTotals,
        totalOtherFunding,
        costCategoryPercentages,
        year
      );

      // Compute the state and federal share for each cost category, based on
      // the federal and state shares and the percentages calculated above.
      const costCategoryShare = calculateCostCategoryShare(
        medicaidCostShares,
        totalMedicaidCost,
        costCategoryPercentages
      );

      // Record these costs for each FFY of the activity
      newBudget.activities[activity.key].costsByFFY = calculateCostsByFFY(
        newBudget,
        activity.key,
        year,
        totalCost,
        medicaidCostShares,
        totalMedicaidCost
      );

      // Calculate the federal, state, and medicaid shares per
      // funding source (including MMIS) by FFY
      newBudget = calculateShareCosts(
        newBudget,
        fundingSource,
        year,
        costCategoryShare,
        medicaidCostShares,
        totalMedicaidCost,
        allocation,
        totalCost
      );

      // Now we compute the federal share per fiscal quarter for
      // this activity.
      newBudget = calculateQuarterlyCosts(
        newBudget,
        activity,
        fundingSource,
        year,
        costCategoryShare
      );
    });

    // Add the updated activity totals for the activity to the budget
    newBudget.activityTotals.push(activityTotals);
  });

  return roundValues(newBudget);
};
