import React from 'react';
import { Provider } from 'react-redux';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

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
const wrapConnection = (ui, renderOptions = {}) => {
  const {
    initialHistory = ['/'],
    history = createMemoryHistory({ initialEntries: initialHistory }),
    initialState = undefined,
    enhancer = applyMiddleware(routerMiddleware(history), thunk),
    store = configureStore({
      reducer: reducer(history),
      preloadedState: initialState,
      enhancers: enhancer
    }),
    ...options
  } = renderOptions;
  return (
    (
      <Provider store={store}>
        <ConnectedRouter history={history}>{ui}</ConnectedRouter>
      </Provider>
    ),
    options
  );
};

export { wrapConnection };
