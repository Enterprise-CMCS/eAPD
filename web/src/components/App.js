import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Container, NavLink, Provider, Toolbar } from 'rebass';

import Demo from './Demo';
import DevProvider from './DevProvider';
import StateContacts from '../containers/StateContacts';
import StateStart from '../containers/StateStart';

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
      <Route path="/state-start" component={StateStart} />
      <Route path="/state-contacts" component={StateContacts} />
    </Container>
  </Wrapper>
);

export default App;
