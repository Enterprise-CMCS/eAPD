import { UPDATE_BUDGET } from '../actions/apd';
import { arrToObj } from '../util';

const getFundingSourcesByYear = years => ({
  ...years.reduce(
    (o, year) => ({
      ...o,
      [year]: {
        total: 0,
        federal: 0,
        state: 0
      }
    }),
    {}
  ),
  total: {
    total: 0,
    federal: 0,
    state: 0
  }
});

const expenseTypeNames = [
  'statePersonnel',
  'contractors',
  'expenses',
  'combined'
];

const FFPOptions = new Set(['90-10', '75-25', '50-50']);

const expenseTypes = (years, names = expenseTypeNames) =>
  names.reduce(
    (o, name) => ({
      ...o,
      [name]: getFundingSourcesByYear(years)
    }),
    {}
  );

const defaultFederalShare = years =>
  years.reduce(
    (o, year) => ({
      ...o,
      [year]: [1, 2, 3, 4].reduce(
        (q, quarter) => ({
          ...q,
          [quarter]: {
            state: 0,
            contractors: 0,
            combined: 0
          }
        }),
        {
          subtotal: {
            state: 0,
            contractors: 0,
            combined: 0
          }
        }
      )
    }),
    {
      total: {
        state: 0,
        contractors: 0,
        combined: 0
      }
    }
  );

const initialState = years => ({
  activities: {},
  combined: getFundingSourcesByYear(years),
  federalShareByFFYQuarter: {
    hitAndHie: defaultFederalShare(years),
    mmis: defaultFederalShare(years)
  },
  hie: expenseTypes(years),
  hit: expenseTypes(years),
  mmis: expenseTypes(years),
  hitAndHie: expenseTypes(years),
  mmisByFFP: expenseTypes(years, [...FFPOptions, 'combined']),
  activityTotals: [],
  years
});

// const spread = (number, acrossPercents) => {
//   const out = [];
//   let remainder = 0;

//   acrossPercents.forEach(percent => {
//     const value = number * percent + remainder;
//     remainder = value - Math.floor(value);

//     if (remainder > 0.5) {
//       // if the cumulative remainder to this point is over half, round up
//       out.push(Math.ceil(value));
//       // don't throwaway leftover remainders, or we might accidentally
//       // roll up a few extra times
//       remainder -= 1;
//     } else {
//       // otherwise round down
//       out.push(Math.floor(value));
//     }
//   });

//   return out;
// };

// Convert things to numbers, or default to zero.
const n = x => +x || 0;

const newBuildBudget = bigState => {
  // Get a shell of our new state object.  This essentially guarantees
  // that all of the properties and stuff will exist, so we don't have
  // to have a bunch of code checking for it.
  const { years } = bigState.apd.data;
  const newState = initialState(years);

  const addCostToTotals = (fundingSource, year, prop, cost) => {
    newState[fundingSource][prop][year].total += cost;
    newState[fundingSource][prop].total.total += cost;
    newState[fundingSource].combined[year].total += cost;
    newState[fundingSource].combined.total.total += cost;

    if (fundingSource !== 'hitAndHie') {
      newState.combined[year].total += cost;
      newState.combined.total.total += cost;
    }

    if (fundingSource === 'hie' || fundingSource === 'hit') {
      addCostToTotals('hitAndHie', year, prop, cost);
    }
  };

  // Since all of our expenses are tied up in activities, we'll start
  // by looking at all of them and doing Magic Math™. (It's not magic.)
  Object.values(bigState.activities.byKey).forEach(activity => {
    // We need to know the funding source so we know where to apply
    // this data in the big rollup budget.
    const fundingSource = activity.fundingSource.toLowerCase();

    // And of course we need to know how the costs are allocated between
    // the state and federal shares.
    const allocation = activity.costAllocation;

    // We also compute quarterly FFP per activity, so we go ahead and
    // create that object here.  We'll fill it in later.
    newState.activities[activity.key] = {
      quarterlyFFP: {
        ...arrToObj(years, () => ({
          ...arrToObj(['1', '2', '3', '4'], () => ({
            combined: { dollars: 0, percent: 0 },
            contractors: { dollars: 0, percent: 0 },
            state: { dollars: 0, percent: 0 }
          })),
          subtotal: {
            combined: { dollars: 0, percent: 0 },
            contractors: { dollars: 0, percent: 0 },
            state: { dollars: 0, percent: 0 }
          }
        })),
        total: {
          combined: { dollars: 0, percent: 0 },
          contractors: { dollars: 0, percent: 0 },
          state: { dollars: 0, percent: 0 }
        }
      }
    };

    /**
     * Get the state and federal share of costs for an amount for
     * a given year of the current activity.
     * @param {String} year As a four-character year string (e.g., '2018')
     * @param {Number} amount The amount to allocate over state and federal shares
     * @returns {{fedShare:Number, stateShare:Number other stuff}} The state and federal share
     */
    const getAllocation = (year, amount) => ({
      fedShare: n(amount) * activity.costAllocation[year].ffp.federal / 100,
      stateShare: n(amount) * activity.costAllocation[year].ffp.state / 100
    });

    // For each activity, we need to independently track the
    // total cost for each category, per fiscal year.  This isn't
    // stored in the budget anywhere, so we'll track it as a local
    // variable.
    const activityTotalByCategory = arrToObj(years, () => ({
      contractors: 0,
      expenses: 0,
      statePersonnel: 0
    }));

    // First compute the total of each cost category both within
    // fiscal years and across them, for all cost categories.  We
    // need these completed before we can compute what percentage
    // each cost category contributes to the total cost, further down.
    activity.contractorResources.forEach(contractor => {
      Object.entries(contractor.years).forEach(([year, cost]) => {
        addCostToTotals(fundingSource, year, 'contractors', cost);
        activityTotalByCategory[year].contractors += cost;
      });
    });

    activity.expenses.forEach(expense => {
      Object.entries(expense.years).forEach(([year, cost]) => {
        addCostToTotals(fundingSource, year, 'expenses', cost);
        activityTotalByCategory[year].expenses += cost;
      });
    });

    activity.statePersonnel.forEach(person => {
      Object.entries(person.years).forEach(([year, { amt, perc }]) => {
        const cost = amt * perc / 100;
        addCostToTotals(fundingSource, year, 'statePersonnel', cost);
        activityTotalByCategory[year].statePersonnel += cost;
      });
    });

    /**
     * Get the amount of "other funding" attributed to each type of
     * cost for a given year of the current activity.
     * @description For each type of cost, this method calculates that type's
     *    contribution to the total cost for the year.  It then applies that
     *    same percentage to the total "other funding".  For example:
     *
     *    other funding is $200
     *    the total cost is $1,000
     *    contractor costs are $500
     *    contractor costs is 50% of total costs
     *    so other funding for contractor costs is 50% * $200 = $100
     *
     *    This function is placed here in the code because it depends on the
     *    results of the previous calculations.  This way if anyone accidentally
     *    uses it earlier in the code, it will be an error because the function
     *    hasn't been defined yet.
     * @param {String} year As a four-character year string (e.g., '2018')
     * @returns {{contractors:Number, expenses:Number, statePersonnel:Number}} Other funding for each type of cost
     */
    const getOtherFunding = year => {
      const otherTotal = n(allocation[year].other);

      const costs = newState[fundingSource];
      const yearTotal = costs.combined[year].total;

      return {
        contractors: otherTotal * costs.contractors[year].total / yearTotal,
        expenses: otherTotal * costs.expenses[year].total / yearTotal,
        statePersonnel:
          otherTotal * costs.statePersonnel[year].total / yearTotal
      };
    };

    // Now loop back over the years and compute state and federal shares
    // of all the costs.
    years.forEach(year => {
      const other = getOtherFunding(year);

      // Also loop over all the cost categories.
      ['contractors', 'expenses', 'statePersonnel'].forEach(prop => {
        const totalCost = activityTotalByCategory[year][prop];
        const totalGovShare = totalCost - other[prop];
        const cost = getAllocation(year, totalGovShare);

        const addShares = fs => {
          // Add total federal share, and federal share for the year
          newState[fs][prop][year].federal += cost.fedShare;
          newState[fs][prop].total.federal += cost.fedShare;

          // ...then state share for the same.
          newState[fs][prop][year].state += cost.stateShare;
          newState[fs][prop].total.state += cost.stateShare;

          // Then add those to combined costs, also as total and yearly.
          newState[fs].combined[year].federal += cost.fedShare;
          newState[fs].combined.total.federal += cost.fedShare;
          newState[fs].combined[year].state += cost.stateShare;
          newState[fs].combined.total.state += cost.stateShare;
        };

        addShares(fundingSource);

        if (fundingSource === 'hie' || fundingSource === 'hit') {
          // We need to track expenses as combined between HIE and HIT,
          // so for those funding sources, run again.
          addShares('hitAndHie');
        } else {
          // But for MMIS activities, we need to track costs per FFP level
          // (90/10, 75/25, 50/50)
          const ffpLevel = `${allocation[year].ffp.federal}-${
            allocation[year].ffp.state
          }`;

          // Add state, federal, and total cost for this FFP level
          // for the current FFY
          newState.mmisByFFP[ffpLevel][year].federal += cost.fedShare;
          newState.mmisByFFP[ffpLevel][year].state += cost.stateShare;
          newState.mmisByFFP[ffpLevel][year].total += totalCost;

          // Then add them to the subtotals for the FFP level
          newState.mmisByFFP[ffpLevel].total.federal += cost.fedShare;
          newState.mmisByFFP[ffpLevel].total.state += cost.stateShare;
          newState.mmisByFFP[ffpLevel].total.total += totalCost;

          // And the subtotals for the FFY
          newState.mmisByFFP.combined[year].federal += cost.fedShare;
          newState.mmisByFFP.combined[year].state += cost.stateShare;
          newState.mmisByFFP.combined[year].total += totalCost;

          // And finally the grand totals
          newState.mmisByFFP.combined.total.federal += cost.fedShare;
          newState.mmisByFFP.combined.total.state += cost.stateShare;
          newState.mmisByFFP.combined.total.total += totalCost;
        }

        // And FINALLY, total combined across all funding sources.
        newState.combined[year].federal += cost.fedShare;
        newState.combined.total.federal += cost.fedShare;
        newState.combined[year].state += cost.stateShare;
        newState.combined.total.state += cost.stateShare;

        // Now we compute the federal share per fiscal quarter for
        // this activity.
        const ffp = activity.quarterlyFFP[year];
        const ffpSource = fundingSource === 'mmis' ? 'mmis' : 'hitAndHie';
        const activityFFP = newState.activities[activity.key].quarterlyFFP;
        const quarterlyFFP = newState.federalShareByFFYQuarter[ffpSource];
        const propCostType = prop === 'contractors' ? 'contractors' : 'state';

        // Shortcut to loop over quarters.  :)
        [...Array(4)].forEach((_, q) => {
          // Compute the federal share for this quarter.
          const federalPct = ffp[q + 1][propCostType] / 100;
          const qFFP = cost.fedShare * ffp[q + 1][propCostType] / 100;

          activityFFP[year][q + 1][propCostType].dollars += qFFP;
          activityFFP[year][q + 1][propCostType].percent = federalPct;
          activityFFP[year].subtotal[propCostType].dollars += qFFP;
          activityFFP[year].subtotal[propCostType].percent += federalPct;
          activityFFP.total[propCostType].dollars += qFFP;
          activityFFP.total[propCostType].percent += federalPct;

          // For the expense type, add the federal share for the
          // quarter and the fiscal year subtotal.
          quarterlyFFP[year][q + 1][propCostType] += qFFP;
          quarterlyFFP[year].subtotal[propCostType] += qFFP;

          // Also add the federal share to the cross-expense
          // quarterly subtotal and fiscal year subtotal
          quarterlyFFP[year][q + 1].combined += qFFP;
          quarterlyFFP[year].subtotal.combined += qFFP;

          // And finally, add it to the expense type grand
          // total and the federal share grand total
          quarterlyFFP.total[propCostType] += qFFP;
          quarterlyFFP.total.combined += qFFP;
        });
      });
    });
  });

  return newState;
};

const reducer = (state = initialState([]), action) => {
  switch (action.type) {
    case UPDATE_BUDGET:
      return newBuildBudget(action.state);
    default:
      return state;
  }
};

export { expenseTypeNames, initialState };
export default reducer;
