import { t } from '../../i18n';

import { APD_ACTIVITIES_CHANGE } from '../../actions/editApd/symbols'

const links = [
  {
    label: t('apd.stateProfile.title'),
    items: [
      {
        label: 'Overview',
        url: '/apd/state-profile'
      },
      {
        label: t('apd.stateProfile.directorAndAddress.title'),
        url: '/apd/state-profile#apd-state-profile-office'
      },
      {
        label: t('apd.stateProfile.keyPersonnel.title'),
        url: '/apd/state-profile#apd-state-profile-key-personnel'
      },
    ]
  },
  {
    label: t('apd.title'),
    url: '/apd/program-summary'
  },
  {
    label: t('previousActivities.title'),
    defaultCollapsed: true,
    items: [
      {
        label: 'Overview',
        url: '/apd/previous-activities'
      },
      {
        label: t('previousActivities.outline.title'),
        url: '/apd/previous-activities#prev-activities-outline'
      },
      {
        label: t('previousActivities.actualExpenses.title'),
        url: '/apd/previous-activities#prev-activities-table'
      }
    ]
  },
  {
    label: t('activities.title'),
    defaultCollapsed: true,
    items: []
  },
  {
    label: t('scheduleSummary.title'),
    url: '/apd/schedule-summary'
  },
  {
    label: t('proposedBudget.title'),
    defaultCollapsed: true,
    items: [
      {
        label: 'Overview',
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
    defaultCollapsed: true,
    items: [
      {
        label: 'Overview',
        url: '/apd/executive-summary',
      },
      {
        label: t('executiveSummary.summary.title'),
        url: '/apd/executive-summary#executive-summary-summary',
      },
      {
        label: t('executiveSummary.budgetTable.title'),
        url: '/apd/executive-summary#executive-summary-budget-table',
      },
    ]
  },
  {
    label: t('exportAndSubmit.title'),
    url: '/print'
  }
]

const buildActivitySection = i => ([
  {
    label: 'Activity overview',
    url: `/apd/activity/${i}/overview`,
  },
  {
    label: 'Objectives and key results',
    url: `/apd/activity/${i}/okrs`,
  },
  {
    label: 'State cost categories',
    url: `/apd/activity/${i}/state-costs`,
  },
  {
    label: 'Private contractor costs',
    url: `/apd/activity/${i}/contractor-costs`,
  },
  {
    label: 'Cost allocation',
    url: `/apd/activity/${i}/cost-allocation`,
  },
  {
    label: 'FFP and budget',
    url: `/apd/activity/${i}/ffp`,
  }
])

const buildActivityItems = activities => {
  const activityItems = activities.map((activity, i) => ({
    label: t(`sidebar.titles.activity-${activity.name ? 'set' : 'unset'}`, {
      number: i + 1,
      name: activity.name
    }),
    defaultCollapsed: true,
    items: buildActivitySection(i)
  }));

  activityItems.splice(
    0,
    0,
    {
      id: 'activities-list',
      url: '/apd/activities#activities-list',
      label: t('activities.list.title')
    }
  );
  console.log('got here')
  console.log(activityItems)

  return activityItems;
};

const initialState =  {
  links
}

const reducer = (state = initialState, action = {}) => {
  const { type, activities } = action;

  switch (type) {
    case APD_ACTIVITIES_CHANGE:
      const updatedLinks = links.map(link => {
        if (link.label !== t('activities.title')) return link;
        return { ...link, items: buildActivityItems(activities) }
      })
      return {
        ...state,
        links: updatedLinks
      }

    default:
      return state
  }
}

export default reducer
