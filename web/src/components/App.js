import React from 'react';

import Routes from './Routes';
import Wrapper from './Wrapper';
import Broadcast from './Broadcast';
import AriaAnnounce from '../containers/AriaAnnounce';
import AuthChecker from '../containers/AuthChecker';
import AutoScrollToElement from './AutoScrollToElement';

const App = () => (
  <Wrapper>
    <AriaAnnounce />
    <Broadcast />
    <AutoScrollToElement />
    <AuthChecker>
      <Routes />
    </AuthChecker>
  </Wrapper>
);

export default App;
