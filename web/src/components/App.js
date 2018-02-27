import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Hello from './Hello';
import NoMatch from './NoMatch';
import Wrapper from './Wrapper';
import SubmissionSuccess from './SubmissionSuccess';
import ActivitiesStart from '../containers/ActivitiesStart';
import ActivitiesList from '../containers/ActivitiesList';
import ActivityApproach from '../containers/ActivityApproach';
import ActivityExpensesDetails from '../containers/ActivityExpensesDetails';
import ActivityExpensesList from '../containers/ActivityExpensesList';
import ActivityExpensesStart from '../containers/ActivityExpensesStart';
import ActivityGoals from '../containers/ActivityGoals';
import ActivityOverview from '../containers/ActivityOverview';
import ActivitySchedule from '../containers/ActivitySchedule';
import ApdOverview from '../containers/ApdOverview';
import Login from '../containers/Login';
import PrivateRoute from '../containers/PrivateRoute';
import ReviewAndSubmit from '../containers/ReviewAndSubmit';
import StateContacts from '../containers/StateContacts';
import StateStart from '../containers/StateStart';
import StatePersonnel from '../containers/StatePersonnel';
import TopNav from '../containers/TopNav';

const App = () => (
  <Wrapper>
    <TopNav />

    <div className="container p2">
      <Switch>
        <Route exact path="/" component={Hello} />
        <Route path="/login" component={Login} />

        <PrivateRoute path="/activities-list" component={ActivitiesList} />
        <PrivateRoute path="/activities-start" component={ActivitiesStart} />
        <PrivateRoute path="/activity-approach" component={ActivityApproach} />
        <PrivateRoute path="/activity-goals" component={ActivityGoals} />
        <PrivateRoute path="/activity-overview" component={ActivityOverview} />
        <PrivateRoute path="/activity-schedule" component={ActivitySchedule} />
        <PrivateRoute path="/apd-overview" component={ApdOverview} />
        <PrivateRoute
          path="/expenses-start"
          component={ActivityExpensesStart}
        />
        <PrivateRoute path="/expenses-list" component={ActivityExpensesList} />
        <PrivateRoute
          path="/expenses-details"
          component={ActivityExpensesDetails}
        />
        <PrivateRoute path="/review-and-submit" component={ReviewAndSubmit} />
        <PrivateRoute path="/state-contacts" component={StateContacts} />
        <PrivateRoute path="/state-personnel" component={StatePersonnel} />
        <PrivateRoute path="/state-start" component={StateStart} />
        <PrivateRoute
          path="/submission-success"
          component={SubmissionSuccess}
        />

        <Route component={NoMatch} />
      </Switch>
    </div>
  </Wrapper>
);

export default App;
