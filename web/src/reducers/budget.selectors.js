import moment from 'moment';
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
    const data = Object.entries(byKey).map(
      ([key, { name, plannedEndDate, plannedStartDate, summary }]) => {
        const activityCosts = budget.activities[key].costsByFFY;

        let dateRange = 'Dates not set';
        if (plannedEndDate && plannedStartDate) {
          dateRange = `${moment(plannedStartDate, 'YYYY-MM-DD').format(
            'M/D/YYYY'
          )} - ${moment(plannedEndDate, 'YYYY-MM-DD').format('M/D/YYYY')}`;
        }

        return {
          key,
          dateRange,
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
