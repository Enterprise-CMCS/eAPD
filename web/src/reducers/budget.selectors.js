import { createSelector } from 'reselect';
import { selectActivitiesByKey } from './activities.selectors';
import { selectApdData } from './apd.selectors';
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
  [selectApdData, selectActivitiesByKey, selectBudget],
  ({ years }, byKey, budget) => {
    const data = Object.entries(byKey).map(([key, { name, descShort }]) => {
      const activityCosts = budget.activities[key].costsByFFY;

      return {
        key,
        name,
        descShort,
        totals: years.reduce(
          (acc, year) => ({ ...acc, [year]: activityCosts[year].total }),
          {}
        ),
        combined: activityCosts.total.total
      };
    });

    data.push({
      key: 'all',
      name: 'Total Cost',
      descShort: null,
      totals: years.reduce(
        (acc, year) => ({ ...acc, [year]: budget.combined[year].total }),
        {}
      ),
      combined: budget.combined.total.total
    });

    return data;
  }
);
