import React from 'react';

import Routes from '../pages/Route';
import Wrapper from '../components/Wrapper';
import Broadcast from '../components/Broadcast';
import AriaAnnounce from '../components/AriaAnnounce';
import AutoScrollToElement from '../components/AutoScrollToElement';

const App = () => (
  <Wrapper>
    <AriaAnnounce />
    <Broadcast />
    <AutoScrollToElement />
    <Routes />
  </Wrapper>
);

export default App;
