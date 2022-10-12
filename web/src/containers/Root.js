import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { withLDProvider, useFlags } from 'launchdarkly-react-client-sdk';

import { setLatestActivity } from '../redux/actions/auth';
import { updateFlags } from '../redux/actions/flags';

import App from './App';

const Root = ({ history, store }) => {
  // when the app opens, get all of the flags
  // update the flags you are watching here
  const { validation = true } = useFlags();

  // use the updateFlags action if a reducer needs to use a flag
  // then it can listen for the FLAGS_UPDATED type
  useEffect(() => {
    store.dispatch(updateFlags({ validation }));
  }, [validation]); // eslint-disable-line react-hooks/exhaustive-deps

  // Create listener for location changing to track activity
  history.listen(() => {
    store.dispatch(setLatestActivity());
  });

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
};

Root.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  store: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

let component;

if (process.env.LD_CLIENT_ID && process.env.LD_CLIENT_ID !== '') {
  component = withLDProvider({
    clientSideID: process.env.LD_CLIENT_ID,
    options: {
      streamUrl: 'https://clientstream.launchdarkly.us',
      baseUrl: 'https://clientsdk.launchdarkly.us',
      eventsUrl: 'https://events.launchdarkly.us'
    }
  })(Root);
} else {
  component = Root;
}
export default component;
