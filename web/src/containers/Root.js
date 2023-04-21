import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { setLatestActivity } from '../redux/actions/auth';

import App from './App';

const Root = ({ history, store }) => {
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
