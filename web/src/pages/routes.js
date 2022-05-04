import React, { useEffect } from 'react';
import { Route as PublicRoute, Switch, useLocation } from 'react-router-dom';

import routes from './routesList';
import AdminRoute from './admin/AdminRoute';
import PrivateRoute from '../components/PrivateRoute';
import { pageView } from '../util/analytics';

const Routes = () => {
  const location = useLocation();

  useEffect(() => {
    pageView(location.pathname);
  }, [location, location.pathname]);

  return (
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
};

export default Routes;
