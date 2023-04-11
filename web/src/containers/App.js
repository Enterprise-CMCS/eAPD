import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLDClient } from 'launchdarkly-react-client-sdk';

import Routes from '../pages/MainRoutes';
import Wrapper from '../components/Wrapper';
import Broadcast from '../components/Broadcast';
import AriaAnnounce from '../components/AriaAnnounce';
import AutoScrollToElement from '../components/AutoScrollToElement';

const App = () => {
  const ldClient = useLDClient();
  const username = useSelector(state => state?.user?.data?.username || '');

  useEffect(() => {
    ldClient?.identify({ kind: 'user', key: username, name: username });
  }, [username, ldClient]);

  return (
    <Wrapper>
      <AriaAnnounce />
      <Broadcast />
      <AutoScrollToElement />
      <Routes />
    </Wrapper>
  );
};

export default App;
