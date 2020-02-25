import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useRouteMatch, useHistory } from 'react-router-dom';

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

  const { pathname: locationPath } = useLocation();
  const { path: routePath } = useRouteMatch();

  let activityIndex = null;
  const activityRouteMatch = /activity\/(\d+)/.exec(locationPath);
  if (activityRouteMatch) {
    activityIndex = +activityRouteMatch[1];
  }

  const handleSelectClick = id => {
    if (locationPath !== routePath) {
      history.push(routePath);
    }
    jumpAction(id);
  };

  const createActivityItems = () => {
    const activityItems = activities.map((a, i) => ({
      id: a.key,
      url: activityIndex !== i ? `#` : null,
      label: t(`sidebar.titles.activity-${a.name ? 'set' : 'unset'}`, {
        number: i + 1,
        name: a.name
      }),
      onClick: e => {
        e.stopPropagation();
        jumpAction(a.key);
        history.push(`/apd/activity/${i}`);
      },
      items:
        activityIndex === i
          ? [
              {
                id: `${a.key}-overview`,
                url: '#',
                label: 'Activity overview',
                onClick: e => {
                  e.stopPropagation();
                  jumpAction(`${a.key}-overview`);
                  history.push(`/apd/activity/${i}/overview`);
                }
              },
              {
                id: `${a.key}-okr`,
                url: '#',
                label: 'Objectives and key results',
                onClick: e => {
                  e.stopPropagation();
                  jumpAction(`${a.key}-okr`);
                  history.push(`/apd/activity/${i}/okrs`);
                }
              },
              {
                id: `${a.key}-state-costs`,
                url: '#',
                label: 'State cost categories',
                onClick: e => {
                  e.stopPropagation();
                  jumpAction(`${a.key}-state-costs`);
                  history.push(`/apd/activity/${i}/state-costs`);
                }
              },
              {
                id: `${a.key}-contractor-costs`,
                url: '#',
                label: 'Private contractor costs',
                onClick: e => {
                  e.stopPropagation();
                  jumpAction(`${a.key}-contractor-costs`);
                  history.push(`/apd/activity/${i}/contractor-costs`);
                }
              },
              {
                id: `${a.key}-cost-allocation`,
                url: '#',
                label: 'Cost allocation',
                onClick: e => {
                  e.stopPropagation();
                  jumpAction(`${a.key}-cost-allocation`);
                  history.push(`/apd/activity/${i}/cost-allocation`);
                }
              }
            ]
          : null
    }));

    activityItems.splice(
      0,
      0,
      // {
      //   id: 'activities-overview',
      //   url: '#activities',
      //   label: 'Overview',
      //   onClick: (evt, id) => handleSelectClick(id)
      // },
      {
        id: 'activities-list',
        // url: '#activities-list',
        url: '#',
        label: t('activities.list.title'),
        onClick(e) {
          e.stopPropagation();
          jumpAction('activities-list');
          history.push('/apd/activities');
        }
        // onClick: (evt, id) => handleSelectClick(id)
      }
    );

    return activityItems;
  };

  const activityItems = createActivityItems();

  const linkClick = url => e => {
    e.stopPropagation();
    jumpAction(url);
    history.push(`/apd/${url}`);
  };

  const links = [
    {
      id: 'state-profile',
      url: '#',
      label: t('apd.stateProfile.title'),
      defaultCollapsed: true,
      onClick: linkClick('state-profile')
      // items: [
      //   {
      //     id: 'apd-state-profile-overview',
      //     url: '#apd-state-profile',
      //     label: 'Overview',
      //     onClick: (evt, id) => handleSelectClick(id)
      //   },
      //   {
      //     id: 'apd-state-profile-office',
      //     url: '#apd-state-profile-office',
      //     label: t('apd.stateProfile.directorAndAddress.title'),
      //     onClick: (evt, id) => handleSelectClick(id)
      //   },
      //   {
      //     id: 'apd-state-profile-key-personnel',
      //     url: '#apd-state-profile-key-personnel',
      //     label: t('apd.stateProfile.keyPersonnel.title'),
      //     onClick: (evt, id) => handleSelectClick(id)
      //   }
      // ]
    },
    {
      id: 'program-summary',
      label: t('apd.title'),
      url: '#',
      // onClick: (evt, id) => handleSelectClick(id)
      onClick: linkClick('program-summary')
    },
    {
      id: 'previous-activities',
      label: t('previousActivities.title'),
      url: '#',
      defaultCollapsed: true,
      onClick: linkClick('previous-activities')
      // items: [
      //   {
      //     id: 'prev-activities-overview',
      //     url: '#prev-activities',
      //     label: 'Overview',
      //     onClick: (evt, id) => handleSelectClick(id)
      //   },
      //   {
      //     id: 'prev-activities-outline',
      //     url: '#prev-activities-outline',
      //     label: t('previousActivities.outline.title'),
      //     onClick: (evt, id) => handleSelectClick(id)
      //   },
      //   {
      //     id: 'prev-activities-table',
      //     url: '#prev-activities-table',
      //     label: t('previousActivities.actualExpenses.title'),
      //     onClick: (evt, id) => handleSelectClick(id)
      //   }
      // ]
    },
    {
      id: 'activities',
      label: t('activities.title'),
      defaultCollapsed: true,
      items: activityItems
    },
    {
      id: 'schedule-summary',
      // url: '#schedule-summary',
      url: '#',
      label: t('scheduleSummary.title'),
      // onClick: (evt, id) => handleSelectClick(id)
      onClick: linkClick('schedule-summary')
    },
    {
      id: 'proposed-budget',
      label: t('proposedBudget.title'),
      url: '#',
      defaultCollapsed: true,
      onClick: linkClick('proposed-budget')
      // items: [
      //   {
      //     id: 'budget-overview',
      //     url: '#budget',
      //     label: 'Overview',
      //     onClick: (evt, id) => handleSelectClick(id)
      //   },
      //   {
      //     id: 'budget-summary-table',
      //     url: '#budget-summary-table',
      //     label: t('proposedBudget.summaryBudget.title'),
      //     onClick: (evt, id) => handleSelectClick(id)
      //   },
      //   {
      //     id: 'budget-federal-by-quarter',
      //     url: '#budget-federal-by-quarter',
      //     label: t('proposedBudget.quarterlyBudget.title'),
      //     onClick: (evt, id) => handleSelectClick(id)
      //   },
      //   {
      //     id: 'budget-incentive-by-quarter',
      //     url: '#budget-incentive-by-quarter',
      //     label: t('proposedBudget.paymentsByFFYQuarter.title'),
      //     onClick: (evt, id) => handleSelectClick(id)
      //   }
      // ]
    },
    {
      id: 'assurances-and-compliance',
      // url: '#assurances-compliance',
      url: '#',
      label: t('assurancesAndCompliance.title'),
      // onClick: (evt, id) => handleSelectClick(id)
      onClick: linkClick('assurances-and-compliance')
    },
    {
      id: 'executive-summary',
      label: t('executiveSummary.title'),
      url: '#',
      defaultCollapsed: true,
      onClick: linkClick('executive-summary')
      // items: [
      //   {
      //     id: 'executive-summary-overview',
      //     url: '#executive-summary',
      //     label: 'Overview',
      //     onClick: (evt, id) => handleSelectClick(id)
      //   },
      //   {
      //     id: 'executive-summary-summary',
      //     url: '#executive-summary-summary',
      //     label: t('executiveSummary.summary.title'),
      //     onClick: (evt, id) => handleSelectClick(id)
      //   },
      //   {
      //     id: 'executive-summary-budget-table',
      //     url: '#executive-summary-budget-table',
      //     label: t('executiveSummary.budgetTable.title'),
      //     onClick: (evt, id) => handleSelectClick(id)
      //   }
      // ]
    },
    {
      id: 'export',
      // url: '#export-and-submit',
      url: '#',
      label: t('exportAndSubmit.title'),
      // onClick: (evt, id) => handleSelectClick(id)
      onClick: linkClick('export')
    }
  ];

  const hasImage = ['as', 'gu', 'mp', 'vi'].indexOf(place.id) < 0;

  return (
    <aside className="site-sidebar">
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-border-bottom--1 ds-u-padding-y--2 ds-u-margin-bottom--4">
        {hasImage && (
          <img
            src={`/static/img/states/${place.id}.svg`}
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
