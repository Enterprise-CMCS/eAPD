import PropTypes from 'prop-types';
import React from 'react';

import SidebarLink from './SidebarLink';
import { activityDisplay } from '../util';

const Sidebar = ({ activities, place }) => (
  <div className="site-sidebar bg-navy">
    <div className="p2 xs-hide sm-hide">
      <div className="mb2 center">
        <img
          src={`/static/img/${place.id}.svg`}
          alt={place.name}
          width="60"
          height="60"
        />
      </div>
      <ul className="list-reset h5">
        <SidebarLink>Program Summary</SidebarLink>
        <SidebarLink>Results of Previous Activities</SidebarLink>
        <SidebarLink>Program Activities</SidebarLink>
        <ul className="mb0 ml2 list-reset">
          {activities.map((a, i) => (
            <SidebarLink key={a.id}>{activityDisplay(a, i + 1)}</SidebarLink>
          ))}
        </ul>
        <SidebarLink>Proposed Budget</SidebarLink>
        <SidebarLink>Assurances and Compliance</SidebarLink>
        <SidebarLink>Executive/Overall Summary</SidebarLink>
        <SidebarLink>Certify and Submit</SidebarLink>
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
