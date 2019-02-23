import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { expandActivitySection } from '../actions/activities';
import { saveApd } from '../actions/apd';
import Btn from '../components/Btn';
import VerticalNav from '@cmsgov/design-system-core/dist/components/VerticalNav/VerticalNav';

class Sidebar extends Component {
  render() {
    const {
      activities,
      place,
      saveApdToAPI
    } = this.props;

    let activityItems = activities.map((a, i) => ({
      id: a.key,
      url: `#${a.anchor}`,
      label: t(`sidebar.titles.activity-${a.name ? 'set' : 'unset'}`, {
        number: i + 1,
        name: a.name
      }),
    }));

    activityItems.splice(0, {
      id: 'activities-list',
      url: '#activities-list',
      label: t('activities.list.title')
    });

    const links = [
      {
        id: 'apd-state-profile',
        label: t('apd.stateProfile.title'),
        defaultCollapsed: true,
        items: [
          {
            id: 'apd-state-profile-office',
            url: '#apd-state-profile-office',
            label: t('apd.stateProfile.directorAndAddress.title')
          },
          {
            id: 'apd-state-profile-key-personnel',
            url: '#apd-state-profile-key-personnel',
            label: t('apd.stateProfile.keyPersonnel.title')
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
            label: t('apd.overview.title')
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
            label: t('previousActivities.outline.title')
          },
          {
            id: 'prev-activities-table',
            url: 'prev-activities-table',
            label: t('previousActivities.actualExpenses.title')
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
            label: t('scheduleSummary.main.title')
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
            label: t('proposedBudget.summaryBudget.title')
          },
          {
            id: 'budget-federal-by-quarter',
            url: '#budget-federal-by-quarter',
            label: t('proposedBudget.quarterlyBudget.title')
          },
          {
            id: 'budget-incentive-by-quarter',
            url: '#budget-incentive-by-quarter',
            label: t('proposedBudget.paymentsByFFYQuarter.title')
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
            label: t('assurancesAndCompliance.citations.title')
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
            label: t('executiveSummary.summary.title')
          },
          {
            id: 'executive-summary-budget-table',
            url: '#executive-summary-budget-table',
            label: t('executiveSummary.budgetTable.title')
          }
        ]
      },
      {
        id: 'certify-submit',
        label: t('certifyAndSubmit.title'),
        defaultCollapsed: true,
        items: [
          {
            id: 'certify-submit-submit',
            url: '#certify-submit-submit',
            label: t('certifyAndSubmit.certify.title')
          }
        ]
      }
    ];

    return (
      <div className="ds-l-col--3">
        <aside className="site-sidebar">
          <div className="xs-hide sm-hide">
            <div className="px2 py3 lg-px3 lg-py4 bg-white flex items-center">
              <img
                src={`/static/img/states/${place.id}.svg`}
                alt={place.name}
                className="align-middle mr2"
                width="40"
                height="40"
              />
              <h1 className="m0 blue h3 light caps line-height-2">
                {place.name} <br />
                {t('title', { year: '2018' })}
              </h1>
            </div>
            <VerticalNav
              items={links}
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
