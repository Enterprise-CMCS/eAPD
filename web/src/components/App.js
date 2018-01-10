import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Container, NavLink, Provider, Toolbar } from 'rebass';

import Demo from './Demo';
import DevProvider from './DevProvider';
import Personnel from './Personnel';
import Hello from './Hello';

const Wrapper = process.env.NODE_ENV !== 'production' ? DevProvider : Provider;

const App = () => (
  <Wrapper>
    <Toolbar mb={4} bg="black">
      <NavLink to="/" is={Link}>
        CMS HITECH APD
      </NavLink>
      <NavLink to="/" is={Link} ml="auto">
        Home
      </NavLink>
      <NavLink to="/poc" is={Link}>
        PoC
      </NavLink>
    </Toolbar>

    <Container is="main">
      <Route exact path="/" component={Hello} />
      <Route path="/poc" component={Personnel} />
      <Route path="/demo" component={Demo} />
    </Container>
  </Wrapper>
);

export default App;
