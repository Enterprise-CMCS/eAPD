import { titleCase } from 'title-case';
import { t } from '../../i18n';
import { APD_TYPE } from '@cms-eapd/common';

const baseLinks = apdId => [
  {
    label: titleCase(t('apd.title')),
    url: `/apd/${apdId}/apd-overview`
  },
  {
    label: titleCase(t('apd.stateProfile.title')),
    items: [
      {
        label: titleCase(t('apd.stateProfile.title')),
        url: `/apd/${apdId}/state-profile`
      },
      {
        label: titleCase(t('apd.stateProfile.directorAndAddress.title')),
        url: `/apd/${apdId}/state-profile#apd-state-profile-office`
      },
      {
        label: titleCase(t('apd.stateProfile.keyPersonnel.title')),
        url: `/apd/${apdId}/state-profile#apd-state-profile-key-personnel`
      }
    ]
  },
  {
    label: titleCase(t('previousActivities.title')),
    items: [
      {
        label: titleCase(t('previousActivities.title')),
        url: `/apd/${apdId}/previous-activities`
      },
      {
        label: titleCase(t('previousActivities.outline.title')),
        url: `/apd/${apdId}/previous-activities#prev-activities-outline`
      },
      {
        label: titleCase(t('previousActivities.actualExpenses.title')),
        url: `/apd/${apdId}/previous-activities#prev-activities-table`
      }
    ]
  },
  {
    label: titleCase(t('activities.title')),
    items: [
      {
        label: titleCase(t('activities.list.title')),
        url: `/apd/${apdId}/activities`
      }
    ]
  },
  {
    label: titleCase(t('scheduleSummary.title')),
    url: `/apd/${apdId}/schedule-summary`
  },
  {
    label: titleCase(t('assurancesAndCompliance.title')),
    url: `/apd/${apdId}/assurances-and-compliance`
  },
  {
    label: titleCase(t('executiveSummary.title')),
    items: [
      {
        label: titleCase(t('executiveSummary.title')),
        url: `/apd/${apdId}/executive-summary`
      },
      {
        label: titleCase(t('executiveSummary.overviewSummary.title')),
        url: `/apd/${apdId}/executive-summary#executive-overview-summary`
      },
      {
        label: titleCase(t('executiveSummary.activitiesSummary.title')),
        url: `/apd/${apdId}/executive-summary#executive-activities-summary`
      },
      {
        label: titleCase(t('executiveSummary.budgetTable.title')),
        url: `/apd/${apdId}/executive-summary#executive-summary-budget-table`
      }
    ]
  },
  {
    label: titleCase(t('exportAndSubmit.title')),
    url: `/apd/${apdId}/export`
  }
];

const staticItems = (apdId, apdType) => {
  if (apdId) {
    switch (apdType) {
      case APD_TYPE.HITECH:
        return [
          ...baseLinks(apdType).slice(0, 5),
          {
            label: titleCase(t('proposedBudget.title')),
            items: [
              {
                label: titleCase(t('proposedBudget.title')),
                url: `/apd/${apdId}/proposed-budget`
              },
              {
                label: titleCase(
                  t('proposedBudget.combinedActivityCosts.title')
                ),
                url: `/apd/${apdId}/proposed-budget#combined-activity-costs-table`
              },
              {
                label: titleCase(t('proposedBudget.summaryBudget.title')),
                url: `/apd/${apdId}/proposed-budget#budget-summary-table`
              },
              {
                label: titleCase(t('proposedBudget.quarterlyBudget.title')),
                url: `/apd/${apdId}/proposed-budget#budget-federal-by-quarter`
              },
              {
                label: titleCase(
                  t('proposedBudget.paymentsByFFYQuarter.title')
                ),
                url: `/apd/${apdId}/proposed-budget#budget-incentive-by-quarter`
              }
            ]
          },
          ...baseLinks(apdType).slice(-3)
        ];
      case APD_TYPE.MMIS:
        return [
          {
            label: titleCase(t('apd.title')),
            url: `/apd/${apdId}/apd-overview`
          },
          {
            label: titleCase(t('statePrioritiesAndScope.title')),
            url: `/apd/${apdId}/state-priorities-and-scope`
          },
          {
            label: titleCase(t('apd.stateProfile.title')),
            items: [
              {
                label: titleCase(t('apd.stateProfile.title')),
                url: `/apd/${apdId}/state-profile`
              },
              {
                label: titleCase(
                  t('apd.stateProfile.directorAndAddress.title')
                ),
                url: `/apd/${apdId}/state-profile#apd-state-profile-office`
              },
              {
                label: titleCase(t('apd.stateProfile.keyPersonnel.title')),
                url: `/apd/${apdId}/state-profile#apd-state-profile-key-personnel`
              }
            ]
          },
          {
            label: titleCase(t('previousActivities.title')),
            items: [
              {
                label: titleCase(t('previousActivities.title')),
                url: `/apd/${apdId}/previous-activities`
              },
              {
                label: titleCase(t('previousActivities.outline.title')),
                url: `/apd/${apdId}/previous-activities#prev-activities-outline`
              },
              {
                label: titleCase(t('previousActivities.actualExpenses.title')),
                url: `/apd/${apdId}/previous-activities#prev-activities-table`
              }
            ]
          },
          {
            label: titleCase(t('activities.title')),
            items: [
              {
                label: titleCase(t('activities.list.title')),
                url: `/apd/${apdId}/activities`
              }
            ]
          },
          {
            label: titleCase(t('scheduleSummary.title')),
            url: `/apd/${apdId}/schedule-summary`
          },
          {
            label: titleCase(t('proposedBudget.title')),
            items: [
              {
                label: titleCase(t('proposedBudget.title')),
                url: `/apd/${apdId}/proposed-budget`
              },
              {
                label: titleCase(
                  t('proposedBudget.combinedActivityCosts.title')
                ),
                url: `/apd/${apdId}/proposed-budget#combined-activity-costs-table`
              },
              {
                label: titleCase(t('proposedBudget.summaryBudget.title')),
                url: `/apd/${apdId}/proposed-budget#budget-summary-table`
              }
            ]
          },
          {
            label: titleCase(t('securityPlanning.title')),
            url: `/apd/${apdId}/security-planning`
          },
          {
            label: titleCase(t('assurancesAndCompliance.title')),
            url: `/apd/${apdId}/assurances-and-compliance`
          },
          {
            label: titleCase(t('executiveSummary.title')),
            items: [
              {
                label: titleCase(t('executiveSummary.title')),
                url: `/apd/${apdId}/executive-summary`
              },
              {
                label: titleCase(t('executiveSummary.overviewSummary.title')),
                url: `/apd/${apdId}/executive-summary#executive-overview-summary`
              },
              {
                label: titleCase(t('executiveSummary.budgetTable.title')),
                url: `/apd/${apdId}/executive-summary#executive-summary-budget-table`
              }
            ]
          },
          {
            label: titleCase(t('exportAndSubmit.title')),
            url: `/apd/${apdId}/export`
          }
        ];
      default:
        return [];
    }
  }
  return [];
};

const buildActivitySection = (apdId, apdType, activityId) => {
  if (apdType === 'HITECH') {
    return [
      {
        label: 'Activity Overview',
        url: `/apd/${apdId}/activity/${activityId}/overview`
      },
      {
        label: 'Activity Schedule and Milestones',
        url: `/apd/${apdId}/activity/${activityId}/schedule-and-milestones`
      },
      {
        label: 'Outcomes and Metrics',
        url: `/apd/${apdId}/activity/${activityId}/oms`
      },
      {
        label: 'State Staff and Expenses',
        url: `/apd/${apdId}/activity/${activityId}/state-costs`
      },
      {
        label: 'Private Contractor Costs',
        url: `/apd/${apdId}/activity/${activityId}/contractor-costs`
      },
      {
        label: 'Cost Allocation and Other Funding',
        url: `/apd/${apdId}/activity/${activityId}/cost-allocation`
      },
      {
        label: 'Budget and FFP',
        url: `/apd/${apdId}/activity/${activityId}/ffp`
      }
    ];
  }
  if (apdType === 'MMIS') {
    return [
      {
        label: 'Activity Overview',
        url: `/apd/${apdId}/activity/${activityId}/overview`
      },
      {
        label: 'Analysis of Alternatives and Risks',
        url: `/apd/${apdId}/activity/${activityId}/alternatives-and-risks`
      },
      {
        label: 'Activity Schedule and Milestones',
        url: `/apd/${apdId}/activity/${activityId}/schedule-and-milestones`
      },
      {
        label: 'Conditions for Enhanced Funding',
        url: `/apd/${apdId}/activity/${activityId}/conditions`
      },
      {
        label: 'Outcomes and Metrics',
        url: `/apd/${apdId}/activity/${activityId}/oms`
      },
      {
        label: 'State Staff and Expenses',
        url: `/apd/${apdId}/activity/${activityId}/state-costs`
      },
      {
        label: 'Private Contractor Costs',
        url: `/apd/${apdId}/activity/${activityId}/contractor-costs`
      },
      {
        label: 'Cost Allocation and Other Funding',
        url: `/apd/${apdId}/activity/${activityId}/cost-allocation`
      },
      {
        label: 'Budget and FFP',
        url: `/apd/${apdId}/activity/${activityId}/ffp`
      }
    ];
  }
};

const copy = data => JSON.parse(JSON.stringify(data));

const setDefaults = item => {
  item.selected = false;
  if (item.items && item.items.length) {
    item.defaultCollapsed = true;
    item.items.forEach(i => setDefaults(i));
  }
};

const setSelected = (items, value, parents = []) => {
  items.forEach(item => {
    if (item.url === value || item.value === value) {
      item.selected = true;
      if (parents.length) {
        parents.forEach(parent => {
          parent.defaultCollapsed = false;
          parent.selected = true;
        });
      }
    }
    if (item.items && item.items.length) {
      setSelected(item.items, value, [...parents, item]);
    }
  });
};

const getItems = ({
  apdId,
  apdType,
  activities = [],
  items = [],
  url = ''
} = {}) => {
  // eslint-disable-next-line no-param-reassign
  items = copy(items.length > 0 ? items : staticItems(apdId, apdType)); // copy items state so we don't modify original state
  if (activities.length && items.length) {
    const item = items.find(i => i.label === 'Activities');
    item.items = [
      item.items[0],
      ...activities.map((activity, i) => ({
        label: t(`sidebar.titles.activity-${activity.name ? 'set' : 'unset'}`, {
          number: i + 1,
          name: activity.name
        }),
        items: buildActivitySection(apdId, apdType, i)
      }))
    ];
  }
  items.forEach(item => setDefaults(item)); // collapse all & unselect all, by default
  setSelected(items, url);
  return items;
};

export default staticItems;

export { getItems };
