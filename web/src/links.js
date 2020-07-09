import { t } from './i18n'

const links = [
  {
    id: 'apd-state-profile',
    label: t('apd.stateProfile.title'),
    items: [
      {
        id: 'apd-state-profile-overview',
        label: 'Overview',
        url: '/apd/state-profile'
      },
      {
        id: 'apd-state-profile-office',
        label: t('apd.stateProfile.directorAndAddress.title'),
        url: '/apd/state-profile#apd-state-profile-office'
      },
      {
        id: 'apd-state-profile-key-personnel',
        label: t('apd.stateProfile.keyPersonnel.title'),
        url: '/apd/state-profile#apd-state-profile-key-personnel'
      }
    ]
  },
  {
    id: 'apd-summary',
    label: t('apd.title'),
    url: '/apd/program-summary'
  },
  {
    id: 'previous-activities',
    label: t('previousActivities.title'),
    items: [
      {
        id: 'prev-activities-overview',
        label: 'Overview',
        url: '/apd/previous-activities'
      },
      {
        id: 'prev-activities-outline',
        label: t('previousActivities.outline.title'),
        url: '/apd/previous-activities#prev-activities-outline'
      },
      {
        id: 'prev-activities-table',
        label: t('previousActivities.actualExpenses.title'),
        url: '/apd/previous-activities#prev-activities-table'
      }
    ]
  },
  {
    id: 'activities',
    label: t('activities.title')
  },
  {
    id: 'schedule-summary',
    label: t('scheduleSummary.title'),
    url: '/apd/schedule-summary'
  },
  {
    id: 'proposed-budget',
    label: t('proposedBudget.title'),
    items: [
      {
        id: 'proposed-budget-overview',
        label: 'Overview',
        url: '/apd/proposed-budget'
      },
      {
        id: 'summary-schedule-by-activity-table',
        label: t('proposedBudget.summaryBudgetByActivity.title'),
        url: '/apd/proposed-budget#summary-schedule-by-activity-table'
      },
      {
        id: 'budget-summary-table',
        label: t('proposedBudget.summaryBudget.title'),
        url: '/apd/proposed-budget#budget-summary-table'
      },
      {
        id: 'budget-federal-by-quarter',
        label: t('proposedBudget.quarterlyBudget.title'),
        url: '/apd/proposed-budget#budget-federal-by-quarter'
      },
      {
        id: 'budget-incentive-by-quarter',
        label: t('proposedBudget.paymentsByFFYQuarter.title'),
        url: '/apd/proposed-budget#budget-incentive-by-quarter'
      }
    ]
  },
  {
    id: 'assurances-compliance',
    label: t('assurancesAndCompliance.title'),
    url: '/apd/assurances-and-compliance'
  },
  {
    id: 'executive-summary',
    label: t('executiveSummary.title'),
    items: [
      {
        id: 'executive-summary-overview',
        label: 'Overview',
        url: '/apd/executive-summary'
      },
      {
        id: 'executive-summary-summary',
        label: t('executiveSummary.summary.title'),
        url: '/apd/executive-summary#executive-summary-summary'
      },
      {
        id: 'executive-summary-budget-table',
        label: t('executiveSummary.budgetTable.title'),
        url: '/apd/executive-summary#executive-summary-budget-table'
      }
    ]
  },
  {
    id: 'export',
    label: t('exportAndSubmit.title'),
    url: '/apd/export'
  }
];

const buildActivitySection = (key, i) => ([
  {
    id: `activity-${key}-overview`,
    label: 'Activity overview',
    url: `/apd/activity/${i}/overview`,
  },
  {
    id: `activity-${key}-okrs`,
    label: 'Objectives and key results',
    url: `/apd/activity/${i}/okrs`,
  },
  {
    id: `activity-${key}-state-costs`,
    label: 'State cost categories',
    url: `/apd/activity/${i}/state-costs`,
  },
  {
    id: `activity-${key}-contractor-costs`,
    label: 'Private contractor costs',
    url: `/apd/activity/${i}/contractor-costs`,
  },
  {
    id: `activity-${key}-cost-allocation`,
    label: 'Cost allocation',
    url: `/apd/activity/${i}/cost-allocation`,
  },
  {
    id: `activity-${key}-ffp`,
    label: 'FFP and budget',
    url: `/apd/activity/${i}/ffp`,
  }
])

const buildActivityItems = activities => {
  const activityItems = activities.map((a, i) => ({
    id: a.key,
    url: `#${a.anchor}`,
    label: t(`sidebar.titles.activity-${a.name ? 'set' : 'unset'}`, {
      number: i + 1,
      name: a.name
    }),
    items: buildActivitySection(a.key, i),
    defaultCollapsed: true
  }));

  activityItems.splice(
    0,
    0,
    {
      id: 'activities-overview',
      url: '#activities',
      label: 'Overview'
    },
    {
      id: 'activities-list',
      url: '#activities-list',
      label: t('activities.list.title')
    }
  );

  return activityItems;
};

const buildLinks = activities => {
  links.map(link => link.defaultCollapsed = true)
  const i = links.findIndex(link => link.id === 'activities')
  links[i] = {
    ...links[i],
    items: buildActivityItems(activities),
  }
  return links
}

export { buildLinks }
