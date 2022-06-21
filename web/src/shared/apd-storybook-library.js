import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

export const createMockStore = (initialState = {}) => {
  return {
    getState: () => {
      return initialState;
    },
    subscribe: () => 0,
    unsubscribe: () => 0,
    dispatch: action('dispatch')
  };
};

export const renderWithProvider = ({ initialState = {}, story }) => {
  const store = createMockStore(initialState);
  return <Provider store={store}>{story()}</Provider>;
};

export const decoratorWithProvider = ({ initialState = {} } = {}) => {
  const store = createMockStore(initialState);
  return {
    decorators: [story => <Provider store={store}>{story()}</Provider>],
    store
  };
};

export const decoratorWithRouter = ({ initialHistory = ['/'] } = {}) => {
  const history = createMemoryHistory({ initialEntries: initialHistory });
  return {
    decorators: [
      story => <ConnectedRouter history={history}>{story()}</ConnectedRouter>
    ],
    history
  };
};

export const renderWithProviderAndRouter = ({
  initialState = {},
  initialHistory = ['/'],
  story
}) => {
  const store = createMockStore(initialState);
  const history = createMemoryHistory({ initialEntries: initialHistory });
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{story()}</ConnectedRouter>
    </Provider>
  );
};

export const decoratorWithProviderAndRouter = ({
  initialState = {},
  initialHistory = ['/']
} = {}) => {
  const store = createMockStore(initialState);
  const history = createMemoryHistory({ initialEntries: initialHistory });
  return {
    decorators: [
      story => (
        <Provider store={store}>
          <ConnectedRouter history={history}>{story()}</ConnectedRouter>
        </Provider>
      )
    ],
    store,
    history
  };
};
