import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { expandActivitySection } from '../actions/activities';
import { saveApd } from '../actions/apd';
import { toggleExpand as toggleExpandAction } from '../actions/sidebar';
import Btn from '../components/Btn';
import SidebarLink from '../components/SidebarLink';

const linkGroup1 = [
  {
    id: 'apd-state-profile',
    name: t('apd.stateProfile.title'),
    sub: [
      {
        id: 'apd-state-profile-office',
        name: t('apd.stateProfile.directorAndAddress.title')
      },
      {
        id: 'apd-state-profile-contacts',
        name: t('apd.stateProfile.pointsOfContact.title')
      }
    ]
  },
  {
    id: 'apd-summary',
    name: t('apd.title'),
    sub: [
      {
        id: 'apd-summary-overview',
        name: t('apd.overview.title')
      }
    ]
  },
  {
    id: 'prev-activities',
    name: t('previousActivities.title'),
    sub: [
      {
        id: 'prev-activities-outline',
        name: t('previousActivities.outline.title')
      },
      {
        id: 'prev-activities-table',
        name: t('previousActivities.actualExpenses.title')
      }
    ]
  },
  {
    id: 'activities',
    name: t('activities.title'),
    sub: [
      {
        id: 'activities-list',
        name: t('activities.list.title')
      }
    ]
  }
];

const linkGroup2 = [
  {
    id: 'schedule-summary',
    name: t('scheduleSummary.title'),
    sub: [
      {
        id: 'schedule-summary-table',
        name: t('scheduleSummary.main.title')
      }
    ]
  },
  {
    id: 'budget',
    name: t('proposedBudget.title'),
    sub: [
      {
        id: 'budget-summary-table',
        name: t('proposedBudget.summaryBudget.title')
      },
      {
        id: 'budget-federal-by-quarter',
        name: t('proposedBudget.quarterlyBudget.title')
      },
      {
        id: 'budget-incentive-by-quarter',
        name: t('proposedBudget.paymentsByFFYQuarter.title')
      }
    ]
  },
  {
    id: 'assurances-compliance',
    name: t('assurancesAndCompliance.title'),
    sub: [
      {
        id: 'assurances-compliance-fed-citations',
        name: t('assurancesAndCompliance.citations.title')
      }
    ]
  },
  {
    id: 'executive-summary',
    name: t('executiveSummary.title'),
    sub: [
      {
        id: 'executive-summary-overview',
        name: t('executiveSummary.summary.title')
      },
      {
        id: 'executive-summary-budget-table',
        name: t('executiveSummary.budgetTable.title')
      }
    ]
  },
  {
    id: 'certify-submit',
    name: t('certifyAndSubmit.title'),
    sub: [
      { id: 'certify-submit-submit', name: t('certifyAndSubmit.certify.title') }
    ]
  }
];

const Sidebar = ({
  activities,
  place,
  hash,
  expanded,
  expandSection,
  saveApdToAPI,
  toggleExpand
}) => (
  <div className="site-sidebar bg-teal relative">
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
      <div className="p2 lg-p3">
        <ul className="list-reset">
          {linkGroup1.map(d => (
            <SidebarLink
              key={d.id}
              anchor={d.id}
              expanded={expanded[d.id]}
              hash={hash}
              sub={d.sub}
              toggleExpand={() => toggleExpand(d.id)}
            >
              {d.name}
            </SidebarLink>
          ))}
          {expanded.activities && (
            <ul className="mb0 list-reset">
              {activities.map((a, i) => (
                <SidebarLink
                  key={a.key}
                  anchor={a.anchor}
                  depth={1}
                  hash={hash}
                  onClick={() => expandSection(a.key)}
                >
                  {t(`sidebar.titles.activity-${a.name ? 'set' : 'unset'}`, {
                    number: i + 1,
                    name: a.name
                  })}
                </SidebarLink>
              ))}
            </ul>
          )}
          {linkGroup2.map(d => (
            <SidebarLink
              key={d.id}
              anchor={d.id}
              expanded={expanded[d.id]}
              hash={hash}
              sub={d.sub}
              toggleExpand={() => toggleExpand(d.id)}
            >
              {d.name}
            </SidebarLink>
          ))}
        </ul>
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
  </div>
);

Sidebar.propTypes = {
  activities: PropTypes.array.isRequired,
  place: PropTypes.object.isRequired,
  hash: PropTypes.string.isRequired,
  expanded: PropTypes.object.isRequired,
  expandSection: PropTypes.func.isRequired,
  saveApdToAPI: PropTypes.func.isRequired,
  toggleExpand: PropTypes.func.isRequired
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
  expanded: sidebar.expanded,
  hash: router.location.hash.slice(1) || ''
});

const mapDispatchToProps = {
  expandSection: expandActivitySection,
  saveApdToAPI: saveApd,
  toggleExpand: toggleExpandAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
