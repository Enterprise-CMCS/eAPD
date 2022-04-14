/* eslint-disable import/no-import-module-exports */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@okta/okta-auth-js/polyfill';

import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';

import saveMiddleware from './saveMiddleware';
import { initI18n } from './i18n';
import reducer from './reducers';
import Root from './containers/Root';
import { browserIsRed } from './util/browser';
import { html as browserHtml } from './components/UpgradeBrowser';
import cookieHtml from './components/EnableCookies';

import './styles/index.scss';
/* eslint-enable import/no-import-module-exports */

if (browserIsRed) {
  document.getElementById('app').innerHTML = `
  <div style="margin: 30px;">
    <div class="ds-col-4 ds-c-alert ds-c-alert--error">${browserHtml}</div>
  </div>`;
} else if (!navigator.cookieEnabled) {
  document.getElementById('app').innerHTML = `
  <div style="margin: 30px;">
    <div class="ds-col-4 ds-c-alert ds-c-alert--error">${cookieHtml}</div>
  </div>`;
} else {
  // Set locale based on browser language
  // if it matches one of our SUPPORTED_LOCALES
  // otherwise, set to DEFAULT_LOCALE ("en")
  initI18n();

  const history = createBrowserHistory();

  const middleware = [
    thunk,
    routerMiddleware(history),
    createLogger(),
    saveMiddleware
  ];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  const store = createStore(
    reducer(history),
    composeEnhancers(applyMiddleware(...middleware))
  );

  const render = (Component, props) => {
    ReactDOM.render(<Component {...props} />, document.getElementById('app'));
  };

  module.hot.accept('./containers/Root.js', () => {
    const HotRoot = require('./containers/Root').default; // eslint-disable-line global-require
    render(HotRoot, { history, store });
  });

  render(Root, { history, store });
}
