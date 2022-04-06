import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

const decoratorWithProvider = ({ initialState = {} } = {}) => {
  const store = {
    getState: () => {
      return initialState;
    },
    subscribe: () => 0,
    unsubscribe: () => 0,
    dispatch: action('dispatch')
  };
  return {
    decorators: [story => <Provider store={store}>{story()}</Provider>],
    store
  };
};

const decoratorWithRouter = ({ initialHistory = ['/'] } = {}) => {
  const history = createMemoryHistory({ initialEntries: initialHistory });
  return {
    decorators: [
      story => <ConnectedRouter history={history}>{story()}</ConnectedRouter>
    ],
    history
  };
};

const decoratorWithProviderAndRouter = ({
  initialState = {},
  initialHistory = ['/']
} = {}) => {
  const store = {
    getState: () => {
      return initialState;
    },
    subscribe: () => 0,
    dispatch: action('dispatch')
  };
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

export {
  decoratorWithProvider,
  decoratorWithRouter,
  decoratorWithProviderAndRouter
};
