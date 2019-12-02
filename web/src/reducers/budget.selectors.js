import { createSelector } from 'reselect';
import { selectAllActivities } from './activities.selectors';
import { ACTIVITY_FUNDING_SOURCES, stateDateRangeToDisplay } from '../util';

export const selectBudget = ({ budget }) => budget;

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
  [selectAllActivities, selectBudget],
  (activities, budget) => {
    const data = activities.map(
      ({ key, name, plannedEndDate, plannedStartDate, summary }) => {
        const activityCosts = budget.activities[key].costsByFFY;

        return {
          key,
          dateRange: stateDateRangeToDisplay(plannedStartDate, plannedEndDate),
          name,
          summary,
          combined: activityCosts.total.total,
          federal: activityCosts.total.federal,
          medicaid: activityCosts.total.medicaidShare
        };
      }
    );

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
