import 'babel-polyfill';

import createHistory from 'history/createBrowserHistory';
import React from 'react';
import 'react-dates/initialize';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';

import { initI18n } from './i18n';
import reducer from './reducers';
import Root from './components/Root';

import './styles/index.css';

// Set locale based on browser language
// if it matches one of our SUPPORTED_LOCALES
// otherwise, set to DEFAULT_LOCALE ("en")
initI18n();

const history = createHistory();

const middleware = [thunk, routerMiddleware(history), createLogger()];

const store = createStore(reducer, applyMiddleware(...middleware));

const render = (Component, props) => {
  ReactDOM.render(
    <AppContainer>
      <Component {...props} />
    </AppContainer>,
    document.getElementById('app')
  );
};

module.hot.accept('./components/Root.js', () => {
  const HotRoot = require('./components/Root').default; // eslint-disable-line global-require
  render(HotRoot, { history, store });
});

render(Root, { history, store });
