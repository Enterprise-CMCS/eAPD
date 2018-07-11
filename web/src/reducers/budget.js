import u from 'updeep';

import { UPDATE_BUDGET, UPDATE_BUDGET_QUARTERLY_SHARE } from '../actions/apd';
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
            percent: 25,
            contractors: 50000,
            expenses: 0,
            statePersonnel: 0,
            total: 0
          }
        }),
        {
          subtotal: {
            contractors: 0,
            expenses: 0,
            statePersonnel: 0,
            total: 0
          }
        }
      )
    }),
    {
      total: {
        contractors: 0,
        expenses: 0,
        statePersonnel: 0,
        total: 0
      }
    }
  );

const defaultQuarterlyShares = years => ({
  ...years.reduce(
    (o, year) => ({
      ...o,
      [year]: { 1: 25, 2: 25, 3: 25, 4: 25 }
    }),
    {}
  )
});

const initQuarterly = years => ({
  hitAndHie: defaultQuarterlyShares(years),
  mmis: defaultQuarterlyShares(years)
});

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
  quarterly: initQuarterly(years),
  years
});

const budgetInput = (type, value = v => +v, target = null) => ({
  type,
  value,
  target: target || type
});

const budgetInputs = [
  budgetInput('statePersonnel', year => +year.amt * +year.perc / 100),
  budgetInput('contractorResources', undefined, 'contractors'),
  budgetInput('expenses')
];

const activities = src => Object.values(src.activities.byId);

const fixNum = (value, digits = 2) => {
  const mult = 10 ** digits;
  return Math.round(value * mult) / mult;
};

// The default for from is to handle the case where an expense
// block doesn't have any rows.  In that case, from is never
// populated.  But that block doesn't conribute to the budget,
// either, so easiest thing to do is just zero it out.
const addBudgetBlocks = (into, from = { total: 0, federal: 0, state: 0 }) => {
  const out = into;
  out.total += from.total;
  out.federal += from.federal;
  out.state += from.state;
};

const collapseAllAmounts = activity => {
  const totals = arrToObj(activity.years);

  budgetInputs.forEach(({ type, value }) => {
    activity[type].forEach(entry => {
      Object.keys(entry.years).forEach(year => {
        totals[year] += value(entry.years[year]);
      });
    });
  });

  return totals;
};

// This must be recomputed. Based on federal share by activity per quarter
const getFederalShareByFFYQuarter = (quartersByFFY, fundingSource) =>
  Object.entries(quartersByFFY).reduce(
    (accum, [ffy, quarters]) => ({
      ...accum,
      [ffy]: Object.entries(quarters).reduce(
        (qAccum, [quarter, percent]) => ({
          ...qAccum,
          [quarter]: {
            percent,
            contractors: fundingSource.contractors[ffy].federal * percent / 100,
            expenses: fundingSource.expenses[ffy].federal * percent / 100,
            statePersonnel:
              fundingSource.statePersonnel[ffy].federal * percent / 100,
            total: fundingSource.combined[ffy].federal * percent / 100
          }
        }),
        {
          subtotal: {
            contractors: fundingSource.contractors[ffy].federal,
            expenses: fundingSource.expenses[ffy].federal,
            statePersonnel: fundingSource.statePersonnel[ffy].federal,
            total: fundingSource.combined[ffy].federal
          }
        }
      )
    }),
    {
      total: {
        contractors: fundingSource.contractors.total.federal,
        expenses: fundingSource.expenses.total.federal,
        statePersonnel: fundingSource.statePersonnel.total.federal,
        total: fundingSource.combined.total.federal
      }
    }
  );

const getTotalsForActivity = activity => {
  const fundingSource = activity.fundingSource.toLowerCase();
  const allocate = activity.costAllocation;
  const totalByYear = collapseAllAmounts(activity);

  const netOtherPercent = year => {
    const { other } = allocate[year];
    const total = totalByYear[year];
    return total ? 1 - other / total : 1;
  };

  return {
    collapse: (type, value = v => +v) => {
      const collapsed = {};
      activity[type].forEach(expense => {
        Object.keys(expense.years).forEach(year => {
          if (!collapsed[year]) {
            collapsed[year] = { total: 0, federal: 0, state: 0 };
          }

          const total = value(expense.years[year]);
          const totalNetOther = total * netOtherPercent(year);
          const { federal, state } = allocate[year].ffp;

          addBudgetBlocks(collapsed[year], {
            total,
            federal: fixNum(totalNetOther * federal / 100),
            state: fixNum(totalNetOther * state / 100)
          });
        });
      });

      return {
        raw: () => collapsed,
        totals: () => {
          const total = { total: 0, federal: 0, state: 0 };
          Object.values(collapsed).forEach(year => {
            addBudgetBlocks(total, year);
          });

          return {
            merge: (bigState, target = type) => {
              const merged = bigState[fundingSource][target];

              Object.keys(merged).forEach(year => {
                if (year !== 'total') {
                  addBudgetBlocks(merged[year], collapsed[year]);
                }
              });

              addBudgetBlocks(merged.total, total);
              return merged;
            }
          };
        }
      };
    }
  };
};

const getTotalsForFundingSource = (bigState, fundingSource) => {
  const fsUpdate = bigState[fundingSource].combined;
  const grandTotals = bigState.combined;

  Object.entries(bigState[fundingSource]).forEach(([type, values]) => {
    if (type !== 'combined') {
      Object.entries(values).forEach(([year, value]) => {
        addBudgetBlocks(fsUpdate[year], value);
        addBudgetBlocks(grandTotals[year], value);
      });
    }
  });
};

const combineHitAndHie = bigState => {
  const { hit, hie, hitAndHie } = bigState;
  const entries = [...Object.entries(hit), ...Object.entries(hie)];

  entries.forEach(([type, values]) => {
    Object.entries(values).forEach(([year, value]) => {
      addBudgetBlocks(hitAndHie[type][year], value);
    });
  });
};

const computeMmisByFFP = (bigState, activityEntries) => {
  const { mmisByFFP } = bigState;
  const grandTotals = mmisByFFP.combined;

  activityEntries.filter(a => a.fundingSource === 'MMIS').forEach(activity => {
    const allocate = activity.costAllocation;
    const totalByYear = collapseAllAmounts(activity);

    Object.keys(totalByYear).forEach(year => {
      const { ffp, other } = allocate[year];
      const ffpKey = `${ffp.federal}-${ffp.state}`;

      if (FFPOptions.has(ffpKey)) {
        const total = totalByYear[year];
        const totalNetOther = total - other;
        const federal = totalNetOther * ffp.federal / 100;
        const state = totalNetOther * ffp.state / 100;
        const result = { total, federal, state };

        addBudgetBlocks(mmisByFFP[ffpKey][year], result);
        addBudgetBlocks(mmisByFFP[ffpKey].total, result);
        addBudgetBlocks(grandTotals[year], result);
        addBudgetBlocks(grandTotals.total, result);
      }
    });
  });
};

const buildBudget = wholeState => {
  const newState = initialState(wholeState.apd.data.years);
  const activityEntries = activities(wholeState);

  activityEntries.forEach(activity => {
    newState.activities[activity.id] = {};
    const totaller = getTotalsForActivity(activity);

    budgetInputs.forEach(({ type, value, target }) => {
      totaller
        .collapse(type, value)
        .totals()
        .merge(newState, target);
    });

    // Calculate total state expenses for this activity.  That is,
    // state personnel * FTE% plus non-personnel expenses, per
    // fiscal year.
    const stateExpenses = totaller
      .collapse('statePersonnel', year => +year.amt * +year.perc / 100)
      .raw();
    const expenses = totaller.collapse('expenses').raw();
    Object.entries(stateExpenses).forEach(([year, values]) => {
      Object.keys(values).forEach(key => {
        stateExpenses[year][key] += expenses[year][key];
      });
    });

    // Same with contractor expenses, but this one is straightforward.
    const contractorExpenses = totaller.collapse('contractorResources').raw();

    // This is the percent of the federal share per fiscal quarter,
    // by expense type.  This is entered in the
    // Activi
    const ffpPercents = activity.quarterlyFFP;

    // The grand total of the federal share of this activity's
    // state and contractor expenses, across all quarters
    // and fiscal years
    const total = { state: 0, contractors: 0, combined: 0 };

    newState.activities[activity.id].quarterlyFFP = Object.keys(
      stateExpenses
    ).reduce(
      (ffyCumulate, year) => ({
        ...ffyCumulate,
        [year]: [1, 2, 3, 4].reduce(
          (quarterCumulatve, quarter) => {
            // The federal percent for this FFY, per quarter
            const ffyQuarterPct = ffpPercents[year][quarter];

            // These are the federal shares of these expenses
            // for the fiscal quarter.  The budget reducer
            // stores percentages as 0-1, so we need to
            // convert those here.

            const statePct = ffyQuarterPct.state / 100;
            const state = stateExpenses[year].federal * statePct;

            const contractorsPct = ffyQuarterPct.contractors / 100;
            const contractors =
              contractorExpenses[year].federal * contractorsPct;

            const combined = state + contractors;

            // Capture this in the grand total...
            total.state += state;
            total.contractors += contractors;
            total.combined += combined;

            // ...and in the FFY subtotal
            const { subtotal } = quarterCumulatve;
            subtotal.state.dollars += state;
            subtotal.state.percent += statePct;
            subtotal.contractors.dollars += contractors;
            subtotal.contractors.percent += contractorsPct;
            subtotal.combined.dollars += combined;

            return {
              ...quarterCumulatve,
              [quarter]: {
                state: { dollars: state, percent: statePct },
                contractors: { dollars: contractors, percent: contractorsPct },
                combined: { dollars: combined, percent: 0 }
              },
              subtotal
            };
          },
          {
            subtotal: {
              state: { dollars: 0, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              combined: { dollars: 0, percent: 0 }
            }
          }
        )
      }),
      {}
    );
    newState.activities[activity.id].quarterlyFFP.total = total;
  });

  getTotalsForFundingSource(newState, 'hie');
  getTotalsForFundingSource(newState, 'hit');
  getTotalsForFundingSource(newState, 'mmis');

  combineHitAndHie(newState);
  computeMmisByFFP(newState, activityEntries);

  newState.federalShareByFFYQuarter = {
    hitAndHie: getFederalShareByFFYQuarter(
      newState.quarterly.hitAndHie,
      newState.hitAndHie
    ),
    mmis: getFederalShareByFFYQuarter(newState.quarterly.mmis, newState.mmis)
  };

  return newState;
};

const reducer = (state = initialState([]), action) => {
  switch (action.type) {
    case UPDATE_BUDGET:
      return buildBudget(action.state);
    case UPDATE_BUDGET_QUARTERLY_SHARE:
      return u({ quarterly: { ...action.updates } }, state);
    default:
      return state;
  }
};

export { expenseTypeNames, initialState };
export default reducer;
