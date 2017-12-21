import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { render } from 'react-dom';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies
// 👆 eslint complains that 'redux-logger' should be in dependencies rather
// that devDependencies, but the module is only used in development

import reducer from './reducers';
import Root from './components/Root';

const history = createHistory();

const middleware = [routerMiddleware(history)];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

render(
  <Root history={history} store={store} />,
  document.getElementById('app')
);
