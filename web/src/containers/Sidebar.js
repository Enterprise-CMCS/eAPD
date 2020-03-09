import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

import stickybits from 'stickybits';
import VerticalNav from '@cmsgov/design-system-core/dist/components/VerticalNav/VerticalNav';

import { t } from '../i18n';
import { jumpTo } from '../actions/app';
import { selectActivitiesSidebar } from '../reducers/activities.selectors';
import { selectActiveSection } from '../reducers/navigation';

const Sidebar = ({ activeSection, activities, jumpTo: jumpAction, place }) => {
  useEffect(() => {
    stickybits('.site-sidebar');
  }, []);

  const history = useHistory();
  const { path: routePath } = useRouteMatch();

  const pageNav = (id, route) => e => {
    e.stopPropagation();
    e.preventDefault();

    jumpAction(id);
    history.push(`${routePath}/${route}`);
    window.scrollTo(0, 0);
  };

  const anchorNav = id => () => {
    jumpAction(id);
  };

  const links = [
    {
      id: 'apd-state-profile',
      label: t('apd.stateProfile.title'),
      onClick: pageNav('apd-state-profile-office', 'state-profile'),
      children: [
        {
          id: 'apd-state-profile-office',
          label: t('apd.stateProfile.directorAndAddress.title')
        },
        {
          id: 'apd-state-profile-key-personnel',
          label: t('apd.stateProfile.keyPersonnel.title')
        }
      ]
    },
    {
      id: 'apd-summary',
      label: t('apd.title'),
      onClick: pageNav('apd-summary', 'program-summary')
    },
    {
      id: 'previous-activities',
      label: t('previousActivities.title'),
      onClick: pageNav('prev-activities-outline', 'previous-activities'),
      children: [
        {
          id: 'prev-activities-outline',
          label: t('previousActivities.outline.title')
        },
        {
          id: 'prev-activities-table',
          label: t('previousActivities.actualExpenses.title')
        }
      ]
    },
    {
      id: 'activities',
      label: t('activities.title'),
      onClick: pageNav('activities-list', 'activities'),
      children: [
        {
          id: 'activities-list',
          label: t('activities.list.title'),
          onClick: pageNav('activities-list', 'activities'),
          url: `activities`
        }
      ]
    },
    {
      id: 'schedule-summary',
      label: t('scheduleSummary.title'),
      onClick: pageNav('schedule-summary', 'schedule-summary')
    },
    {
      id: 'proposed-budget',
      label: t('proposedBudget.title'),
      onClick: pageNav('budget-summary-table', 'proposed-budget'),
      children: [
        {
          id: 'budget-summary-table',
          label: t('proposedBudget.summaryBudget.title')
        },
        {
          id: 'budget-federal-by-quarter',
          label: t('proposedBudget.paymentsByFFYQuarter.title')
        }
      ]
    },
    {
      id: 'assurances-compliance',
      label: t('assurancesAndCompliance.title'),
      onClick: pageNav('assurances-compliance', 'assurances-and-compliance')
    },
    {
      id: 'executive-summary',
      label: t('executiveSummary.title'),
      onClick: pageNav('executive-summary-summary', 'executive-summary'),
      children: [
        {
          id: 'executive-summary-summary',
          label: t('executiveSummary.summary.title')
        },
        {
          id: 'executive-summary-budget-table',
          label: t('executiveSummary.budgetTable.title')
        }
      ]
    },
    {
      id: 'export',
      label: t('exportAndSubmit.title'),
      onClick: pageNav('export', 'export')
    }
  ];

  links.forEach(topLevel => {
    // Gather up a list of all the nav item IDs that belong to this top-level
    // item. We'll use that list to determine if this item should show as being
    // selected, which would mean we need to show its child elements.
    const ids = [topLevel.id];
    if (topLevel.children) {
      ids.push(...topLevel.children.map(child => child.id));

      if (topLevel.id === 'activities') {
        ids.push(...activities.map(({ key }) => `activity-${key}`));
        activities.forEach(({ key }) =>
          ids.push(
            `activity-${key}-overview`,
            `activity-${key}-okrs`,
            `activity-${key}-state-costs`,
            `activity-${key}-contractor-costs`,
            `activity-${key}-cost-allocation`,
            `activity-${key}-ffp`
          )
        );
      }
    }

    const selected = ids.indexOf(activeSection) >= 0;

    if (selected) {
      // Selected nav items should not have a URL; otherwise, they get
      // rendered twice - once in this nav item and once as the first child.
      topLevel.url = undefined;

      // If this item is defined as having children, turn those into
      // sidebar items.
      if (topLevel.children) {
        topLevel.items = topLevel.children.map(child => ({
          onClick: anchorNav(child.id),
          url: `#${child.id}`,
          ...child
        }));

        // If we're on the activities sidebar item, we should also push a list
        // of activities into its items.
        if (topLevel.id === 'activities') {
          topLevel.items.push(
            ...activities.map(({ key, name }, i) => {
              // But what if the selected item is an activity? Or within one?!
              // Well let's check for that too, okay?
              const activitySelected =
                activeSection.substr(0, 17) === `activity-${key}`;

              return {
                id: `activity-${key}`,
                // Remove the url property if this activity is selected. Same
                // reason as above: otherwise it'll show up twice.
                url: activitySelected ? null : `activity/${i}`,
                label: t(`sidebar.titles.activity-${name ? 'set' : 'unset'}`, {
                  number: i + 1,
                  name
                }),
                onClick: pageNav(`activity-${key}-overview`, `activity/${i}`),

                // For the selected activity, also show the activity sections.
                items: activitySelected
                  ? [
                      {
                        id: `activity-${key}-overview`,
                        label: 'Activity overview',
                        url: `activity/${i}/overview`,
                        onClick: pageNav(
                          `activity-${key}-overview`,
                          `activity/${i}/overview`
                        )
                      },
                      {
                        id: `activity-${key}-okrs`,
                        label: 'Objectives and key results',
                        url: `activity/${i}/okrs`,
                        onClick: pageNav(
                          `activity-${key}-okrs`,
                          `activity/${i}/okrs`
                        )
                      },
                      {
                        id: `activity-${key}-state-costs`,
                        label: 'State cost categories',
                        url: `activity/${i}/state-costs`,
                        onClick: pageNav(
                          `activity-${key}-state-costs`,
                          `activity/${i}/state-costs`
                        )
                      },
                      {
                        id: `activity-${key}-contractor-costs`,
                        label: 'Private contractor costs',
                        url: `activity/${i}/contractor-costs`,
                        onClick: pageNav(
                          `activity-${key}-contractor-costs`,
                          `activity/${i}/contractor-costs`
                        )
                      },
                      {
                        id: `activity-${key}-cost-allocation`,
                        label: 'Cost allocation',
                        url: `activity/${i}/cost-allocation`,
                        onClick: pageNav(
                          `activity-${key}-cost-allocation`,
                          `activity/${i}/cost-allocation`
                        )
                      },
                      {
                        id: `activity-${key}-ffp`,
                        label: 'FFP and budget',
                        url: `activity/${i}/ffp`,
                        onClick: pageNav(
                          `activity-${key}-ffp`,
                          `activity/${i}/ffp`
                        )
                      }
                    ]
                  : null
              };
            })
          );
        }
      }
    } else {
      topLevel.url = '#';
    }
  });

  const hasImage = [].indexOf(place.id) < 0;
  const imgExt = ['png', 'svg'][
    ['as', 'gu', 'mp', 'vi'].indexOf(place.id) < 0 ? 1 : 0
  ];

  return (
    <aside className="site-sidebar">
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-border-bottom--1 ds-u-padding-y--2 ds-u-margin-bottom--4">
        {hasImage && (
          <img
            src={`/static/img/states/${place.id}.${imgExt}`}
            alt={place.name}
            className="ds-u-margin-right--2"
            width="40"
            height="40"
          />
        )}
        <h1>{place.name}</h1>
      </div>
      <VerticalNav
        selectedId={activeSection || 'apd-state-profile-overview'}
        items={links}
      />
    </aside>
  );
};

Sidebar.propTypes = {
  activities: PropTypes.array.isRequired,
  activeSection: PropTypes.string.isRequired,
  jumpTo: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  activities: selectActivitiesSidebar(state),
  activeSection: selectActiveSection(state)
});

const mapDispatchToProps = {
  jumpTo
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export { Sidebar as plain, mapStateToProps, mapDispatchToProps };
