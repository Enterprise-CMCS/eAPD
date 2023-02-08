import { createSelector } from 'reselect';
import { selectApdData, selectApdYears } from './apd.selectors';
import { stateDateRangeToDisplay, stateDateToDisplay } from '../../util';

export const selectActivityCount = state => state.apd.data.activities.length;

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

export const selectActivityKeyByIndex = createSelector(
  [selectActivityByIndex],
  ({ key }) => key
);

export const selectAllActivities = ({
  apd: {
    data: { activities }
  }
}) => activities;

const selectBudgetForActivity = ({ budget }, { activityId }) =>
  budget.activities[activityId];

export const selectCostAllocationForActivityByIndex = createSelector(
  selectActivityByIndex,
  ({ costAllocation }) => costAllocation
);

export const selectKeyStatePersonnelCostSummary = createSelector(
  ({
    apd: {
      data: {
        keyStatePersonnel: { keyPersonnel },
        years
      }
    }
  }) =>
    years.reduce(
      (keyStatePersonnel, ffy) => ({
        ...keyStatePersonnel,
        [ffy]: keyPersonnel.map(kp => ({
          key: kp.key,
          description: `${kp.position}: ${kp.name || 'Not specified'} ${
            kp.isPrimary ? '(APD Point of Contact)' : ''
          }`,
          totalCost: kp.hasCosts
            ? kp.costs[ffy] * kp.fte[ffy] * (kp.medicaidShare[ffy] / 100)
            : 0,
          unitCost: kp.hasCosts ? kp.costs[ffy] : null,
          units: kp.hasCosts ? `${kp.fte[ffy]} FTE` : null,
          medicaidShare: kp.hasCosts ? kp.medicaidShare[ffy] : null
        }))
      }),
      {}
    ),
  keyPersonnel => {
    return {
      keyStatePersonnel: keyPersonnel,
      keyStatePersonnelTotal: Object.keys(keyPersonnel).reduce(
        (o, year) => ({
          ...o,
          [year]: keyPersonnel[year].reduce((sum, kp) => {
            return sum + kp.totalCost; // Todo: find out if we want to calculate totalCost with medicaid share
          }, 0)
        }),
        {}
      )
    };
  }
);

export const selectActivityCostSummary = createSelector(
  selectApdYears,
  selectActivityByIndex,
  (
    // This intermediate selector gets the budget for an activity by index
    // rather than by key.
    {
      apd: {
        data: { activities }
      },
      budget
    },
    { activityIndex }
  ) => budget.activities[activities[activityIndex].activityId],
  (
    // This intermediate selector maps key personnel into the same data
    // structure as activity state personnel IF AND ONLY IF we are working
    // on the first activity. Key personnel get rolled into the first activity,
    // Program Administration. For other activities, just returns empty arrays.
    {
      apd: {
        data: {
          keyStatePersonnel: { keyPersonnel },
          years,
          apdType
        }
      }
    },
    { activityIndex }
  ) =>
    years.reduce(
      (activityKeyPersonnel, ffy) => ({
        ...activityKeyPersonnel,
        [ffy]:
          activityIndex === 0 && apdType == 'HITECH'
            ? keyPersonnel.map(kp => ({
                key: kp.key,
                description: `${
                  kp.name || 'Not specified'
                } (APD Key Personnel)`,
                totalCost: kp.hasCosts ? kp.costs[ffy] * kp.fte[ffy] : 0,
                unitCost: kp.hasCosts ? kp.costs[ffy] : null,
                units: kp.hasCosts ? `${kp.fte[ffy]} FTE` : null
              }))
            : []
      }),
      {}
    ),
  (years, activity, budget, keyPersonnel) => {
    const total = {
      federalShare: 0,
      medicaidShare: 0,
      otherFunding: 0,
      stateShare: 0,
      totalCost: 0
    };

    const summary = years.reduce(
      (o, year) => ({
        ...o,
        [year]: {
          contractorResources: activity.contractorResources.map(c => ({
            key: c.key,
            description:
              c.name || 'Private Contractor or Vendor Name not specified',
            totalCost: c.years[year],
            unitCost:
              c.useHourly === true || c.useHourly === 'yes'
                ? c.hourly[year].rate
                : null,
            units:
              c.useHourly === true || c.useHourly === 'yes'
                ? `${c.hourly[year].hours} hours`
                : null
          })),
          contractorResourcesTotal: activity.contractorResources.reduce(
            (sum, contractor) => sum + contractor.years[year],
            0
          ),
          federalPercent: 0,
          federalShare: budget?.costsByFFY?.[year]?.federal,
          keyPersonnel: keyPersonnel[year],
          medicaidShare: budget?.costsByFFY?.[year]?.medicaid,
          nonPersonnel: activity.expenses.map(e => ({
            key: e.key,
            description: e.category,
            totalCost: e.years[year],
            unitCost: null,
            units: null
          })),
          nonPersonnelTotal: activity.expenses.reduce(
            (sum, expense) => sum + expense.years[year],
            0
          ),
          otherFunding: activity.costAllocation[year].other,
          statePercent: 0,
          statePersonnel: activity.statePersonnel.map(p => ({
            key: p.key,
            description: p.title || 'Personnel title not specified',
            totalCost: p.years[year].amt * p.years[year].perc,
            unitCost: p.years[year].amt,
            units: p.years[year].perc ? `${p.years[year].perc} FTE` : null
          })),
          statePersonnelTotal:
            activity.statePersonnel.reduce(
              (sum, personnel) =>
                sum + personnel.years[year].amt * personnel.years[year].perc,
              0
            ) + keyPersonnel[year].reduce((sum, kp) => sum + kp.totalCost, 0),
          stateShare: budget?.costsByFFY?.[year]?.state,
          totalCost: budget?.costsByFFY?.[year]?.total
        }
      }),
      {}
    );

    Object.values(summary).forEach(
      ({
        federalShare,
        medicaidShare,
        otherFunding,
        stateShare,
        totalCost
      }) => {
        total.federalShare += federalShare;
        total.medicaidShare += medicaidShare;
        total.otherFunding += otherFunding;
        total.stateShare += stateShare;
        total.totalCost += totalCost;
      }
    );
    return { years: summary, total };
  }
);

export const makeSelectCostAllocateFFPBudget = () =>
  createSelector(
    [selectApdData, selectBudgetForActivity],
    (apd, budget = {}) => {
      if (budget?.quarterlyFFP) {
        return {
          quarterlyFFP: {
            ...budget.quarterlyFFP.years,
            total: budget.quarterlyFFP.total
          },
          years: apd.years
        };
      }
      return {
        quarterlyFFP: null,
        years: apd.years
      };
    }
  );

export const selectActivitySchedule = createSelector(
  [selectAllActivities],
  apdActivities => {
    const activities = [];

    apdActivities.forEach(
      ({
        name,
        activitySchedule: { plannedStartDate, plannedEndDate } = {},
        milestones: milestonesUnsorted
      }) => {
        const milestones = [];
        activities.push({
          dateRange: stateDateRangeToDisplay(plannedStartDate, plannedEndDate),
          end: stateDateToDisplay(plannedEndDate),
          name,
          milestones,
          start: stateDateToDisplay(plannedStartDate)
        });

        milestonesUnsorted.forEach(({ milestone, endDate }) => {
          milestones.push({
            end: stateDateToDisplay(endDate),
            name: milestone,
            start: stateDateToDisplay(plannedStartDate)
          });
        });

        milestones.sort(({ end: endA }, { end: endB }) => {
          const [monthA, dayA, yearA] = endA.split('/');
          const [monthB, dayB, yearB] = endB.split('/');

          if (+yearA > +yearB) {
            return 1;
          }
          if (+yearA < +yearB) {
            return -1;
          }

          if (+monthA > +monthB) {
            return 1;
          }
          if (+monthA < +monthB) {
            return -1;
          }

          if (+dayA > +dayB) {
            return 1;
          }
          if (+dayA < +dayB) {
            return -1;
          }

          return 0;
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

export const selectOMsByActivityIndex = (state, { activityIndex }) => {
  const activity = selectActivityByIndex(state, { activityIndex });
  if (activity) {
    return activity.outcomes;
  }
  return null;
};

export const selectActivityTotalForBudgetByActivityIndex = (
  { budget },
  { activityIndex }
) => budget.activityTotals[activityIndex] || null;

export const getAllFundingSources = state => {
  return state.apd.data.activities.map(activity => {
    return activity.fundingSource;
  });
};
