import roundedPercents from './roundedPercents';
import { arrToObj, convertToNumber } from './formatting';
import { deepCopy } from './utils';

export const EXPENSE_TYPE_NAMES = [
  'statePersonnel',
  'contractors',
  'expenses',
  'combined'
];

export const FFP_OPTIONS = new Set(['90-10', '75-25', '50-50', '0-100']);

/**
 * Rounds a number to the given number of decimal places.
 * @param {Integer} value the value to round
 * @param {Integer} digits the number of digits to round to, defaults to 2
 * @returns The rounded value
 */
const fixNum = (value, digits = 2) => {
  const mult = 10 ** digits;
  return Math.round(value * mult) / mult;
};

/**
 * Creates a default Funding Source object by year and total.
 * @param {Array} years
 * @returns the Funding Source object
 */
const getDefaultFundingSourcesByYear = years => ({
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
 * Creates a deafult Expense object with Funding Source objects for each expense type
 * @param {Array} years
 * @param {Array} names
 * @returns the Expense object
 */
const expenseTypes = (years, names = EXPENSE_TYPE_NAMES) =>
  names.reduce(
    (o, name) => ({
      ...o,
      [name]: getDefaultFundingSourcesByYear(years)
    }),
    {}
  );

/**
 * Creates a default Federal Share object by year and total.
 * @param {Array} years
 * @returns the Federal Share object
 */
const defaultFederalShare = years =>
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
 * Creates the default Budget object by years
 * @param {Array} years
 * @returns the Budget object
 */
export const defaultBudget = years => ({
  activities: {},
  combined: getDefaultFundingSourcesByYear(years),
  federalShareByFFYQuarter: {
    hitAndHie: defaultFederalShare(years),
    mmis: defaultFederalShare(years)
  },
  hie: expenseTypes(years),
  hit: expenseTypes(years),
  mmis: expenseTypes(years),
  hitAndHie: expenseTypes(years),
  mmisByFFP: expenseTypes(years, [...FFP_OPTIONS, 'combined']),
  activityTotals: [],
  years
});

/**
 * Adds a given cost to the budget running totals.
 * @param {String} fundingSourceBudget The existing budget for a funding source
 * @param {String} year As a four-character year string (e.g., '2018')
 * @param {String} prop The property this cost comes from (e.g., "contractors", "statePersonnel")
 * @param {Number} cost The cost value.
 */
export const addCostsToFundingSource = (
  fundingSourceBudget,
  year,
  prop,
  cost
) => {
  // adding cost to the existing totals
  return {
    ...fundingSourceBudget,
    [prop]: {
      ...fundingSourceBudget[prop],
      [year]: {
        ...fundingSourceBudget[prop][year],
        total: fundingSourceBudget[prop][year].total + cost
      },
      total: {
        ...fundingSourceBudget[prop].total,
        total: fundingSourceBudget[prop].total.total + cost
      }
    },
    combined: {
      ...fundingSourceBudget.combined,
      [year]: {
        ...fundingSourceBudget.combined[year],
        total: fundingSourceBudget.combined[year].total + cost
      },
      total: {
        ...fundingSourceBudget.combined.total,
        total: fundingSourceBudget.combined.total.total + cost
      }
    }
  };
};

/**
 * Adds a given cost to the budget running totals.
 * @param {Object} budget The existing budget
 * @param {String} fundingSource The CMS funding program of the cost
 * @param {String} year As a four-character year string (e.g., '2018')
 * @param {String} prop The property this cost comes from (e.g., "contractors", "statePersonnel")
 * @param {Number} cost The cost value.
 */
export const addCostToTotals = (budget, fundingSource, year, prop, cost) => {
  const updates = {};

  // New activities don't have a funding program by default, so in that case,
  // we can't capture program-specific funding numbers.
  if (fundingSource) {
    updates.fundingSourceUpdates = addCostsToFundingSource(
      budget[fundingSource],
      year,
      prop,
      cost
    );
  }

  // Because HIT and HIE sources have already added to the grand
  // totals, don't also do it for the combined source.
  if (fundingSource !== 'hitAndHie') {
    updates.combinedUpdates = {
      ...budget.combined,
      [year]: {
        ...budget.combined[year],
        total: budget.combined[year].total + cost
      },
      total: {
        ...budget.combined.total,
        total: budget.combined.total.total + cost
      }
    };
  }

  // HIT and HIE are rolled up into a single combined source for
  // some of the budget data, so for those, just run again.
  if (fundingSource === 'hie' || fundingSource === 'hit') {
    updates.hitAndHieUpdates = addCostsToFundingSource(
      budget['hitAndHie'],
      year,
      prop,
      cost
    );
  }
  return updates;
};

/**
 * Get the state and federal share of costs for an amount for
 * a given year of the current activity.
 * @param {Object} activity The activity budget object
 * @param {String} year As a four-character year string (e.g., '2018')
 * @param {Number} amount The amount to allocate over state and federal shares
 * @returns {{fedShare:Number, stateShare:Number other stuff}} The state and federal share
 */
export const getAllocation = (activity, year, amount) => {
  const [fedShare, stateShare] = roundedPercents(convertToNumber(amount), [
    activity.costAllocation[year].ffp.federal / 100,
    activity.costAllocation[year].ffp.state / 100
  ]);
  return { fedShare, stateShare };
};

/**
 * Updates the state personnel list and adds the key personnel with costs
 * to the list if the activity is a Program Administration activity.
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
 * Compute quarterly FFP per activity
 * @param {Array} years
 * @returns the default quarterly FFP per activity
 */
export const defaultQuarterlyFFPperActivity = years => ({
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

export const defaultActivityTotals = (id, name, fundingSource, years) => ({
  fundingSource,
  id,
  name,
  data: {
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
  }
});

export const updateBudget = apd => {
  // Clone the incoming state, so we don't accidentally change anything.
  const {
    data: {
      years,
      activities,
      keyStatePersonnel: { keyPersonnel }
    }
  } = JSON.parse(JSON.stringify(apd));

  // Create a default budget object.  This essentially guarantees
  // that all of the properties and stuff will exist, so we don't have
  // to have a bunch of code checking for it.
  const newBudget = defaultBudget(years);

  // Since all of our expenses are tied up in activities, we'll start
  // by looking at all of them and doing Magic Math™. (It's not magic.)
  activities.forEach(activity => {
    activity.statePersonnel = updateStatePersonnel(
      activity.name,
      activity.statePersonnel,
      keyPersonnel
    );

    // We need to know the funding source so we know where to apply
    // this data in the big rollup budget.
    const fundingSource =
      activity.fundingSource && activity.fundingSource.toLowerCase();

    // And of course we need to know how the costs are allocated between
    // the state and federal shares.
    const allocation = activity.costAllocation;

    // We also compute quarterly FFP per activity, so we go ahead and
    // create that object here.  We'll fill it in later.
    newBudget.activities[activity.key] = defaultQuarterlyFFPperActivity(years);

    // We need to sum up the total cost of each cost category per
    // fiscal year for the activity as well, so let's make an object
    // for tracking that and go ahead and push it into the budget data.
    const activityTotals = defaultActivityTotals(
      activity.id,
      activity.name,
      activity.fundingSource,
      years
    );

    newBudget.activityTotals.push(activityTotals);

    // For each activity, we need to independently track the
    // total cost for each category, per fiscal year.  This isn't
    // stored in the budget anywhere, so we'll track it as a local
    // variable.  This is super similar to the activityTotals above,
    // but the object structure is different.  Rather than munge
    // that object into this shape later, we'll just capture both
    // at the same time.  That's more straightforward.
    const activityTotalByCategory = arrToObj(years, () => ({
      contractors: 0,
      expenses: 0,
      statePersonnel: 0
    }));

    // First compute the total of each cost category both within
    // fiscal years and across them, for all cost categories.  We
    // need these completed before we can compute what percentage
    // each cost category contributes to the total cost, further down.
    // While we're here, also compute the cost category totals
    // per activity.  The data is structured differently than the
    // "activityTotalByCategory" and it seems cleaner to just
    // do them simultaneously than to munge one object into the
    // other after the fact.
    activity.contractorResources.forEach(contractor => {
      Object.entries(contractor.years).forEach(([year, cost]) => {
        const { fundingSourceUpdates, combinedUpdates, hitAndHieUpdates } =
          addCostToTotals(newBudget, fundingSource, year, 'contractors', cost);
        newBudget[fundingSource] = fundingSourceUpdates;
        newBudget.combined = combinedUpdates;
        if (hitAndHieUpdates) newBudget['hitAndHie'] = hitAndHieUpdates;

        activityTotalByCategory[year].contractors += cost;

        activityTotals.data.contractors[year] += cost;
        activityTotals.data.contractors.total += cost;
        activityTotals.data.combined[year] += cost;
        activityTotals.data.combined.total += cost;
      });
    });

    activity.expenses.forEach(expense => {
      Object.entries(expense.years).forEach(([year, cost]) => {
        const { fundingSourceUpdates, combinedUpdates, hitAndHieUpdates } =
          addCostToTotals(newBudget, fundingSource, year, 'expenses', cost);
        newBudget[fundingSource] = fundingSourceUpdates;
        newBudget.combined = combinedUpdates;
        if (hitAndHieUpdates) newBudget['hitAndHie'] = hitAndHieUpdates;

        activityTotalByCategory[year].expenses += cost;

        activityTotals.data.expenses[year] += cost;
        activityTotals.data.expenses.total += cost;
        activityTotals.data.combined[year] += cost;
        activityTotals.data.combined.total += cost;
      });
    });

    activity.statePersonnel.forEach(person => {
      Object.entries(person.years).forEach(([year, { amt, perc }]) => {
        const cost = convertToNumber(amt) * convertToNumber(perc);

        const { fundingSourceUpdates, combinedUpdates, hitAndHieUpdates } =
          addCostToTotals(
            newBudget,
            fundingSource,
            year,
            'statePersonnel',
            cost
          );
        newBudget[fundingSource] = fundingSourceUpdates;
        newBudget.combined = combinedUpdates;
        if (hitAndHieUpdates) newBudget['hitAndHie'] = hitAndHieUpdates;

        activityTotalByCategory[year].statePersonnel += cost;

        activityTotals.data.statePersonnel[year] += cost;
        activityTotals.data.statePersonnel.total += cost;
        activityTotals.data.combined[year] += cost;
        activityTotals.data.combined.total += cost;
      });
    });

    // Converts an array where the values correspond to contractors,
    // expenses, and state personnel values, respectively.
    const costShareReducer = (acc, value, i) => ({
      ...acc,
      [['contractors', 'expenses', 'statePersonnel'][i]]: value
    });

    // Now loop back over the years and compute state and federal shares
    // of all the costs.
    years.forEach(year => {
      const totalOtherFunding = convertToNumber(allocation[year].other);
      const activityCostByFFY = newBudget.activities[activity.key].costsByFFY;
      const totalCost = activityTotals.data.combined[year];
      const totalMedicaidShare = totalCost - totalOtherFunding;

      // This is the Medicaid total share broken into state and federal shares
      const costShares = getAllocation(activity, year, totalMedicaidShare);

      // This represents the percentage each cost category contributes to the
      // total activity cost.  This is useful for distributing the total
      // in a way that we get whole numbers and preserve sums.
      const costCategoryPercentages = [
        activityTotals.data.contractors[year] / totalCost || 0,
        activityTotals.data.expenses[year] / totalCost || 0,
        activityTotals.data.statePersonnel[year] / totalCost || 0
      ];

      // Calculate how much of the activity's other funding for the current
      // federal fiscal year is applied to each cost category.
      activityTotals.data.otherFunding[year].total = totalOtherFunding;
      const otherFunderPerCostCategory = roundedPercents(
        totalOtherFunding,
        costCategoryPercentages
      );
      [
        activityTotals.data.otherFunding[year].contractors,
        activityTotals.data.otherFunding[year].expenses,
        activityTotals.data.otherFunding[year].statePersonnel
      ] = otherFunderPerCostCategory;

      // Compute the state and federal share for each cost category, based on
      // the federal and state shares and the percentages calculated above.
      const fedShare = roundedPercents(
        costShares.fedShare,
        costCategoryPercentages
      ).reduce(costShareReducer, {});
      const stateShare = roundedPercents(
        costShares.stateShare,
        costCategoryPercentages
      ).reduce(costShareReducer, {});
      const medicaidShare = roundedPercents(
        totalMedicaidShare,
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

      // Record these costs for each FFY of the activity. These are used in
      // the cost allocation display, so the user can see at an activity
      // level their total costs and cost distributions.
      activityCostByFFY[year].total = totalCost;
      activityCostByFFY[year].federal = costShares.fedShare;
      activityCostByFFY[year].state = costShares.stateShare;
      activityCostByFFY[year].medicaidShare = totalMedicaidShare;

      activityCostByFFY.total.total += totalCost;
      activityCostByFFY.total.federal += costShares.fedShare;
      activityCostByFFY.total.state += costShares.stateShare;
      activityCostByFFY.total.medicaidShare += totalMedicaidShare;

      /**
       * Update the running totals for the various cost categories, subtotals,
       * and totals for a given funding source (hie, hit, or hitAndHie).
       * @param {String} fs The funding source to update
       */
      const updateCosts = fs => {
        // Update the three cost categories...
        ['contractors', 'expenses', 'statePersonnel'].forEach(prop => {
          newBudget[fs][prop][year].federal += fedShare[prop];
          newBudget[fs][prop].total.federal += fedShare[prop];

          newBudget[fs][prop][year].state += stateShare[prop];
          newBudget[fs][prop].total.state += stateShare[prop];

          newBudget[fs][prop][year].medicaid += medicaidShare[prop];
          newBudget[fs][prop].total.medicaid += medicaidShare[prop];
        });

        // Plus the subtotals for the cost categories (i.e., the
        // Medicaid share)
        newBudget[fs].combined[year].federal += costShares.fedShare;
        newBudget[fs].combined.total.federal += costShares.fedShare;

        newBudget[fs].combined[year].state += costShares.stateShare;
        newBudget[fs].combined.total.state += costShares.stateShare;

        newBudget[fs].combined[year].medicaid += totalMedicaidShare;
        newBudget[fs].combined.total.medicaid += totalMedicaidShare;
      };

      // New activities don't have a funding program by default, so don't
      // the program-specific totals for those activities.
      if (fundingSource) {
        updateCosts(fundingSource);
      }

      newBudget.combined[year].federal += costShares.fedShare;
      newBudget.combined.total.federal += costShares.fedShare;
      newBudget.combined[year].state += costShares.stateShare;
      newBudget.combined.total.state += costShares.stateShare;
      newBudget.combined[year].medicaid += totalMedicaidShare;
      newBudget.combined.total.medicaid += totalMedicaidShare;

      if (fundingSource === 'hie' || fundingSource === 'hit') {
        // We need to track HIE and HIT combined, so we have a funding source
        // called hitAndHie.  If this is HIE or HIT, roll it into that one too.
        updateCosts('hitAndHie');
      } else if (fundingSource === 'mmis') {
        // For MMIS, we need to track costs by "FFP type", too - that is,
        // the cost allocation.  So we need to know total costs for MMIS
        // at the 90/10 level, at the 75/25 level, and at the 50/50 level.

        // Compute a string that represents the MMIS level for this activity
        const ffpLevel = `${allocation[year].ffp.federal}-${allocation[year].ffp.state}`;

        // Then do basically the same as updateCosts() above, but we only
        // need to track subtotals, not individual cost categories
        [ffpLevel, 'combined'].forEach(prop => {
          newBudget.mmisByFFP[prop][year].federal += costShares.fedShare;
          newBudget.mmisByFFP[prop].total.federal += costShares.fedShare;

          newBudget.mmisByFFP[prop][year].state += costShares.stateShare;
          newBudget.mmisByFFP[prop].total.state += costShares.stateShare;

          newBudget.mmisByFFP[prop][year].medicaid += totalMedicaidShare;
          newBudget.mmisByFFP[prop].total.medicaid += totalMedicaidShare;

          newBudget.mmisByFFP[prop][year].total += totalCost;
          newBudget.mmisByFFP[prop].total.total += totalCost;
        });
      }

      // Now we compute the federal share per fiscal quarter for
      // this activity.
      const ffp = activity.quarterlyFFP[year];
      const ffpSource = fundingSource === 'mmis' ? 'mmis' : 'hitAndHie';
      const activityFFP = newBudget.activities[activity.key].quarterlyFFP;
      const quarterlyFFP = newBudget.federalShareByFFYQuarter[ffpSource];

      ['contractors', 'expenses', 'statePersonnel'].forEach(prop => {
        const ffpType = prop === 'contractors' ? 'contractors' : 'inHouse';
        const propCostType = prop === 'contractors' ? 'contractors' : 'inHouse';

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

        // Compute the federal dollar payment across the quarters.
        quarterlyInfo.qFFPs = roundedPercents(
          fedShare[prop],
          quarterlyInfo.federalPcts
        );

        // Gather up the totals for the cost types and the combined total. Do
        // this here so these values aren't affected by the percentages input
        // by the state. These totals are based only on the federal share
        // computed from the activity total costs.
        activityFFP[year].subtotal[propCostType].dollars += fedShare[prop];
        activityFFP[year].subtotal.combined.dollars += fedShare[prop];

        // Note that the grand activity total props are just numbers, not
        // objects - we drop the percentage altogether.
        activityFFP.total[propCostType] += fedShare[prop];
        activityFFP.total.combined += fedShare[prop];

        // New activities don't have a funding program by default. In that
        // case, don't add this activity's costs to the program-level totals.
        if (fundingSource) {
          // For the expense type, add the federal share for the
          // quarter and the fiscal year subtotal.
          quarterlyFFP[year].subtotal[propCostType] += fedShare[prop];

          // Also add the federal share to the cross-expense
          // quarterly subtotal and fiscal year subtotal
          quarterlyFFP[year].subtotal.combined += fedShare[prop];

          // And finally, add it to the expense type grand
          // total and the federal share grand total
          quarterlyFFP.total[propCostType] += fedShare[prop];
          quarterlyFFP.total.combined += fedShare[prop];
        }

        // Shortcut to loop over quarters.  :)
        [...Array(4)].forEach((_, q) => {
          // Compute the federal share for this quarter.
          const federalPct = quarterlyInfo.federalPcts[q];
          const qFFP = quarterlyInfo.qFFPs[q];

          // Total cost and percent for this type.  Note that we don't
          // sum the percent here because there are two categories being
          // merged into one - if we summed, the "state" percents would
          // all be doubled.
          activityFFP[year][q + 1][propCostType].dollars += qFFP;
          activityFFP[year][q + 1][propCostType].percent = federalPct;

          // Then the quarterly combined dollars.  We don't bother
          // with percent for combined because it doesn't make sense.
          activityFFP[year][q + 1].combined.dollars += qFFP;

          // Fiscal year percentage. Because "expense" and "statePersonnel"
          // are combined into the "inHouse" property, we need to be careful
          // about not adding the percent multiple times.  So, only
          // add the percent if this is not an "expense" type.
          if (prop !== 'expenses') {
            activityFFP[year].subtotal[propCostType].percent += federalPct;
          }

          // New activities don't have a funding program by default. In that
          // case, don't add this activity's quarterly costs to the
          // program-level roll-ups.
          if (fundingSource) {
            // For the expense type, add the federal share for the quarter.
            quarterlyFFP[year][q + 1][propCostType] += qFFP;

            // Also add the federal share to the cross-expense quarterly subtotal
            quarterlyFFP[year][q + 1].combined += qFFP;
          }
        });
      });
    });
  });

  const roundProps = o => {
    Object.entries(o).forEach(([key, value]) => {
      if (value) {
        if (typeof value === 'number') {
          o[key] = fixNum(value);
        } else if (typeof value === 'object') {
          roundProps(value);
        }
      }
    });
  };
  roundProps(newBudget);

  return newBudget;
};
