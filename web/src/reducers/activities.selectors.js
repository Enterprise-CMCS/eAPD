import { createSelector } from 'reselect';
import { selectApdData } from './apd.selectors';
import { stateDateRangeToDisplay, stateDateToDisplay } from '../util';

export const selectActivityKeys = ({ activities: { allKeys } }) => allKeys;

export const selectActivitiesByKey = ({ activities: { byKey } }) => byKey;

export const selectActivityByKey = ({ activities: { byKey } }, { aKey }) =>
  byKey[aKey];

export const selectAllActivities = ({ activities: { byKey } }) =>
  Object.values(byKey);

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
    const activities = [];

    Object.values(byKey).forEach(
      ({ name, plannedEndDate, plannedStartDate, schedule }) => {
        const milestones = [];
        activities.push({
          dateRange: stateDateRangeToDisplay(plannedStartDate, plannedEndDate),
          end: stateDateToDisplay(plannedEndDate),
          name,
          milestones,
          start: stateDateToDisplay(plannedStartDate)
        });

        schedule.forEach(({ milestone, endDate }) => {
          milestones.push({
            end: stateDateToDisplay(endDate),
            name: milestone,
            start: stateDateToDisplay(plannedStartDate)
          });
        });

        milestones.sort(({ end: endA }, { end: endB }) => {
          if (endA === endB) {
            return 0;
          }
          return endA > endB ? 1 : -1;
        });
      }
    );

    return activities;
  }
);

export const selectActivityNonPersonnelCosts = (state, aKey) =>
  selectActivityByKey(state, { aKey }).expenses;

export const selectActivityStatePersonnel = (state, aKey) =>
  selectActivityByKey(state, { aKey }).statePersonnel;

export const selectActivitiesSidebar = createSelector(
  [selectActivityKeys, selectActivitiesByKey],
  (allKeys, byKey) =>
    allKeys.map(key => ({
      key,
      anchor: `activity-${key}`,
      name: byKey[key].name
    }))
);
