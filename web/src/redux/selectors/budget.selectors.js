import { createSelector } from 'reselect';
import { selectAllActivities } from './activities.selectors';
import { ACTIVITY_FUNDING_SOURCES, stateDateRangeToDisplay } from '../../util';

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
      ({ activityId, name, plannedEndDate, plannedStartDate, summary }) => {
        const { total, ...ffyCosts } = budget.activities[activityId].costsByFFY;

        return {
          activityId,
          dateRange: stateDateRangeToDisplay(plannedStartDate, plannedEndDate),
          name,
          summary,
          combined: total.total,
          federal: total.federal,
          medicaid: total.medicaid,
          ffys: { ...ffyCosts }
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
      total: { federal, medicaid, total },
      ...ffyCosts
    }
  }) => ({
    combined: total,
    federal,
    medicaid,
    ffys: { ...ffyCosts }
  })
);
