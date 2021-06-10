import { t } from '../i18n';

const staticItems = apdId => {
  if (apdId) {
    return [
      {
        label: t('apd.title'),
        url: `/apd/${apdId}/apd-overview`
      },
      {
        label: t('apd.stateProfile.title'),
        items: [
          {
            label: t('apd.stateProfile.title'),
            url: `/apd/${apdId}/state-profile`
          },
          {
            label: t('apd.stateProfile.directorAndAddress.title'),
            url: `/apd/${apdId}/state-profile#apd-state-profile-office`
          },
          {
            label: t('apd.stateProfile.keyPersonnel.title'),
            url: `/apd/${apdId}/state-profile#apd-state-profile-key-personnel`
          }
        ]
      },
      {
        label: t('previousActivities.title'),
        items: [
          {
            label: t('previousActivities.title'),
            url: `/apd/${apdId}/previous-activities`
          },
          {
            label: t('previousActivities.outline.title'),
            url: `/apd/${apdId}/previous-activities#prev-activities-outline`
          },
          {
            label: t('previousActivities.actualExpenses.title'),
            url: `/apd/${apdId}/previous-activities#prev-activities-table`
          }
        ]
      },
      {
        label: t('activities.title'),
        items: [
          {
            label: t('activities.list.title'),
            url: `/apd/${apdId}/activities`
          }
        ]
      },
      {
        label: t('scheduleSummary.title'),
        url: `/apd/${apdId}/schedule-summary`
      },
      {
        label: t('proposedBudget.title'),
        items: [
          {
            label: t('proposedBudget.title'),
            url: `/apd/${apdId}/proposed-budget`
          },
          {
            label: t('proposedBudget.summaryBudgetByActivity.title'),
            url: `/apd/${apdId}/proposed-budget#summary-schedule-by-activity-table`
          },
          {
            label: t('proposedBudget.summaryBudget.title'),
            url: `/apd/${apdId}/proposed-budget#budget-summary-table`
          },
          {
            label: t('proposedBudget.quarterlyBudget.title'),
            url: `/apd/${apdId}/proposed-budget#budget-federal-by-quarter`
          },
          {
            label: t('proposedBudget.paymentsByFFYQuarter.title'),
            url: `/apd/${apdId}/proposed-budget#budget-incentive-by-quarter`
          }
        ]
      },
      {
        label: t('assurancesAndCompliance.title'),
        url: `/apd/${apdId}/assurances-and-compliance`
      },
      {
        label: t('executiveSummary.title'),
        items: [
          {
            label: t('executiveSummary.title'),
            url: `/apd/${apdId}/executive-summary`
          },
          {
            label: t('executiveSummary.summary.title'),
            url: `/apd/${apdId}/executive-summary#executive-summary-summary`
          },
          {
            label: t('executiveSummary.budgetTable.title'),
            url: `/apd/${apdId}/executive-summary#executive-summary-budget-table`
          }
        ]
      },
      {
        label: t('exportAndSubmit.title'),
        url: `/apd/${apdId}/export`
      }
    ];
  }
  return [];
};

const buildActivitySection = (apdId, activityId) => [
  {
    label: 'Activity overview',
    url: `/apd/${apdId}/activity/${activityId}/overview`
  },
  {
    label: 'Outcomes and milestones',
    url: `/apd/${apdId}/activity/${activityId}/oms`
  },
  {
    label: 'State staff and expenses',
    url: `/apd/${apdId}/activity/${activityId}/state-costs`
  },
  {
    label: 'Private contractor costs',
    url: `/apd/${apdId}/activity/${activityId}/contractor-costs`
  },
  {
    label: 'Cost allocation and other funding',
    url: `/apd/${apdId}/activity/${activityId}/cost-allocation`
  },
  {
    label: 'Budget and FFP',
    url: `/apd/${apdId}/activity/${activityId}/ffp`
  }
];

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

const getItems = ({ apdId, activities = [], items = [], url = '' } = {}) => {
  // eslint-disable-next-line no-param-reassign
  items = copy(items.length > 0 ? items : staticItems(apdId)); // copy items state so we don't modify original state
  if (activities.length) {
    const item = items.find(i => i.label === 'Activities');
    item.items = [
      item.items[0],
      ...activities.map((activity, i) => ({
        label: t(`sidebar.titles.activity-${activity.name ? 'set' : 'unset'}`, {
          number: i + 1,
          name: activity.name
        }),
        items: buildActivitySection(apdId, i)
      }))
    ];
  }
  items.forEach(item => setDefaults(item)); // collapse all & unselect all, by default
  setSelected(items, url);
  return items;
};

export default staticItems;

export { getItems };
