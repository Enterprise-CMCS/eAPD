import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Container, NavLink, Provider, Toolbar } from 'rebass';

import Hello from '../components/Hello';
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
    </Toolbar>

    <Container is="main">
      <Route exact path="/" component={Home} />
      <Route path="/hello" component={Hello} />
    </Container>
  </Provider>
);

export default App;
