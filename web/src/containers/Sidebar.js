import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { expandActivitySection } from '../actions/activities';
import { saveApd } from '../actions/apd';
import SidebarLink from '../components/SidebarLink';

const linkGroup1 = [
  { id: 'apd-state-profile', name: t('sidebar.titles.stateProfile') },
  {
    id: 'apd-summary',
    name: t('sidebar.titles.programSummary'),
    sub: [
      {
        id: 'apd-summary-overview',
        name: t('sidebar.titles.programSummaryOverview')
      }
    ]
  },
  {
    id: 'prev-activities',
    name: t('sidebar.titles.previousActivities'),
    sub: [
      {
        id: 'prev-activities-outline',
        name: t('sidebar.titles.previousActivitiesOutline')
      },
      {
        id: 'prev-activities-table',
        name: t('sidebar.titles.previousActivitiesActual')
      }
    ]
  },
  {
    id: 'activities',
    name: t('sidebar.titles.activities'),
    sub: [
      {
        id: 'activities-list',
        name: t('sidebar.titles.activitiesList')
      }
    ]
  }
];

const linkGroup2 = [
  {
    id: 'schedule-summary',
    name: t('sidebar.titles.summarySchedule'),
    sub: [
      {
        id: 'schedule-summary-table',
        name: t('sidebar.titles.summaryScheduleTable')
      }
    ]
  },
  {
    id: 'budget',
    name: t('sidebar.titles.budget'),
    sub: [
      {
        id: 'budget-summary-table',
        name: t('sidebar.titles.budgetSummaryTable')
      },
      {
        id: 'budget-federal-by-quarter',
        name: t('sidebar.titles.budgetFederalShareByQuarter')
      },
      {
        id: 'budget-incentive-by-quarter',
        name: t('sidebar.titles.budgetIncentivePaymentByQuarter')
      }
    ]
  },
  {
    id: 'assurances-compliance',
    name: t('sidebar.titles.assurances'),
    sub: [
      {
        id: 'assurances-compliance-fed-citations',
        name: t('sidebar.titles.assurancesFederalCitations')
      }
    ]
  },
  {
    id: 'executive-summary',
    name: t('sidebar.titles.summary'),
    sub: [
      {
        id: 'executive-summary-overview',
        name: t('sidebar.titles.summaryOverview')
      },
      {
        id: 'executive-summary-budget-table',
        name: t('sidebar.titles.summaryBudgetTable')
      }
    ]
  },
  {
    id: 'certify-submit',
    name: t('sidebar.titles.submit'),
    sub: [
      { id: 'certify-submit-submit', name: t('sidebar.titles.submitSubmit') }
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
          <ul className="mb0 ml2 list-reset">
            {activities.map((a, i) => (
              <SidebarLink
                key={a.id}
                anchor={a.anchor}
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
        <div className="mt2">
          <button type="button" className="btn bg-white blue rounded">
            {t('sidebar.savePdfButtonText')}
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p2 lg-px3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => saveApdToAPI()}
          >
            Save APD
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
