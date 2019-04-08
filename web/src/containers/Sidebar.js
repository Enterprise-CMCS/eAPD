import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import VerticalNav from '@cmsgov/design-system-core/dist/components/VerticalNav/VerticalNav';

import { t } from '../i18n';
import { saveApd } from '../actions/apd';
import { jumpTo } from '../actions/navigation';
import { printApd } from '../actions/print';
import Btn from '../components/Btn';
import { selectActivitiesSidebar } from '../reducers/activities.selectors';
import { selectActiveSection } from '../reducers/navigation';

class Sidebar extends Component {
  handleSelectClick = id => {
    const { jumpTo: action } = this.props;
    action(id);
  };

  createActivityItems = activities => {
    const activityItems = activities.map((a, i) => ({
      id: a.key,
      url: `#${a.anchor}`,
      label: t(`sidebar.titles.activity-${a.name ? 'set' : 'unset'}`, {
        number: i + 1,
        name: a.name
      }),
      onClick: (evt, id) => this.handleSelectClick(id)
    }));

    activityItems.splice(
      0,
      0,
      {
        id: 'activities-overview',
        url: '#activities',
        label: 'Overview',
        onClick: (evt, id) => this.handleSelectClick(id)
      },
      {
        id: 'activities-list',
        url: '#activities-list',
        label: t('activities.list.title'),
        onClick: (evt, id) => this.handleSelectClick(id)
      }
    );

    return activityItems;
  };

  render() {
    const { activities, place, printApd: print, saveApdToAPI } = this.props;

    const activityItems = this.createActivityItems(activities);

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
            onClick: (evt, id) => this.handleSelectClick(id)
          },
          {
            id: 'apd-state-profile-office',
            url: '#apd-state-profile-office',
            label: t('apd.stateProfile.directorAndAddress.title'),
            onClick: (evt, id) => this.handleSelectClick(id)
          },
          {
            id: 'apd-state-profile-key-personnel',
            url: '#apd-state-profile-key-personnel',
            label: t('apd.stateProfile.keyPersonnel.title'),
            onClick: (evt, id) => this.handleSelectClick(id)
          }
        ]
      },
      {
        id: 'apd-summary',
        url: '#apd-summary',
        label: t('apd.title'),
        onClick: (evt, id) => this.handleSelectClick(id)
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
            onClick: (evt, id) => this.handleSelectClick(id)
          },
          {
            id: 'prev-activities-outline',
            url: '#prev-activities-outline',
            label: t('previousActivities.outline.title'),
            onClick: (evt, id) => this.handleSelectClick(id)
          },
          {
            id: 'prev-activities-table',
            url: '#prev-activities-table',
            label: t('previousActivities.actualExpenses.title'),
            onClick: (evt, id) => this.handleSelectClick(id)
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
        onClick: (evt, id) => this.handleSelectClick(id)
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
            onClick: (evt, id) => this.handleSelectClick(id)
          },
          {
            id: 'budget-summary-table',
            url: '#budget-summary-table',
            label: t('proposedBudget.summaryBudget.title'),
            onClick: (evt, id) => this.handleSelectClick(id)
          },
          {
            id: 'budget-federal-by-quarter',
            url: '#budget-federal-by-quarter',
            label: t('proposedBudget.quarterlyBudget.title'),
            onClick: (evt, id) => this.handleSelectClick(id)
          },
          {
            id: 'budget-incentive-by-quarter',
            url: '#budget-incentive-by-quarter',
            label: t('proposedBudget.paymentsByFFYQuarter.title'),
            onClick: (evt, id) => this.handleSelectClick(id)
          }
        ]
      },
      {
        id: 'assurances-compliance',
        url: '#assurances-compliance',
        label: t('assurancesAndCompliance.title'),
        onClick: (evt, id) => this.handleSelectClick(id)
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
            onClick: (evt, id) => this.handleSelectClick(id)
          },
          {
            id: 'executive-summary-summary',
            url: '#executive-summary-summary',
            label: t('executiveSummary.summary.title'),
            onClick: (evt, id) => this.handleSelectClick(id)
          },
          {
            id: 'executive-summary-budget-table',
            url: '#executive-summary-budget-table',
            label: t('executiveSummary.budgetTable.title'),
            onClick: (evt, id) => this.handleSelectClick(id)
          }
        ]
      }
    ];

    const { activeSection } = this.props;

    return (
      <div className="ds-l-col--3 bg-white">
        <aside className="site-sidebar">
          <div className="xs-hide sm-hide site-sidebar__sticky">
            <div className="flex items-center ds-u-border-bottom--1 ds-u-padding-y--2 ds-u-margin-bottom--4">
              <img
                src={`/static/img/states/${place.id}.svg`}
                alt={place.name}
                className="align-middle mr2"
                width="40"
                height="40"
              />
              <h1 className="text-xl">
                {place.name} <br />
                {t('title', { year: '2018' })}
              </h1>
            </div>
            <VerticalNav selectedId={activeSection} items={links} />
            <div className="ds-u-margin-top--2">
              <Btn onClick={() => saveApdToAPI()}>
                {t('sidebar.saveApdButtonText')}
              </Btn>{' '}
              <Btn
                kind="outline"
                onClick={() => print()}
                extraCss="bg-white blue"
              >
                {t('sidebar.savePdfButtonText')}
              </Btn>
            </div>
          </div>
        </aside>
      </div>
    );
  }
}

Sidebar.propTypes = {
  activities: PropTypes.array.isRequired,
  activeSection: PropTypes.string.isRequired,
  jumpTo: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired,
  printApd: PropTypes.func.isRequired,
  saveApdToAPI: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activities: selectActivitiesSidebar(state),
  activeSection: selectActiveSection(state)
});

const mapDispatchToProps = {
  jumpTo,
  printApd,
  saveApdToAPI: saveApd
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

export { Sidebar as plain, mapStateToProps, mapDispatchToProps };
