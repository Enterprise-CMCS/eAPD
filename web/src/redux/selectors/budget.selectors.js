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
      ({ key, name, plannedEndDate, plannedStartDate, summary }) => {
        const { total, years } = budget.activities[key].costsByFFY;

        return {
          key,
          dateRange: stateDateRangeToDisplay(plannedStartDate, plannedEndDate),
          name,
          summary,
          combined: total.total,
          federal: total.federal,
          medicaid: total.medicaid,
          ffys: years
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
      years
    }
  }) => ({
    combined: total,
    federal,
    medicaid,
    ffys: { ...years }
  })
);
