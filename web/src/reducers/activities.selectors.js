import { createSelector } from 'reselect';
import { selectApdData } from './apd.selectors';

export const selectActivityKeys = ({ activities: { allKeys } }) => allKeys;

export const selectActivitiesByKey = ({ activities: { byKey } }) => byKey;

export const selectActivityByKey = ({ activities: { byKey } }, { aKey }) =>
  byKey[aKey];

const selectBudgetForActivity = ({ budget }, { aKey }) =>
  budget.activities[aKey];

export const makeSelectCostAllocateFFP = () =>
  createSelector(
    [selectActivityByKey, selectBudgetForActivity],
    (activity, budget) => {
      const { costAllocation } = activity;
      const { costsByFFY } = budget;

      const byYearData = Object.entries(costsByFFY)
        .filter(([year]) => year !== 'total')
        .map(([year, costs]) => {
          const { ffp } = costAllocation[year];
          const ffpSelectVal = `${ffp.federal}-${ffp.state}`;

          return {
            year,
            total: costs.total,
            medicaidShare: costs.medicaidShare,
            ffpSelectVal,
            allocations: { federal: costs.federal, state: costs.state }
          };
        });

      return { byYearData, costAllocation };
    }
  );

export const makeSelectCostAllocateFFPBudget = () =>
  createSelector(
    [selectApdData, selectBudgetForActivity],
    (apd, budget) => ({
      quarterlyFFP: budget ? budget.quarterlyFFP : null,
      years: apd.years
    })
  );

export const selectActivitySchedule = createSelector(
  [selectActivitiesByKey],
  byKey => {
    const data = [];

    Object.values(byKey).forEach(activity => {
      activity.schedule.forEach(milestone => {
        data.push({
          ...milestone,
          activityName: activity.name,
          startDate: activity.plannedStartDate
        });
      });
    });

    return data;
  }
);

export const selectActivitiesSidebar = createSelector(
  [selectActivityKeys, selectActivitiesByKey],
  (allKeys, byKey) =>
    allKeys.map(key => ({
      key,
      anchor: `activity-${key}`,
      name: byKey[key].name
    }))
);
