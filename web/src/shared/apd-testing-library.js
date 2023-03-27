import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { render as rtlRender } from '@testing-library/react'; // eslint-disable-line import/no-extraneous-dependencies

import reducer from '../redux/reducers';

/**
 * Use this render method instead of the plain render if you are testing a connected component that uses a router.
 * @param ui - the UI component to render
 * @param renderOptions - {
 *   initialState - the initial state of the redux store, defaults to empty
 *   enhancer - any middleware to apply to the redux store, defaults to promiseMiddleware and thunk
 *   store - the redux store, defaults to a store with empty state and promiseMiddleware and thunk
 *   history - the route history, defaults to a history with only a root entry
 *   options - other options to pass onto the render function
 * }
 * @returns an option with the rendered container, the store, the history, and related react-testing-library functions
 */

const renderWithConnection = (ui, renderOptions = {}) => {
  const {
    initialHistory = ['/'],
    history = createMemoryHistory({
      initialEntries: initialHistory
    }),
    initialState = undefined,
    enhancer = applyMiddleware(routerMiddleware(history), thunk),
    store = createStore(reducer(history), initialState, enhancer),
    ...options
  } = renderOptions;

  /* this key is dynamic by default and throws off snapshot testing
   * hence why we are setting it to a fixed value here */
  history.location.key = 'fixed';

  const utils = rtlRender(
    <Provider store={store}>
      <ConnectedRouter history={history}>{ui}</ConnectedRouter>
    </Provider>,
    options
  );
  return {
    ...utils,
    rerender: (updatedUi, updatedOptions) =>
      rtlRender(
        <Provider store={store}>
          <ConnectedRouter history={history}>{updatedUi}</ConnectedRouter>
        </Provider>,
        { container: utils.container, ...updatedOptions }
      ),
    store,
    history
  };
};

/**
 * Use this render method instead of the plain render if you are testing a component that uses a router.
 * @param ui - the UI component to render
 * @param renderOptions - {
 *   history - the route history, defaults to a history with only a root entry
 *   options - other options to pass onto the render function
 * }
 * @returns an option with the rendered container, the history, and related react-testing-library functions
 */
const renderWithRouter = (ui, renderOptions = {}) => {
  const {
    initialHistory = ['/'],
    history = createMemoryHistory({ initialEntries: initialHistory }),
    ...options
  } = renderOptions;
  const utils = rtlRender(
    <ConnectedRouter history={history}>{ui}</ConnectedRouter>,
    options
  );
  return {
    ...utils,
    rerender: (updatedUi, updatedOptions) =>
      rtlRender(
        <ConnectedRouter history={history}>{updatedUi}</ConnectedRouter>,
        { container: utils.container, ...updatedOptions }
      ),
    history
  };
};

// Re-export all of the react-testing-library functions,
// so that you don't have to import both libraries
export * from '@testing-library/react'; // eslint-disable-line import/no-extraneous-dependencies
export * from 'jest-axe'; // eslint-disable-line import/no-extraneous-dependencies
export { renderWithConnection, renderWithRouter };
