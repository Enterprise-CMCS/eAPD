import React from 'react';

import Routes from '../pages/Route';
import Wrapper from './Wrapper';
import Broadcast from './Broadcast';
import AriaAnnounce from '../containers/AriaAnnounce';
import AutoScrollToElement from './AutoScrollToElement';

const App = () => (
  <Wrapper>
    <AriaAnnounce />
    <Broadcast />
    <AutoScrollToElement />
    <Routes />
  </Wrapper>
);

export default App;
