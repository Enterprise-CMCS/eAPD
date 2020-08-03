import { LOCATION_CHANGE } from 'connected-react-router';
import { t } from '../../i18n';

import { APD_ACTIVITIES_CHANGE } from '../../actions/editApd/symbols';
import { NAVIGATION_SCROLL_TO_WAYPOINT } from '../../actions/app/symbols';


// todo: write a test to assert the first item does not have a #hash-id
// this fowls up how the Continue/Previous buttons work

const links = [
  {
    label: t('apd.stateProfile.title'),
    items: [
      {
        id: 'apd-state-profile-nav',
        label: t('apd.stateProfile.title'),
        url: '/apd/state-profile'
      },
      {
        id: 'apd-state-profile-office-nav',
        label: t('apd.stateProfile.directorAndAddress.title'),
        url: '/apd/state-profile#apd-state-profile-office'
      },
      {
        id: 'apd-state-profile-key-personnel-nav',
        label: t('apd.stateProfile.keyPersonnel.title'),
        url: '/apd/state-profile#apd-state-profile-key-personnel'
      }
    ]
  },
  {
    id: 'apd-program-summary-nav',
    label: t('apd.title'),
    url: '/apd/program-summary'
  },
  {
    label: t('previousActivities.title'),
    defaultCollapsed: true,
    items: [
      {
        id: 'apd-previous-activities-nav',
        label: t('previousActivities.title'),
        url: '/apd/previous-activities'
      },
      {
        id: 'prev-activities-outline-nav',
        label: t('previousActivities.outline.title'),
        url: '/apd/previous-activities#prev-activities-outline'
      },
      {
        id: 'prev-activities-table-nav',
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
    id: 'apd-schedule-summary-nav',
    label: t('scheduleSummary.title'),
    url: '/apd/schedule-summary'
  },
  {
    label: t('proposedBudget.title'),
    defaultCollapsed: true,
    items: [
      {
        id: 'apd-proposed-budget-nav',
        label: t('proposedBudget.title'),
        url: '/apd/proposed-budget'
      },
      {
        id: 'summary-schedule-by-activity-table-nav',
        label: t('proposedBudget.summaryBudgetByActivity.title'),
        url: '/apd/proposed-budget#summary-schedule-by-activity-table'
      },
      {
        id: 'budget-summary-table-nav',
        label: t('proposedBudget.summaryBudget.title'),
        url: '/apd/proposed-budget#budget-summary-table'
      },
      {
        id: 'budget-federal-by-quarter-nav',
        label: t('proposedBudget.quarterlyBudget.title'),
        url: '/apd/proposed-budget#budget-federal-by-quarter'
      },
      {
        id: 'budget-incentive-by-quarter-nav',
        label: t('proposedBudget.paymentsByFFYQuarter.title'),
        url: '/apd/proposed-budget#budget-incentive-by-quarter'
      }
    ]
  },
  {
    id: 'apd-assurances-and-compliance-nav',
    label: t('assurancesAndCompliance.title'),
    url: '/apd/assurances-and-compliance'
  },
  {
    label: t('executiveSummary.title'),
    defaultCollapsed: true,
    items: [
      {
        id: 'apd-executive-summary-nav',
        label: t('executiveSummary.title'),
        url: '/apd/executive-summary'
      },
      {
        id: 'executive-summary-summary-nav',
        label: t('executiveSummary.summary.title'),
        url: '/apd/executive-summary#executive-summary-summary'
      },
      {
        id: 'executive-summary-budget-table-nav',
        label: t('executiveSummary.budgetTable.title'),
        url: '/apd/executive-summary#executive-summary-budget-table'
      }
    ]
  },
  {
    id: 'apd-export-nav',
    label: t('exportAndSubmit.title'),
    url: '/apd/export'
  }
];

const buildActivitySection = i => [
  {
    id: `apd-activity-${i}-overview-nav`,
    label: 'Activity overview',
    url: `/apd/activity/${i}/overview`
  },
  {
    id: `apd-activity-${i}-okrs-nav`,
    label: 'Objectives and key results',
    url: `/apd/activity/${i}/okrs`
  },
  {
    id: `apd-activity-${i}-state-costs-nav`,
    label: 'State cost categories',
    url: `/apd/activity/${i}/state-costs`
  },
  {
    id: `apd-activity-${i}-contractor-costs-nav`,
    label: 'Private contractor costs',
    url: `/apd/activity/${i}/contractor-costs`
  },
  {
    id: `apd-activity-${i}-cost-allocation-nav`,
    label: 'Cost allocation',
    url: `/apd/activity/${i}/cost-allocation`
  },
  {
    id: `apd-activity-${i}-ffp-nav`,
    label: 'FFP and budget',
    url: `/apd/activity/${i}/ffp`
  }
];

const buildActivityItems = activities => {
  const activityItems = activities.map((activity, i) => ({
    label: t(`sidebar.titles.activity-${activity.name ? 'set' : 'unset'}`, {
      number: i + 1,
      name: activity.name
    }),
    defaultCollapsed: true,
    items: buildActivitySection(i)
  }));

  activityItems.splice(0, 0, {
    id: 'apd-activities-nav',
    url: '/apd/activities',
    label: t('activities.list.title')
  });

  return activityItems;
};

const flatten = (result, node) => {
  if (node === null) return result;
  if (Array.isArray(node)) return node.reduce(flatten, result);
  result.push(node);
  return flatten(result, node && node.items ? node.items : null);
};

const initialState = {
  links,
  continueLink: null,
  previousLink: null,
  selectedId: 'apd-state-profile-nav'
};

const getContinuePreviousLinks = (links, pathname) => {
  const flatLinks = flatten([], links).filter(
    link => link.url && !link.url.includes('#')
  );
  const currentIndex = flatLinks.findIndex(link => link.url === pathname);
  const continueLink =
    currentIndex + 1 < flatLinks.length
      ? flatLinks[currentIndex + 1]
      : null;
  const previousLink =
    currentIndex - 1 >= 0 ? flatLinks[currentIndex - 1] : null;

  return { continueLink, previousLink };
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case APD_ACTIVITIES_CHANGE: {
      const updatedLinks = links.map(link => {
        if (link.label !== t('activities.title')) return link;
        return { ...link, items: buildActivityItems(action.activities) };
      });
      return {
        ...state,
        links: updatedLinks
      };
    }

    case LOCATION_CHANGE: {
      const { pathname, hash } = action.payload.location;
      const selectedId = hash
        ? `${hash.replace('#', '')}-nav`
        : `${pathname.substring(1).replace(/\//g, '-')}-nav`;

      const {
        continueLink,
        previousLink
      } = getContinuePreviousLinks(state.links, pathname);

      return {
        ...state,
        continueLink,
        previousLink,
        selectedId
      };
    }

    case NAVIGATION_SCROLL_TO_WAYPOINT: {
      const { waypointId } = action;
      return {
        ...state,
        selectedId: `${waypointId}-nav`
      };
    }

    default:
      return state;
  }
};

export default reducer;
