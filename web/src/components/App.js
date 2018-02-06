import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Container, NavLink, Provider, Toolbar } from 'rebass';

import Demo from './Demo';
import DevProvider from './DevProvider';
import NoMatch from './NoMatch';
import ActivitiesStart from '../containers/ActivitiesStart';
import ActivitiesList from '../containers/ActivitiesList';
import ApdOverview from '../containers/ApdOverview';
import StateContacts from '../containers/StateContacts';
import StateStart from '../containers/StateStart';
import StatePersonnel from '../containers/StatePersonnel';
import GoalsAndObjectives from '../containers/GoalsAndObjectives';

const Wrapper = process.env.NODE_ENV !== 'production' ? DevProvider : Provider;

const App = () => (
  <Wrapper>
    <Toolbar bg="black">
      <NavLink to="/" is={Link}>
        CMS HITECH APD
      </NavLink>
      <NavLink to="/state-start" is={Link} ml="auto">
        Get started
      </NavLink>
    </Toolbar>

    <Container is="main">
      <Switch>
        <Route exact path="/" component={Demo} />
        <Route path="/activities-start" component={ActivitiesStart} />
        <Route path="/activities-list" component={ActivitiesList} />
        <Route path="/apd-overview" component={ApdOverview} />
        <Route path="/state-start" component={StateStart} />
        <Route path="/state-contacts" component={StateContacts} />
        <Route path="/state-personnel" component={StatePersonnel} />
        <Route path="/goals-and-objectives" component={GoalsAndObjectives} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </Wrapper>
);

export default App;
