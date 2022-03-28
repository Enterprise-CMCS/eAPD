import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch as actualUseRouteMatch
} from 'react-router-dom';

import ApdHeader from '../../layout/header/ApdHeader';
import Activities from './activities/activities-dashboard/ActivitiesDashboard';
import EntryPage from '../../containers/activity/EntryPage';
import AssurancesAndCompliance from './assurances-and-compliance/AssurancesAndCompliance';
import Export from './export/ApdExport';
import ApdOverview from './apd-overview/ApdOverview';
import ExecutiveSummary from './executive-summary/ExecutiveSummary';
import PreviousActivities from './previous-activities/PreviousActivities';
import ProposedBudget from './proposed-budget/ProposedBudget';
import ScheduleSummary from './schedule-summary/ScheduleSummary';
import KeyStatePersonnel from './key-state-personnel/KeyStatePersonnel';

const ApdPageRoutes = ({ apdId, useRouteMatch }) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/activity/:activityIndex`}>
        <EntryPage />
      </Route>

      <Route path={path}>
        <ApdHeader />

        <Route exact path={path}>
          <Redirect to={`/apd/${apdId}/apd-overview`} />
        </Route>

        <Route path={`${path}/state-profile`}>
          <KeyStatePersonnel />
        </Route>

        <Route path={`${path}/apd-overview`}>
          <ApdOverview />
        </Route>

        <Route path={`${path}/previous-activities`}>
          <PreviousActivities />
        </Route>

        <Route path={`${path}/activities`}>
          <Activities />
        </Route>

        <Route path={`${path}/schedule-summary`}>
          <ScheduleSummary />
        </Route>

        <Route path={`${path}/proposed-budget`}>
          <ProposedBudget />
        </Route>

        <Route path={`${path}/assurances-and-compliance`}>
          <AssurancesAndCompliance />
        </Route>

        <Route path={`${path}/executive-summary`}>
          <ExecutiveSummary />
        </Route>

        <Route path={`${path}/export`}>
          <Export />
        </Route>
      </Route>
    </Switch>
  );
};

ApdPageRoutes.propTypes = {
  apdId: PropTypes.string,
  useRouteMatch: PropTypes.func
};

ApdPageRoutes.defaultProps = {
  apdId: null,
  useRouteMatch: actualUseRouteMatch
};

export default ApdPageRoutes;
