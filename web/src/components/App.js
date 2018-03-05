import React from 'react';

import Routes from './Routes';
import Wrapper from './Wrapper';
import AuthChecker from '../containers/AuthChecker';
import TopNav from '../containers/TopNav';

const App = () => (
  <Wrapper>
    <AuthChecker>
      <TopNav />
      <Routes />
    </AuthChecker>
  </Wrapper>
);

export default App;
