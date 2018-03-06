import React from 'react';
import { Route as PublicRoute, Switch } from 'react-router-dom';

import routes from '../routes';
import PrivateRoute from '../containers/PrivateRoute';

const Routes = () => (
  <Switch>
    {routes.map(({ nonPrivate, ...props }) => {
      const Route = nonPrivate ? PublicRoute : PrivateRoute;
      // eslint-disable-next-line react/prop-types
      return <Route key={props.path || 'no-match'} {...props} />;
    })}
  </Switch>
);

export default Routes;
