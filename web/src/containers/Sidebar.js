import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { expandActivitySection } from '../actions/activities';
import { saveApd } from '../actions/apd';
import Btn from '../components/Btn';
import VerticalNav from '@cmsgov/design-system-core/dist/components/VerticalNav/VerticalNav';

class Sidebar extends Component {
  state = { selectedId: 'apd-state-profile-office' };

  handleSelectClick = (id) => this.setState({ selectedId: id.id });

  createActivityItems = (activities) => {
    let activityItems = activities.map((a, i) => ({
      id: a.key,
      url: `#${a.anchor}`,
      label: t(`sidebar.titles.activity-${a.name ? 'set' : 'unset'}`, {
        number: i + 1,
        name: a.name
      }),
      onClick: (evt, id) => this.handleSelectClick({id})
    }));

    activityItems.splice(0, 0, {
      id: 'activities-list',
      url: '#activities-list',
      label: t('activities.list.title'),
      onClick: (evt, id) => this.handleSelectClick({id})
    });

    return activityItems;
  }

  render() {
    const {
      activities,
      place,
      saveApdToAPI
    } = this.props;

    const activityItems = this.createActivityItems(activities);


    const isSelected = (id) => {
      return id === this.state.selectedId;
    };

    const links = [
      {
        id: 'apd-state-profile',
        label: t('apd.stateProfile.title'),
        defaultCollapsed: true,
        items: [
          {
            id: 'apd-state-profile-office',
            url: '#apd-state-profile-office',
            label: t('apd.stateProfile.directorAndAddress.title'),
            selected: isSelected('apd-state-profile-office'),
            onClick: (evt, id) => this.handleSelectClick({id})
          },
          {
            id: 'apd-state-profile-key-personnel',
            url: '#apd-state-profile-key-personnel',
            label: t('apd.stateProfile.keyPersonnel.title'),
            onClick: (evt, id) => this.handleSelectClick({id})
          }
        ]
      },
      {
        id: 'apd-summary',
        label: t('apd.title'),
        defaultCollapsed: true,
        items: [
          {
            id: 'apd-summary-overview',
            url: '#apd-summary-overview',
            label: t('apd.overview.title'),
            onClick: (evt, id) => this.handleSelectClick({id})
          }
        ]
      },
      {
        id: 'prev-activities',
        label: t('previousActivities.title'),
        defaultCollapsed: true,
        items: [
          {
            id: 'prev-activities-outline',
            url: '#prev-activities-outline',
            label: t('previousActivities.outline.title'),
            onClick: (evt, id) => this.handleSelectClick({id})
          },
          {
            id: 'prev-activities-table',
            url: '#prev-activities-table',
            label: t('previousActivities.actualExpenses.title'),
            onClick: (evt, id) => this.handleSelectClick({id})
          }
        ]
      },
      {
        id: 'activities',
        label: t('activities.title'),
        defaultCollapsed: true,
        items: activityItems,
      },
      {
        id: 'schedule-summary',
        label: t('scheduleSummary.title'),
        defaultCollapsed: true,
        items: [
          {
            id: 'schedule-summary-table',
            url: '#schedule-summary-table',
            label: t('scheduleSummary.main.title'),
            onClick: (evt, id) => this.handleSelectClick({id})
          }
        ]
      },
      {
        id: 'budget',
        label: t('proposedBudget.title'),
        defaultCollapsed: true,
        items: [
          {
            id: 'budget-summary-table',
            url: '#budget-summary-table',
            label: t('proposedBudget.summaryBudget.title'),
            onClick: (evt, id) => this.handleSelectClick({id})
          },
          {
            id: 'budget-federal-by-quarter',
            url: '#budget-federal-by-quarter',
            label: t('proposedBudget.quarterlyBudget.title'),
            onClick: (evt, id) => this.handleSelectClick({id})
          },
          {
            id: 'budget-incentive-by-quarter',
            url: '#budget-incentive-by-quarter',
            label: t('proposedBudget.paymentsByFFYQuarter.title'),
            onClick: (evt, id) => this.handleSelectClick({id})
          }
        ]
      },
      {
        id: 'assurances-compliance',
        label: t('assurancesAndCompliance.title'),
        defaultCollapsed: true,
        items: [
          {
            id: 'assurances-compliance-fed-citations',
            url: '#assurances-compliance-fed-citations',
            label: t('assurancesAndCompliance.citations.title'),
            onClick: (evt, id) => this.handleSelectClick({id})
          }
        ]
      },
      {
        id: 'executive-summary',
        label: t('executiveSummary.title'),
        defaultCollapsed: true,
        items: [
          {
            id: 'executive-summary-overview',
            url: '#executive-summary-overview',
            label: t('executiveSummary.summary.title'),
            onClick: (evt, id) => this.handleSelectClick({id})
          },
          {
            id: 'executive-summary-budget-table',
            url: '#executive-summary-budget-table',
            label: t('executiveSummary.budgetTable.title'),
            onClick: (evt, id) => this.handleSelectClick({id})
          }
        ]
      },
      {
        id: 'certify-submit',
        label: t('certifyAndSubmit.title'),
        url: '#certify-submit'
      }
    ];

    return (
      <div className="ds-l-col--3 bg-white">
        <aside className="site-sidebar">
          <div className="xs-hide sm-hide">
            <div className="flex items-center">
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
            <VerticalNav
              selectedId={this.state.selectedId}
              items={links}
              onLinkClick={this.handleSelectClick}
            />
            <div className="p2 lg-p3">
              <div className="mt3">
                <Btn onClick={() => saveApdToAPI()}>
                  {t('sidebar.saveApdButtonText')}
                </Btn>{' '}
                <Btn kind="outline" extraCss="bg-white blue">
                  {t('sidebar.savePdfButtonText')}
                </Btn>
              </div>
            </div>
          </div>
        </aside>
      </div>
    )
  };
};

Sidebar.propTypes = {
  activities: PropTypes.array.isRequired,
  place: PropTypes.object.isRequired,
  hash: PropTypes.string.isRequired,
  expandSection: PropTypes.func.isRequired,
  saveApdToAPI: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  activities: { byKey, allKeys },
  sidebar,
  router
}) => ({
  activities: allKeys.map(key => ({
    key,
    anchor: `activity-${key}`,
    name: byKey[key].name
  })),
  hash: router.location.hash.slice(1) || ''
});

const mapDispatchToProps = {
  expandSection: expandActivitySection,
  saveApdToAPI: saveApd,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export { Sidebar as plain, mapStateToProps, mapDispatchToProps };
