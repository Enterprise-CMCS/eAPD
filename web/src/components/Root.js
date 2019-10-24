import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import App from './App';
import UpgradeBrowser from './UpgradeBrowser';
import { isBrowserOutdated } from '../util/browser';

const Root = ({ history, store }) => {
  
  return (
    <Provider store={store}>
    { isBrowserOutdated() && <UpgradeBrowser /> }
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
