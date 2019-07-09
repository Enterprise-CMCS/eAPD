import React from 'react';

import Routes from './Routes';
import Wrapper from './Wrapper';
import AuthChecker from '../containers/AuthChecker';
import IdleLogout from '../containers/IdleLogout';

const App = () => (
  <Wrapper isDev={process.env.NODE_ENV !== 'production'}>
    <IdleLogout />
    <AuthChecker>
      <Routes />
    </AuthChecker>
  </Wrapper>
);

export default App;
