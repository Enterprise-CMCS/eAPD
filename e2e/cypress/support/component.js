// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import '@testing-library/cypress/add-commands'; // eslint-disable-line import/no-extraneous-dependencies
import '../../../web/src/styles/index.scss';

import React from 'react';
import { mount } from 'cypress/react'; // eslint-disable-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../../../web/src/redux/reducers/index.js';

Cypress.Commands.add('mount', mount);

Cypress.Commands.add('mountWithConnected', (component, options = {}) => {
  const {
    initialHistory = ['/'],
    history = createMemoryHistory({ initialEntries: initialHistory }),
    initialState = undefined,
    enhancer = applyMiddleware(routerMiddleware(history), thunk),
    store = createStore(reducer(history), initialState, enhancer),
    ...mountOptions
  } = options;

  const wrapped = (
    <Provider store={store}>
      <ConnectedRouter history={history}>{component}</ConnectedRouter>
    </Provider>
  );

  return mount(wrapped, mountOptions);
});

Cypress.Commands.add('mountWithRouter', (component, options = {}) => {
  const {
    initialHistory = ['/'],
    history = createMemoryHistory({ initialEntries: initialHistory }),
    ...mountOptions
  } = options;

  const wrapped = (
    <ConnectedRouter history={history}>{component}</ConnectedRouter>
  );

  return mount(wrapped, mountOptions);
});
