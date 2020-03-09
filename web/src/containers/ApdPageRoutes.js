import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ApdHeader from './ApdHeader';
import Activities from './activity/All';
import EntryPage from './activity/EntryPage';
import AssurancesAndCompliance from './AssurancesAndCompliance';
import Export from './ApdExport';
import ApdSummary from './ApdSummary';
import ExecutiveSummary from './ExecutiveSummary';
import PreviousActivities from './PreviousActivities';
import ProposedBudget from './ProposedBudget';
import ScheduleSummary from './ScheduleSummary';
import StateProfile from '../components/ApdStateProfile';

const ApdPageRoutes = ({ ...props }) => {
  return (
    <Switch>
      <Route path="/apd/activity/:activityIndex">
        <EntryPage />
      </Route>

      <Route path="/apd">
        <ApdHeader {...props} />

        <Route exact path="/apd">
          <StateProfile />
        </Route>

        <Route path="/apd/state-profile">
          <StateProfile />
        </Route>

        <Route path="/apd/program-summary">
          <ApdSummary />
        </Route>

        <Route path="/apd/previous-activities">
          <PreviousActivities />
        </Route>

        <Route path="/apd/activities">
          <Activities />
        </Route>

        <Route path="/apd/schedule-summary">
          <ScheduleSummary />
        </Route>

        <Route path="/apd/proposed-budget">
          <ProposedBudget />
        </Route>

        <Route path="/apd/assurances-and-compliance">
          <AssurancesAndCompliance />
        </Route>

        <Route path="/apd/executive-summary">
          <ExecutiveSummary />
        </Route>

        <Route path="/apd/export">
          <Export />
        </Route>
      </Route>
    </Switch>
  );
};

export default ApdPageRoutes;
