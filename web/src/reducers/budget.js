import u from 'updeep';

import { UPDATE_BUDGET, UPDATE_BUDGET_QUARTERLY_SHARE } from '../actions/apd';

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

const expenseTypes = years =>
  expenseTypeNames.reduce(
    (o, name) => ({
      ...o,
      [name]: getFundingSourcesByYear(years)
    }),
    {}
  );

const quarterlyShare = years => ({
  ...years.reduce(
    (o, year) => ({
      ...o,
      [year]: { 1: 25, 2: 25, 3: 25, 4: 25 }
    }),
    {}
  )
});

const initialState = years => ({
  combined: getFundingSourcesByYear(years),
  hitAndHie: expenseTypes(years),
  hie: expenseTypes(years),
  hit: expenseTypes(years),
  mmis: expenseTypes(years),
  quarterly: quarterlyShare(years),
  years
});

const activities = src => Object.values(src.activities.byId);

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

const getTotalsForActivity = activity => {
  const fundingSource = activity.fundingSource.toLowerCase();
  const ffp = activity.costFFP;

  return {
    collapse: (type, value = v => +v) => {
      const collapsed = {};
      activity[type].forEach(expense => {
        Object.keys(expense.years).forEach(year => {
          if (!collapsed[year]) {
            collapsed[year] = { total: 0, federal: 0, state: 0 };
          }
          const v = value(expense.years[year]);
          addBudgetBlocks(collapsed[year], {
            total: v,
            federal: v * ffp[year].fed / 100,
            state: v * ffp[year].state / 100
          });
        });
      });

      return {
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

const buildBudget = wholeState => {
  const newState = initialState(wholeState.apd.data.years);

  activities(wholeState).forEach(activity => {
    const totaller = getTotalsForActivity(activity);
    totaller
      .collapse('statePersonnel', year => +year.amt * +year.perc / 100)
      .totals()
      .merge(newState);

    totaller
      .collapse('contractorResources')
      .totals()
      .merge(newState, 'contractors');

    totaller
      .collapse('expenses')
      .totals()
      .merge(newState);
  });

  getTotalsForFundingSource(newState, 'hie');
  getTotalsForFundingSource(newState, 'hit');
  getTotalsForFundingSource(newState, 'mmis');
  combineHitAndHie(newState);

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
