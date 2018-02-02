import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Container, NavLink, Provider, Toolbar } from 'rebass';

import Demo from './Demo';
import DevProvider from './DevProvider';
import ActivitiesStart from '../containers/ActivitiesStart';
import ApdOverview from '../containers/ApdOverview';
import StateContacts from '../containers/StateContacts';
import StateStart from '../containers/StateStart';
import StatePersonnel from '../containers/StatePersonnel';

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
      <Route exact path="/" component={Demo} />
      <Route path="/activities-start" component={ActivitiesStart} />
      <Route path="/apd-overview" component={ApdOverview} />
      <Route path="/state-start" component={StateStart} />
      <Route path="/state-contacts" component={StateContacts} />
      <Route path="/state-personnel" component={StatePersonnel} />
    </Container>
  </Wrapper>
);

export default App;
