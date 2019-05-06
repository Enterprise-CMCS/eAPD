import { createSelector } from 'reselect';
import { selectActivitiesByKey } from './activities.selectors';
import { ACTIVITY_FUNDING_SOURCES } from '../util';

const selectBudget = ({ budget }) => budget;

export const selectBudgetActivitiesByFundingSource = createSelector(
  [selectBudget],
  budget => {
    const activities = ACTIVITY_FUNDING_SOURCES.reduce(
      (obj, source) => ({
        ...obj,
        [source.toLowerCase()]: budget.activityTotals.filter(
          a => a.fundingSource === source
        )
      }),
      {}
    );

    return activities;
  }
);

export const selectBudgetExecutiveSummary = createSelector(
  [selectActivitiesByKey, selectBudget],
  (byKey, budget) => {
    const data = Object.entries(byKey).map(([key, { name, summary }]) => {
      const activityCosts = budget.activities[key].costsByFFY;

      return {
        key,
        name,
        summary,
        combined: activityCosts.total.total,
        federal: activityCosts.total.federal,
        medicaid: activityCosts.total.medicaidShare
      };
    });

    return data;
  }
);

export const selectBudgetGrandTotal = createSelector(
  [selectBudget],
  ({
    combined: {
      total: { federal, medicaid, total }
    }
  }) => ({
    combined: total,
    federal,
    medicaid
  })
);
