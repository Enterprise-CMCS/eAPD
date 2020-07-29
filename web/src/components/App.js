import React from 'react';

import Routes from './Routes';
import Wrapper from './Wrapper';
import Broadcast from './Broadcast';
import AriaAnnounce from '../containers/AriaAnnounce';
import AuthChecker from '../containers/AuthChecker';
import ScrollToElement from "./ScrollToElement"

const App = () => (
  <Wrapper>
    <AriaAnnounce />
    <Broadcast />
    <ScrollToElement />
    <AuthChecker>
      <Routes />
    </AuthChecker>
  </Wrapper>
);

export default App;
