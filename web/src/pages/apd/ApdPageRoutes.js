import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import ApdHeader from '../../layout/header/ApdHeader';
import EntryPage from './activities/overview/ActivityOverview';
import routes from './apdRoutesList';

const ApdPageRoutes = ({ apdId }) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/activity/:activityIndex`}>
        <ApdHeader />
        <EntryPage />
      </Route>

      <Route path={path}>
        <ApdHeader />

        <Route exact path={path}>
          <Redirect to={`/apd/${apdId}/apd-overview`} />
        </Route>

        {routes.map(({ path, children, ...routeProps }) => (
          <Route key={path} path={path} {...routeProps}>
            {children}
          </Route>
        ))}
      </Route>
    </Switch>
  );
};

ApdPageRoutes.propTypes = {
  apdId: PropTypes.string
};

ApdPageRoutes.defaultProps = {
  apdId: null
};

export default ApdPageRoutes;
