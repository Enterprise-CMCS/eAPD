import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import TagManager from 'react-gtm-module';
import { setLatestActivity } from '../actions/auth';

import App from './App';

// Set up Google Tag Manager
const tagManagerArgs = {
  gtmId: 'GTM-M56ZTV4'
};
TagManager.initialize(tagManagerArgs);

const Root = ({ history, store }) => {
  window.dataLayer.push({
    event: 'pageview'
  });

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

export default Root;
