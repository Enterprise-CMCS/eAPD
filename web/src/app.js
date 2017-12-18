import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import reducer from './reducers';
import App from './containers/App';

const middleware = [createLogger()];
const store = createStore(reducer, applyMiddleware(...middleware));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
