import { t } from '../i18n';

const staticItems = [
  {
    label: t('apd.title'),
    url: '/apd/apd-overview'
  },
  {
    label: t('activities.title'),
    items: []
  },
  {
    label: t('scheduleSummary.title'),
    url: '/apd/schedule-summary'
  },
  {
    label: t('proposedBudget.title'),
    items: [
      {
        label: t('proposedBudget.title'),
        url: '/apd/proposed-budget'
      },
      {
        label: t('proposedBudget.summaryBudgetByActivity.title'),
        url: '/apd/proposed-budget#summary-schedule-by-activity-table'
      },
      {
        label: t('proposedBudget.summaryBudget.title'),
        url: '/apd/proposed-budget#budget-summary-table'
      },
      {
        label: t('proposedBudget.quarterlyBudget.title'),
        url: '/apd/proposed-budget#budget-federal-by-quarter'
      },
      {
        label: t('proposedBudget.paymentsByFFYQuarter.title'),
        url: '/apd/proposed-budget#budget-incentive-by-quarter'
      }
    ]
  },
  {
    label: t('assurancesAndCompliance.title'),
    url: '/apd/assurances-and-compliance'
  },
  {
    label: t('executiveSummary.title'),
    items: [
      {
        label: t('executiveSummary.title'),
        url: '/apd/executive-summary'
      },
      {
        label: t('executiveSummary.summary.title'),
        url: '/apd/executive-summary#executive-summary-summary'
      },
      {
        label: t('executiveSummary.budgetTable.title'),
        url: '/apd/executive-summary#executive-summary-budget-table'
      }
    ]
  },
  {
    label: t('exportAndSubmit.title'),
    url: '/apd/export'
  }
];

const buildActivitySection = i => [
  {
    label: 'Activity introduction',
    url: `/apd/activity/${i}/overview`
  },
  {
    label: 'Outcomes and milestones',
    url: `/apd/activity/${i}/oms`
  },
  {
    label: 'State staff and expenses',
    url: `/apd/activity/${i}/state-costs`
  },
  {
    label: 'Private contractor costs',
    url: `/apd/activity/${i}/contractor-costs`
  },
  {
    label: 'Cost allocation and other funding',
    url: `/apd/activity/${i}/cost-allocation`
  },
  {
    label: 'Budget and FFP',
    url: `/apd/activity/${i}/ffp`
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

const getItems = ({ activities = [], items = staticItems, url = '' } = {}) => {
  // eslint-disable-next-line no-param-reassign
  items = copy(items); // copy items state so we don't modify original state
  if (activities.length) {
    const item = items.find(i => i.label === 'Activities');
    item.items = [
      ...activities.map((activity, i) => ({
        label: t(`sidebar.titles.activity-${activity.name ? 'set' : 'unset'}`, {
          number: i + 1,
          name: activity.name
        }),
        items: buildActivitySection(i)
      })),
      // alternative design demo
      // {
      //   label: "Add activity",
      //   url: "/add/activity"
      // }
    ];
  }
  items.forEach(item => setDefaults(item)); // collapse all & unselect all, by default
  setSelected(items, url);
  return items;
};

export default staticItems;

export { getItems };
