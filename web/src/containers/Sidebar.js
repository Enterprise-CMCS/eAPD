import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { expandActivitySection } from '../actions/activities';
import { saveApd } from '../actions/apd';
import SidebarLink from '../components/SidebarLink';

const linkGroup1 = [
  { id: 'apd-state-profile', name: t('apd.stateProfile.title') },
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

const Sidebar = ({ activities, place, hash, expandSection, saveApdToAPI }) => (
  <div className="site-sidebar bg-teal relative">
    <div className="xs-hide sm-hide">
      <div className="px2 py3 lg-px3 lg-py4 bg-white flex items-center">
        <img
          src={`/static/img/${place.id}.svg`}
          alt={place.name}
          className="align-middle mr1"
          width="50"
          height="50"
        />
        <div className="blue h3 light caps line-height-2">
          {place.name} <br />
          {t('title', { year: '2018' })}
        </div>
      </div>
      <div className="p2 lg-p3">
        <ul className="list-reset">
          {linkGroup1.map(d => (
            <SidebarLink key={d.id} anchor={d.id} hash={hash} sub={d.sub}>
              {d.name}
            </SidebarLink>
          ))}
          <ul className="mb0 list-reset">
            {activities.map((a, i) => (
              <SidebarLink
                key={a.id}
                anchor={a.anchor}
                depth={1}
                hash={hash}
                onClick={() => expandSection(a.id)}
              >
                {t(`sidebar.titles.activity-${a.name ? 'set' : 'unset'}`, {
                  number: i + 1,
                  name: a.name
                })}
              </SidebarLink>
            ))}
          </ul>
          {linkGroup2.map(d => (
            <SidebarLink key={d.id} anchor={d.id} hash={hash} sub={d.sub}>
              {d.name}
            </SidebarLink>
          ))}
        </ul>
        <div className="mt3">
          <button
            type="button"
            className="btn btn-primary mr1"
            onClick={() => saveApdToAPI()}
          >
            {t('sidebar.saveApdButtonText')}
          </button>
          <button type="button" className="btn btn-outline bg-white blue">
            {t('sidebar.savePdfButtonText')}
          </button>
        </div>
      </div>
    </div>
  </div>
);

Sidebar.propTypes = {
  activities: PropTypes.array.isRequired,
  place: PropTypes.object.isRequired,
  hash: PropTypes.string.isRequired,
  expandSection: PropTypes.func.isRequired,
  saveApdToAPI: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId, allIds }, router }) => ({
  activities: allIds.map(id => ({
    id,
    anchor: `activity-${id}`,
    name: byId[id].name
  })),
  hash: router.location.hash.slice(1) || ''
});

const mapDispatchToProps = {
  expandSection: expandActivitySection,
  saveApdToAPI: saveApd
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
