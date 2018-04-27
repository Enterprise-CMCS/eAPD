import PropTypes from 'prop-types';
import React from 'react';

import SidebarLink from './SidebarLink';
import { activityDisplay } from '../util';

const Sidebar = ({ activities, place }) => (
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
        <SidebarLink anchor="apd-summary">Program Summary</SidebarLink>
        <SidebarLink anchor="prev-activities">
          Results of Previous Activities
        </SidebarLink>
        <SidebarLink anchor="activities">Program Activities</SidebarLink>
        <ul className="mb0 ml2 list-reset">
          {activities.map((a, i) => (
            <SidebarLink key={a.id}>{activityDisplay(a, i + 1)}</SidebarLink>
          ))}
        </ul>
        <SidebarLink anchor="budget">Proposed Budget</SidebarLink>
        <SidebarLink anchor="assurances-compliance">
          Assurances and Compliance
        </SidebarLink>
        <SidebarLink anchor="executive-summary">
          Executive/Overall Summary
        </SidebarLink>
        <SidebarLink anchor="certify-submit">Certify and Submit</SidebarLink>
      </ul>
      <div className="mt2 pt2 border-top border-white">
        <button type="button" className="btn btn-primary bg-white navy">
          Save as PDF
        </button>
      </div>
    </div>
  </div>
);

Sidebar.propTypes = {
  activities: PropTypes.array.isRequired,
  place: PropTypes.object.isRequired
};

export default Sidebar;
