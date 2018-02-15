import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Provider } from 'rebass';

import Demo from './Demo';
import DevProvider from './DevProvider';
import NoMatch from './NoMatch';
import ActivitiesStart from '../containers/ActivitiesStart';
import ActivitiesList from '../containers/ActivitiesList';
import ActivityApproach from '../containers/ActivityApproach';
import ActivityGoals from '../containers/ActivityGoals';
import ActivityOverview from '../containers/ActivityOverview';
import ApdOverview from '../containers/ApdOverview';
import Login from '../containers/Login';
import StateContacts from '../containers/StateContacts';
import StateStart from '../containers/StateStart';
import StatePersonnel from '../containers/StatePersonnel';
import TopNav from '../containers/TopNav';
import ActivitySchedule from '../containers/ActivitySchedule';
import Expenses from '../containers/Expenses';

const Wrapper = process.env.NODE_ENV !== 'production' ? DevProvider : Provider;

const App = () => (
  <Wrapper>
    <TopNav />

    <Container>
      <Switch>
        <Route exact path="/" component={Demo} />
        <Route path="/login" component={Login} />

        <Route path="/activities-list" component={ActivitiesList} />
        <Route path="/activities-start" component={ActivitiesStart} />
        <Route path="/activity-approach" component={ActivityApproach} />
        <Route path="/activity-goals" component={ActivityGoals} />
        <Route path="/activity-overview" component={ActivityOverview} />
        <Route path="/activity-schedule" component={ActivitySchedule} />
        <Route path="/apd-overview" component={ApdOverview} />
        <Route path="/expenses" component={Expenses} />
        <Route path="/state-contacts" component={StateContacts} />
        <Route path="/state-personnel" component={StatePersonnel} />
        <Route path="/state-start" component={StateStart} />

        <Route component={NoMatch} />
      </Switch>
    </Container>
  </Wrapper>
);

export default App;
