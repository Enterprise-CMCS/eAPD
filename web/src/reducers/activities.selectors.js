import { createSelector } from 'reselect';
import { selectApdData, selectApdYears } from './apd.selectors';
import { stateDateRangeToDisplay, stateDateToDisplay } from '../util';

export const selectActivityByIndex = (
  {
    apd: {
      data: { activities }
    }
  },
  { activityIndex }
) => {
  if (+activityIndex >= 0 && +activityIndex < activities.length) {
    return activities[activityIndex];
  }
  return null;
};

export const selectAllActivities = ({
  apd: {
    data: { activities }
  }
}) => activities;

const selectBudgetForActivity = ({ budget }, { aKey }) =>
  budget.activities[aKey];

export const makeSelectCostAllocateFFP = () =>
  createSelector(
    [selectActivityByIndex, selectBudgetForActivity],
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
  createSelector([selectApdData, selectBudgetForActivity], (apd, budget) => ({
    quarterlyFFP: budget ? budget.quarterlyFFP : null,
    years: apd.years
  }));

export const selectActivityCostSummary = createSelector(
  selectApdYears,
  selectActivityByIndex,
  (
    {
      apd: {
        data: { activities }
      },
      budget
    },
    { activityIndex }
  ) => budget.activities[activities[activityIndex].key],
  (
    {
      apd: {
        data: { keyPersonnel, years }
      }
    },
    { activityIndex }
  ) =>
    years.reduce(
      (o, ffy) => ({
        ...o,
        [ffy]:
          activityIndex === 0
            ? keyPersonnel.map(kp => ({
                description: `${kp.name} (APD Key Personnel)`,
                totalCost: kp.hasCosts ? kp.costs[ffy] : 0,
                unitCost: null,
                units: `${kp.percentTime}% time`
              }))
            : []
      }),
      []
    ),
  (years, activity, budget, keyPersonnel) => {
    const summary = years.reduce(
      (o, year) => ({
        ...o,
        [year]: {
          contractorResources: activity.contractorResources.map(c => ({
            description: c.name,
            totalCost: c.years[year],
            unitCost: c.hourly.useHourly ? c.hourly.data[year].rate : null,
            units: c.hourly.useHourly
              ? `${c.hourly.data[year].hours} hours`
              : null
          })),
          federalPercent: 0,
          federalShare: budget.costsByFFY[year].federal,
          keyPersonnel: keyPersonnel[year],
          medicaidShare: budget.costsByFFY[year].medicaidShare,
          nonPersonnel: activity.expenses.map(e => ({
            description: e.category,
            totalCost: e.years[year],
            unitCost: null,
            units: null
          })),
          otherFunding: activity.costAllocation[year].other,
          statePercent: 0,
          statePersonnel: activity.statePersonnel.map(p => ({
            description: p.title,
            totalCost: p.years[year].amt * p.years[year].perc,
            unitCost: p.years[year].amt,
            units: `${p.years[year].perc} FTE`
          })),
          stateShare: budget.costsByFFY[year].state,
          totalCost: budget.costsByFFY[year].total
        }
      }),
      {}
    );

    return summary;
  }
);

export const selectActivitySchedule = createSelector(
  [selectAllActivities],
  apdActivities => {
    const activities = [];

    apdActivities.forEach(
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

export const selectActivityNonPersonnelCosts = (state, activityIndex) =>
  selectActivityByIndex(state, { activityIndex }).expenses;

export const selectActivityStatePersonnel = (state, { activityIndex }) =>
  selectActivityByIndex(state, { activityIndex }).statePersonnel;

export const selectActivitiesSidebar = createSelector(
  [selectAllActivities],
  activities =>
    activities.map(({ key, name }) => ({
      key,
      anchor: `activity-${key}`,
      name
    }))
);

export const selectContractorsByActivityIndex = (state, { activityIndex }) => {
  const activity = selectActivityByIndex(state, { activityIndex });
  if (activity) {
    return activity.contractorResources;
  }
  return null;
};

export const selectOKRsByActivityIndex = (state, { activityIndex }) => {
  const activity = selectActivityByIndex(state, { activityIndex });
  if (activity) {
    return activity.objectives;
  }
  return null;
};

export const selectGoalsByActivityIndex = (state, { activityIndex }) => {
  const activity = selectActivityByIndex(state, { activityIndex });
  if (activity) {
    return activity.goals;
  }
  return null;
};
