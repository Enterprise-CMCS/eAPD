import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ApdSummary from './ApdSummary';
import { UPDATE_BUDGET } from '../actions/apd';
import { ADD_APD_YEAR, EDIT_APD, REMOVE_APD_YEAR } from '../actions/editApd';

const mockStore = configureStore([thunk]);

jest.mock('../components/RichText');

describe('apd summary component', () => {
  const state = {
    apd: {
      data: {
        narrativeHIE: 'about hie',
        narrativeHIT: 'about hit',
        narrativeMMIS: 'about mmis',
        programOverview: 'about the program',
        yearOptions: ['1', '2', '3'],
        years: ['1', '2']
      }
    }
  };
  const store = mockStore(state);

  beforeEach(() => {
    store.clearActions();
  });

  test('renders correctly', () => {
    expect(
      mount(
        <Provider store={store}>
          <ApdSummary />
        </Provider>
      )
    ).toMatchSnapshot();
  });

  test('dispatches on text change', () => {
    mount(
      <Provider store={store}>
        <ApdSummary />
      </Provider>
    )
      .find('RichText')
      .at(0)
      .prop('onSync')('this is some html');

    // this one is based on knowledge that the program overview comes first
    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/programOverview',
        value: 'this is some html'
      }
    ]);
  });

  test('dispatches when adding a year', () => {
    // add a year
    mount(
      <Provider store={store}>
        <ApdSummary />
      </Provider>
    )
      .find('ChoiceComponent[value="3"]')
      .prop('onChange')({ target: { value: '3' } });
    expect(store.getActions()).toEqual([
      { type: ADD_APD_YEAR, value: '3', state },
      { type: UPDATE_BUDGET, state }
    ]);
  });

  test('dispatches when removing a year', () => {
    // remove a year
    mount(
      <Provider store={store}>
        <ApdSummary />
      </Provider>
    )
      .find('ChoiceComponent[value="2"]')
      .prop('onChange')({ target: { value: '2' } });
    expect(store.getActions()).toEqual([
      { type: REMOVE_APD_YEAR, value: '2', state },
      { type: UPDATE_BUDGET, state }
    ]);
  });
});
