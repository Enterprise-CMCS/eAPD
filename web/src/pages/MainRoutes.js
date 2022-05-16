import React from 'react';
import { Route as PublicRoute, Switch } from 'react-router-dom';

import routes from './mainRoutesList';
import AdminRoute from './admin/AdminRoute';
import PrivateRoute from '../components/PrivateRoute';

const MainRoutes = () => (
  <Switch>
    {routes.map(({ isAdmin, isPublic, children, path, ...routeProps }) => {
      const key = path || 'no-match';
      if (isPublic) {
        return (
          <PublicRoute key={key} path={path} {...routeProps}>
            {children}
          </PublicRoute>
        );
      }
      if (isAdmin) {
        return (
          <AdminRoute key={key} path={path} {...routeProps}>
            {children}
          </AdminRoute>
        );
      }
      return (
        <PrivateRoute key={key} path={path} {...routeProps}>
          {children}
        </PrivateRoute>
      );
    })}
  </Switch>
);

export default MainRoutes;
