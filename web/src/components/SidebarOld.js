import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const routes = [
  { path: '/hello', name: 'Hello' },
  { path: '/poc', name: 'PoC' }
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
