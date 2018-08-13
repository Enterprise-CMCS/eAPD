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

const initTotalsByExpenseType = years =>
  expenseTypeNames.reduce(
    (obj, name) => ({ ...obj, [name]: arrToObj(years) }),
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

const activities = src => Object.values(src.activities.byKey);

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
            data: { ...collapsed, total },
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

// state personnel, contractor, other expenses totals by year and activity
const computeTotalsByActivity = (bigState, activityEntries) => {
  const { activityTotals, years } = bigState;
  const yearsWithTotal = [...years, 'total'];

  activityEntries.forEach(activity => {
    const { id, name, fundingSource } = activity;
    const totaller = getTotalsForActivity(activity);

    const data = initTotalsByExpenseType(yearsWithTotal);
    const grandTotals = data.combined;

    budgetInputs.forEach(({ type, value, target }) => {
      const byType = totaller.collapse(type, value).totals().data;

      Object.keys(byType).forEach(year => {
        data[target][year] += byType[year].total;
        grandTotals[year] += byType[year].total;
      });
    });

    const entry = { id, name, fundingSource, data };
    activityTotals.push(entry);
  });
};

const buildBudget = wholeState => {
  const newState = initialState(wholeState.apd.data.years);
  const activityEntries = activities(wholeState);

  activityEntries.forEach(activity => {
    newState.activities[activity.key] = {};
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
    // ActivityQuarterlyBudgetSummary table
    const ffpPercents = activity.quarterlyFFP;

    // The grand total of the federal share of this activity's
    // state and contractor expenses, across all quarters
    // and fiscal years
    const total = { state: 0, contractors: 0, combined: 0 };

    newState.activities[activity.key].quarterlyFFP = Object.keys(
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
    newState.activities[activity.key].quarterlyFFP.total = total;
  });

  getTotalsForFundingSource(newState, 'hie');
  getTotalsForFundingSource(newState, 'hit');
  getTotalsForFundingSource(newState, 'mmis');

  combineHitAndHie(newState);
  computeMmisByFFP(newState, activityEntries);
  computeTotalsByActivity(newState, activityEntries);

  activityEntries.forEach(activity => {
    const target =
      newState.federalShareByFFYQuarter[
        activity.fundingSource === 'MMIS' ? 'mmis' : 'hitAndHie'
      ];

    const { quarterlyFFP } = newState.activities[activity.key];

    Object.entries(quarterlyFFP).forEach(([yearKey, yearValue]) => {
      Object.entries(yearValue).forEach(([quarterKey, quarterValue]) => {
        Object.entries(quarterValue).forEach(([key, value]) => {
          target[yearKey][quarterKey][key] += value.dollars;
          if (quarterKey !== 'subtotal') {
            target.total[key] += value.dollars;
          }
        });
      });
    });
  });

  return newState;
};

const spread = (number, acrossPercents) => {
  const out = [];
  let remainder = 0;

  acrossPercents.forEach(percent => {
    const value = number * percent + remainder;
    remainder = value - Math.floor(value);

    if (remainder > 0.5) {
      // if the cumulative remainder to this point is over half, round up
      out.push(Math.ceil(value));
      // don't throwaway leftover remainders, or we might accidentally
      // roll up a few extra times
      remainder -= 1;
    } else {
      // otherwise round down
      out.push(Math.floor(value));
    }
  });

  return out;
};

const newBuildBudget = bigState => {
  // Get a shell of our new state object.  This essentially guarantees
  // that all of the properties and stuff will exist, so we don't have
  // to have a bunch of code checking for it.
  const { years } = bigState.apd.data;
  const newState = initialState(years);

  // Since all of our expenses are tied up in activities, we'll start
  // by looking at all of them and doing Magic Math™. (It's not magic.)
  Object.values(bigState.activities.byKey).forEach(activity => {
    // We need to know the funding source so we know where to apply
    // this data in the big rollup budget.
    const fundingSource = activity.fundingSource.toLowerCase();

    // And of course we need to know how the costs are allocated between
    // the state and federal shares.
    const allocation = activity.costAllocation;

    const totalsByYear = arrToObj(years, () => ({
      federal: 0,
      other: 0,
      state: 0,
      total: 0
    }));

    const n = x => +(x || 0);

    // Sum up the total expense by expense type, per fiscal year
    activity.contractorResources.forEach(contractor =>
      Object.entries(contractor.years).forEach(([year, entry]) => {
        const cost = n(entry);
        newState[fundingSource].contractors[year].total += cost;
        totalsByYear[year].total += cost;
      })
    );

    activity.expenses.forEach(expense =>
      Object.entries(expense.years).forEach(([year, entry]) => {
        const cost = n(entry);
        newState[fundingSource].expenses[year].total += cost;
        totalsByYear[year].total += cost;
      })
    );

    activity.statePersonnel.forEach(person =>
      Object.entries(person.years).forEach(([year, entry]) => {
        const cost = n(entry.amt) * n(entry.perc) / 100;
        newState[fundingSource].statePersonnel[year].total += cost;
        totalsByYear[year].total += cost;
      })
    );

    // Compute state and federal shares per FY
    Object.keys(totalsByYear).forEach(year => {
      const otherFunding = n(allocation[year].other);

      const percents = [
        allocation[year].ffp.federal / 100,
        allocation[year].ffp.state / 100
      ];

      const [tfed, tstate] = spread(
        totalsByYear[year].total - otherFunding,
        percents
      );
      totalsByYear[year].federal = tfed;
      totalsByYear[year].state = tstate;

      newState[fundingSource].combined[year].total = totalsByYear[year].total;
      newState[fundingSource].combined[year].federal = tfed;
      newState[fundingSource].combined[year].state = tstate;

      const percentFromContractors =
        newState[fundingSource].contractors[year].total /
        totalsByYear[year].total;
      const percentFromExpenses =
        newState[fundingSource].expenses[year].total / totalsByYear[year].total;
      const percentFromPersonnel =
        newState[fundingSource].statePersonnel[year].total /
        totalsByYear[year].total;

      const [cfed, efed, pfed] = spread(tfed, [
        percentFromContractors,
        percentFromExpenses,
        percentFromPersonnel
      ]);

      const [cstate, estate, pstate] = spread(tstate, [
        percentFromContractors,
        percentFromExpenses,
        percentFromPersonnel
      ]);

      newState[fundingSource].contractors[year].federal = cfed;
      newState[fundingSource].contractors[year].state = cstate;

      newState[fundingSource].expenses[year].federal = efed;
      newState[fundingSource].expenses[year].state = estate;

      newState[fundingSource].statePersonnel[year].federal = pfed;
      newState[fundingSource].statePersonnel[year].state = pstate;
    });

    let fundingSourceTotal = 0;
    Object.keys(newState[fundingSource].combined).forEach(year => {
      fundingSourceTotal +=
        newState[fundingSource].combined.total - n(allocation[year].other);
    });

    console.log(totalsByYear);
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
