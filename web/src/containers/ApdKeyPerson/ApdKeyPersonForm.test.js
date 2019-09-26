import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import KeyPersonForm from './ApdKeyPersonForm';
import { UPDATE_BUDGET } from '../../actions/apd';
import { EDIT_APD } from '../../actions/editApd';

const mockStore = configureStore([thunk]);

describe('the ApdKeyPersonForm component', () => {
  const props = {
    index: 1,
    item: {
      costs: {
        '1992': 100,
        '1993': 300
      },
      email: 'email address',
      hasCosts: true,
      key: 'person key',
      name: 'Bob the Builder',
      percentTime: '32',
      position: 'The Builder'
    },
    years: ['1992', '1993']
  };

  const store = mockStore('old state');

  const component = mount(
    <Provider store={store}>
      <KeyPersonForm {...props} />
    </Provider>
  );

  beforeEach(() => {
    store.clearActions();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders correctly if the person does not have costs', () => {
    expect(
      mount(
        <Provider store={store}>
          <KeyPersonForm {...props} item={{ ...props.item, hasCosts: false }} />
        </Provider>
      )
    ).toMatchSnapshot();
  });

  describe('events', () => {
    [
      ['apd-state-profile-pocname1', '/keyPersonnel/1/name'],
      ['apd-state-profile-pocemail1', '/keyPersonnel/1/email'],
      ['apd-state-profile-pocposition1', '/keyPersonnel/1/position'],
      ['apd-state-profile-pocpercentTime1', '/keyPersonnel/1/percentTime']
    ].forEach(([formName, path]) => {
      it(`handles changing the ${path}`, () => {
        component
          .findWhere(c => c.prop('name') === formName)
          .first()
          .prop('onChange')({ target: { value: 'new value' } });

        expect(store.getActions()).toEqual([
          { type: EDIT_APD, path, value: 'new value' }
        ]);
      });
    });

    it('handles toggling hasCosts off', () => {
      component
        .findWhere(
          c => c.name() === 'ChoiceComponent' && c.prop('value') === 'no'
        )
        .prop('onChange')();

      expect(store.getActions()).toEqual([
        {
          type: EDIT_APD,
          path: '/keyPersonnel/1/hasCosts',
          value: false
        },
        {
          type: UPDATE_BUDGET,
          state: 'old state'
        }
      ]);
    });

    it('handles toggling hasCosts on', () => {
      component
        .findWhere(
          c => c.name() === 'ChoiceComponent' && c.prop('value') === 'yes'
        )
        .prop('onChange')();

      expect(store.getActions()).toEqual([
        {
          type: EDIT_APD,
          path: '/keyPersonnel/1/hasCosts',
          value: true
        },
        {
          type: UPDATE_BUDGET,
          state: 'old state'
        }
      ]);
    });

    it('handles changing cost for FFY', () => {
      const hasCostsForm = mount(
        component
          .findWhere(
            c => c.name() === 'ChoiceComponent' && c.prop('value') === 'yes'
          )
          .prop('checkedChildren')
      );

      hasCostsForm
        .find('DollarField')
        .first()
        .prop('onChange')({ target: { value: 9000 } });

      expect(store.getActions()).toEqual([
        {
          type: EDIT_APD,
          path: '/keyPersonnel/1/costs/1992',
          value: 9000
        },
        {
          type: UPDATE_BUDGET,
          state: 'old state'
        }
      ]);
    });
  });
});
