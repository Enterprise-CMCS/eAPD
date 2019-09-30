import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import IncentivePayments from './IncentivePayments';
import { EDIT_APD } from '../actions/editApd';

const mockStore = configureStore([thunk]);

describe('incentive payments component', () => {
  const state = {
    apd: {
      data: {
        incentivePayments: {
          ehAmt: { '1': [1, 2, 3, 4], '2': [5, 6, 7, 8] },
          ehCt: { '1': [9, 10, 11, 12], '2': [13, 14, 15, 16] },
          epAmt: { '1': [17, 18, 19, 20], '2': [21, 22, 23, 24] },
          epCt: { '1': [25, 26, 27, 28], '2': [29, 30, 31, 32] }
        },
        years: ['1', '2']
      }
    }
  };

  const store = mockStore(state);

  beforeEach(() => {
    store.clearActions();
  });

  it('renders correctly', () => {
    const component = mount(
      <Provider store={store}>
        <IncentivePayments />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it('handles changes', () => {
    const component = mount(
      <Provider store={store}>
        <IncentivePayments />
      </Provider>
    );

    const types = ['ehAmt', 'ehCt', 'epAmt', 'epCt'];
    const years = ['1', '2'];

    component.find('InputHolder').forEach((c, i) => {
      c.prop('onChange')({ target: { value: 99 } });

      const q = (i % 4) + 1;
      const year =
        years[Math.floor(Math.floor(i / 4) / types.length) % years.length];
      const type = types[Math.floor(i / 4) % types.length];

      expect(store.getActions()).toEqual([
        {
          type: EDIT_APD,
          path: `/incentivePayments/${type}/${year}/${q}`,
          value: 99
        }
      ]);
    });
  });
});
