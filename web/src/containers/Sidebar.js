import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

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

  const handleSelectClick = id => {
    jumpAction(id);
  };

  const createActivityItems = () => {
    const activityItems = activities.map((a, i) => ({
      id: a.key,
      url: `#${a.anchor}`,
      label: t(`sidebar.titles.activity-${a.name ? 'set' : 'unset'}`, {
        number: i + 1,
        name: a.name
      }),
      onClick: (_, id) => handleSelectClick(id)
    }));

    activityItems.splice(0, 0, {
      id: 'activities-overview',
      url: '#activities',
      label: 'Overview',
      onClick: (_, id) => handleSelectClick(id)
    });

    return activityItems;
  };

  const activityItems = createActivityItems(activities);

  const links = [
    {
      id: 'apd-state-profile',
      label: t('apd.stateProfile.title'),
      defaultCollapsed: true,
      items: [
        {
          id: 'apd-state-profile-overview',
          url: '#apd-state-profile',
          label: 'Overview',
          onClick: (_, id) => handleSelectClick(id)
        },
        {
          id: 'apd-state-profile-office',
          url: '#apd-state-profile-office',
          label: t('apd.stateProfile.directorAndAddress.title'),
          onClick: (_, id) => handleSelectClick(id)
        },
        {
          id: 'apd-state-profile-key-personnel',
          url: '#apd-state-profile-key-personnel',
          label: t('apd.stateProfile.keyPersonnel.title'),
          onClick: (_, id) => handleSelectClick(id)
        }
      ]
    },
    {
      id: 'apd-summary',
      url: '#apd-summary',
      label: t('apd.title'),
      onClick: (_, id) => handleSelectClick(id)
    },
    {
      id: 'prev-activities',
      label: t('previousActivities.title'),
      defaultCollapsed: true,
      items: [
        {
          id: 'prev-activities-overview',
          url: '#prev-activities',
          label: 'Overview',
          onClick: (_, id) => handleSelectClick(id)
        },
        {
          id: 'prev-activities-outline',
          url: '#prev-activities-outline',
          label: t('previousActivities.outline.title'),
          onClick: (_, id) => handleSelectClick(id)
        },
        {
          id: 'prev-activities-table',
          url: '#prev-activities-table',
          label: t('previousActivities.actualExpenses.title'),
          onClick: (_, id) => handleSelectClick(id)
        }
      ]
    },
    {
      id: 'activities',
      label: t('activities.title'),
      defaultCollapsed: true,
      items: activityItems
    },
    {
      id: 'schedule-summary',
      url: '#schedule-summary',
      label: t('scheduleSummary.title'),
      onClick: (_, id) => handleSelectClick(id)
    },
    {
      id: 'budget',
      label: t('proposedBudget.title'),
      defaultCollapsed: true,
      items: [
        {
          id: 'budget-overview',
          url: '#budget',
          label: 'Overview',
          onClick: (_, id) => handleSelectClick(id)
        },
        {
          id: 'budget-summary-table',
          url: '#budget-summary-table',
          label: t('proposedBudget.summaryBudget.title'),
          onClick: (_, id) => handleSelectClick(id)
        },
        {
          id: 'budget-federal-by-quarter',
          url: '#budget-federal-by-quarter',
          label: t('proposedBudget.quarterlyBudget.title'),
          onClick: (_, id) => handleSelectClick(id)
        },
        {
          id: 'budget-incentive-by-quarter',
          url: '#budget-incentive-by-quarter',
          label: t('proposedBudget.paymentsByFFYQuarter.title'),
          onClick: (_, id) => handleSelectClick(id)
        }
      ]
    },
    {
      id: 'assurances-compliance',
      url: '#assurances-compliance',
      label: t('assurancesAndCompliance.title'),
      onClick: (_, id) => handleSelectClick(id)
    },
    {
      id: 'executive-summary',
      label: t('executiveSummary.title'),
      defaultCollapsed: true,
      items: [
        {
          id: 'executive-summary-overview',
          url: '#executive-summary',
          label: 'Overview',
          onClick: (_, id) => handleSelectClick(id)
        },
        {
          id: 'executive-summary-summary',
          url: '#executive-summary-summary',
          label: t('executiveSummary.summary.title'),
          onClick: (_, id) => handleSelectClick(id)
        },
        {
          id: 'executive-summary-budget-table',
          url: '#executive-summary-budget-table',
          label: t('executiveSummary.budgetTable.title'),
          onClick: (_, id) => handleSelectClick(id)
        }
      ]
    },
    {
      id: 'export-and-submit',
      url: '#export-and-submit',
      label: t('exportAndSubmit.title'),
      onClick: (_, id) => handleSelectClick(id)
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
