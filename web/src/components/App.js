import React from 'react';

import Routes from './Routes';
import Wrapper from './Wrapper';
import AuthChecker from '../containers/AuthChecker';
import Notification from '../containers/Notification';

const App = () => (
  <Wrapper isDev={process.env.NODE_ENV !== 'production'}>
    <AuthChecker>
      <Routes />
    </AuthChecker>
    <Notification />
  </Wrapper>
);

export default App;
