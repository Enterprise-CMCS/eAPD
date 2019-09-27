import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ApdPreviousActivityTableMMIS from './ApdPreviousActivityTableMMIS';
import { EDIT_APD } from '../actions/editApd';

const mockStore = configureStore([thunk]);

describe('apd previous activity table, mmis component', () => {
  const state = {
    apd: {
      data: {
        previousActivityExpenses: {
          '1': {
            mmis: {
              90: {
                federalActual: 10,
                totalApproved: 20
              },
              75: {
                federalActual: 30,
                totalApproved: 40
              },
              50: {
                federalActual: 50,
                totalApproved: 60
              }
            }
          },
          '2': {
            mmis: {
              90: {
                federalActual: 100,
                totalApproved: 200
              },
              75: {
                federalActual: 300,
                totalApproved: 400
              },
              50: {
                federalActual: 500,
                totalApproved: 600
              }
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
          <ApdPreviousActivityTableMMIS />
        </Provider>
      )
    ).toMatchSnapshot();
  });

  test('dispatches on a change', () => {
    mount(
      <Provider store={store}>
        <ApdPreviousActivityTableMMIS />
      </Provider>
    )
      .find('DollarField[name="approved-total-mmis90-1"]')
      .prop('onChange')({ target: { value: 'new value' } });

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/previousActivityExpenses/1/mmis/90/totalApproved',
        value: 'new value'
      }
    ]);
  });
});
