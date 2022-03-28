import React from 'react';
import { Route as PublicRoute, Switch } from 'react-router-dom';

import routes from './routes';
import AdminRoute from './admin/AdminRoute';
import PrivateRoute from '../containers/PrivateRoute';

const Routes = () => (
  <Switch>
    {routes.map(({ isAdmin, isPublic, path, ...routeProps }) => {
      const key = path || 'no-match';
      if (isPublic) {
        return <PublicRoute key={key} path={path} {...routeProps} />;
      }
      if (isAdmin) {
        return <AdminRoute key={key} path={path} {...routeProps} />;
      }
      return <PrivateRoute key={key} path={path} {...routeProps} />;
    })}
  </Switch>
);

export default Routes;
