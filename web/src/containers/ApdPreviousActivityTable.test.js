import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ApdPreviousActivityTable from './ApdPreviousActivityTable';
import { EDIT_APD } from '../actions/editApd';

const mockStore = configureStore([thunk]);

describe('apd previous activity table, mmis component', () => {
  const state = {
    apd: {
      data: {
        previousActivityExpenses: {
          '1': {
            hithie: {
              federalActual: 10,
              totalApproved: 20
            }
          },
          '2': {
            hithie: {
              federalActual: 100,
              totalApproved: 200
            }
          }
        }
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
          <ApdPreviousActivityTable />
        </Provider>
      )
    ).toMatchSnapshot();
  });

  test('dispatches on a change', () => {
    mount(
      <Provider store={store}>
        <ApdPreviousActivityTable />
      </Provider>
    )
      .find('DollarField[name="hithie-approved-total-1"]')
      .prop('onChange')({ target: { value: 'new value' } });

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/previousActivityExpenses/1/hithie/totalApproved',
        value: 'new value'
      }
    ]);
  });
});
