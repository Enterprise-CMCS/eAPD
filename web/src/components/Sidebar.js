import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const routes = [
  { path: '/state-start', name: 'State set-up' },
  { path: '/state-contacts', name: 'State set-up 2' },
  { path: '/apd-overview', name: 'Program overview' },
  { path: '/activities-start', name: 'Select activities' },
  { path: '/activities-list', name: 'Activity list' },
  { path: '/activity-overview/:activityName', name: 'Activity overview' },
  { path: '/activity-goals/:activityName', name: 'Activity goals' },
  { path: '/activity-approach/:activityName', name: 'Activity approach' },
  { path: '/activity-schedule', name: 'Activity schedule' },
  { path: '/state-personnel', name: 'Personnel' },
  { path: '/expenses-start', name: 'Select expenses' },
  { path: '/expenses-list', name: 'Expense list' },
  { path: '/expenses-details', name: 'Expense details' },
  { path: '/review-and-submit', name: 'Program summary' }
];

const linkClass = (path, curr) => {
  let cls = 'inline-block white text-decoration-none';
  if (path === curr) cls += ' bold border-bottom border-width-3 border-blue';
  return cls;
};

const Sidebar = ({ match }) => (
  <div className="p2 xs-hide sm-hide">
    <ul className="list-reset">
      {routes.map(({ path, name }) => (
        <li key={path} className="mb1">
          <Link to={path} className={linkClass(path, match.path)}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

Sidebar.propTypes = {
  match: PropTypes.object.isRequired
};

export { Sidebar as SidebarPure };
export default withRouter(Sidebar);
