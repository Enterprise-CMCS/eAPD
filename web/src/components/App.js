import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Container, NavLink, Provider, Toolbar } from 'rebass';

import Demo from './Demo';
import DevTools from './DevTools';
import Hello from './Hello';
import Home from '../containers/Home';

const App = () => (
  <Provider>
    <Toolbar bg="black">
      <NavLink to="/" is={Link}>
        CMS HITECH APD
      </NavLink>
      <NavLink to="/" is={Link} ml="auto">
        Home
      </NavLink>
      <NavLink to="/hello" is={Link}>
        Hello
      </NavLink>
      <NavLink to="/demo" is={Link}>
        Demo
      </NavLink>
    </Toolbar>

    <Container is="main">
      <Route exact path="/" component={Home} />
      <Route path="/hello" component={Hello} />
      <Route path="/demo" component={Demo} />
    </Container>

    {process.env.NODE_ENV !== 'production' && <DevTools />}
  </Provider>
);

export default App;
