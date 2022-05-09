import PropTypes from 'prop-types';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routeCreator from './activityRoutesList';

const ActivityRoutes = ({ activityIndex }) => {
  const routes = routeCreator(activityIndex);

  return (
    <Switch>
      {routes.map(({ path, children, ...routeProps }) => (
        <Route key={path} path={path} {...routeProps}>
          {children}
        </Route>
      ))}
    </Switch>
  );
};

ActivityRoutes.propTypes = {
  activityIndex: PropTypes.number.isRequired
};

export default ActivityRoutes;
