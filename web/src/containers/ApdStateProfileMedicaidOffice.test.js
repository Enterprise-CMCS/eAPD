import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { EDIT_APD } from '../actions/editApd';

import StateProfile from './ApdStateProfileMedicaidOffice';

const mockStore = configureStore([thunk]);

describe('apd state profile, Medicaid office component', () => {
  const store = mockStore({
    apd: {
      data: {
        stateProfile: {
          medicaidDirector: {
            name: 'name',
            email: 'email',
            phone: 'phone'
          },
          medicaidOffice: {
            address1: 'address 1',
            address2: 'address 2',
            city: 'city',
            state: 'state',
            zip: 'zip'
          }
        }
      }
    },
    user: {
      data: {
        state: { id: 'mn' }
      }
    }
  });

  beforeEach(() => {
    store.clearActions();
  });

  test('renders correctly', () => {
    expect(
      mount(
        <Provider store={store}>
          <StateProfile />
        </Provider>
      )
    ).toMatchSnapshot();
  });

  [
    {
      testName: 'director name change',
      fieldName: 'apd-state-profile-mdname',
      path: '/stateProfile/medicaidDirector/name'
    },
    {
      testName: 'director email change',
      fieldName: 'apd-state-profile-mdemail',
      path: '/stateProfile/medicaidDirector/email'
    },
    {
      testName: 'director phone number change',
      fieldName: 'apd-state-profile-mdphone',
      path: '/stateProfile/medicaidDirector/phone'
    },
    {
      testName: 'office address line 1 change',
      fieldName: 'apd-state-profile-addr1',
      path: '/stateProfile/medicaidOffice/address1'
    },
    {
      testName: 'office address line 2 change',
      fieldName: 'apd-state-profile-addr2',
      path: '/stateProfile/medicaidOffice/address2'
    },
    {
      testName: 'office city change',
      fieldName: 'apd-state-profile-city',
      path: '/stateProfile/medicaidOffice/city'
    },
    {
      testName: 'office state change',
      fieldName: 'apd-state-profile-state',
      path: '/stateProfile/medicaidOffice/state'
    },
    {
      testName: 'office zip change',
      fieldName: 'apd-state-profile-zip',
      path: '/stateProfile/medicaidOffice/zip'
    }
  ].forEach(({ testName, fieldName, path }) => {
    test(`dispatches on ${testName}`, () => {
      const component = mount(
        <Provider store={store}>
          <StateProfile />
        </Provider>
      );

      component
        .findWhere(c => c.prop('name') === fieldName)
        .first()
        .prop('onChange')({ target: { value: 'new text' } });

      const expectedActions = [
        {
          type: EDIT_APD,
          path,
          value: 'new text'
        }
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
