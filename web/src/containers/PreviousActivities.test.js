import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import PreviousActivities from './PreviousActivities';
import { EDIT_APD } from '../actions/editApd';

// The rich text editor explodes in Enzyme - literally it exhausts v8's memory
// and crashes. So we can mock it to a do-nothing, since we're not actually
// interested in testing it here.
jest.mock('../components/RichText');

// Also mock out these tables, because we don't want to test them here.
jest.mock('./ApdPreviousActivityTable');
jest.mock('./ApdPreviousActivityTableMMIS');
jest.mock('./ApdPreviousActivityTableTotal');

const mockStore = configureStore([thunk]);

describe('previous activities component', () => {
  const store = mockStore({
    apd: { data: { previousActivitySummary: 'bob' } }
  });

  beforeEach(() => {
    store.clearActions();
  });

  test('renders correctly if data is not loaded', () => {
    const component = mount(
      <Provider store={store}>
        <PreviousActivities />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  test('updates on text change', () => {
    const component = mount(
      <Provider store={store}>
        <PreviousActivities />
      </Provider>
    );
    component.find('RichText').prop('onSync')('this is html');

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/previousActivitySummary',
        value: 'this is html'
      }
    ]);
  });
});
