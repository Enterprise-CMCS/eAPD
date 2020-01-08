import React from 'react';

import Routes from './Routes';
import Wrapper from './Wrapper';
import Broadcast from './Broadcast';
import AriaAnnounce from '../containers/AriaAnnounce';
import AuthChecker from '../containers/AuthChecker';
import IdleLogout from '../containers/IdleLogout';

const App = () => (
  <Wrapper>
    <AriaAnnounce />
    <Broadcast />
    <IdleLogout />
    <AuthChecker>
      <Routes />
    </AuthChecker>
  </Wrapper>
);

export default App;
