import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { expandActivitySection } from '../actions/activities';
import SidebarLink from '../components/SidebarLink';

const linkGroup1 = [
  { id: 'apd-summary', name: t('sidebar.titles.programSummary') },
  { id: 'prev-activities', name: t('sidebar.titles.previousActivities') },
  { id: 'activities', name: t('sidebar.titles.activities') }
];

const linkGroup2 = [
  { id: 'budget', name: t('sidebar.titles.budget') },
  { id: 'assurances-compliance', name: t('sidebar.titles.assurances') },
  { id: 'executive-summary', name: t('sidebar.titles.summary') },
  { id: 'certify-submit', name: t('sidebar.titles.submit') }
];

const Sidebar = ({ activities, place, hash, expandSection }) => (
  <div className="site-sidebar bg-navy">
    <div className="p2 xs-hide sm-hide">
      <div className="mb2">
        <img
          src={`/static/img/${place.id}.svg`}
          alt={place.name}
          className="align-middle"
          width="50"
          height="50"
        />
      </div>
      <ul className="list-reset">
        {linkGroup1.map(d => (
          <SidebarLink key={d.id} anchor={d.id} isActive={d.id === hash}>
            {d.name}
          </SidebarLink>
        ))}
        <ul className="mb0 ml2 list-reset h5">
          {activities.map((a, i) => (
            <SidebarLink
              key={a.id}
              anchor={a.anchor}
              isActive={a.anchor === hash}
              onClick={() => expandSection(a.id)}
            >
              {t('sidebar.titles.activity', {
                number: i + 1,
                count: a.name ? a.name.length : 0,
                name: a.name
              })}
            </SidebarLink>
          ))}
        </ul>
        {linkGroup2.map(d => (
          <SidebarLink key={d.id} anchor={d.id} isActive={d.id === hash}>
            {d.name}
          </SidebarLink>
        ))}
      </ul>

      <div className="mt2 pt2 border-top border-white">
        <button type="button" className="btn btn-primary bg-white navy">
          {t('sidebar.savePdfButtonText')}
        </button>
      </div>
    </div>
  </div>
);

Sidebar.propTypes = {
  activities: PropTypes.array.isRequired,
  place: PropTypes.object.isRequired,
  hash: PropTypes.string.isRequired,
  expandSection: PropTypes.func.isRequired
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
  expandSection: expandActivitySection
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
