import PropTypes from 'prop-types';
import React from 'react';
import { Link as RRLink, withRouter } from 'react-router-dom';
import { Box, Link } from 'rebass';

const routes = [
  { path: '/state-start', name: 'State set-up' },
  { path: '/state-contacts', name: 'State set-up 2' },
  { path: '/apd-overview', name: 'Program overview' },
  { path: '/activities-start', name: 'Select activities' },
  { path: '/activities-list', name: 'Activity list' },
  { path: '/activity-overview', name: 'Activity overview' },
  { path: '/activity-goals', name: 'Activity goals' },
  { path: '/activity-approach', name: 'Activity approach' },
  { path: '/activity-schedule', name: 'Activity schedule' },
  { path: '/state-personnel', name: 'Personnel' },
  { path: '/expenses-start', name: 'Select expenses' },
  { path: '/expenses-list', name: 'Expense list' },
  { path: '/expenses-details', name: 'Expense details' },
  { path: '/review-and-submit', name: 'Program summary' }
];

const Sidebar = ({ match }) => (
  <Box py={4}>
    <ul className="list-reset">
      {routes.map(({ path, name }) => (
        <li key={path}>
          <Link
            className={match.path === path ? 'bold' : ''}
            to={path}
            is={RRLink}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </Box>
);

Sidebar.propTypes = {
  match: PropTypes.object.isRequired
};

export { Sidebar as SidebarPure };
export default withRouter(Sidebar);
