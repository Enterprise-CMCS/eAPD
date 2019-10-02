import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Activities from './All';

const mockStore = configureStore([thunk]);

// Mock out the EntryDetails, so it doesn't get pulled into these tests
jest.mock('./EntryDetails');
require('./EntryDetails').default.mockImplementation(() => null);

describe('the Activities component', () => {
  const state = {
    apd: {
      data: {
        activities: ['activity 1', 'activity 2', 'activity 3']
      }
    }
  };

  const store = mockStore(state);

  beforeEach(() => {
    store.clearActions();
  });

  test('renders correctly', () => {
    const component = mount(
      <Provider store={store}>
        <Activities />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
