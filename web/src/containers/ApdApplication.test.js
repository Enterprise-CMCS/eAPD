import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as ApdApplication,
  mapStateToProps,
  mapDispatchToProps
} from './ApdApplication';
import { setApdToSelectOnLoad } from '../actions/app';

describe('apd (application) component', () => {
  test('renders correctly', () => {
    const selectApdOnLoadProp = jest.fn();

    // non-admin, APD already selected
    expect(
      shallow(
        <ApdApplication
          apdCreated="creation date"
          apdName="test name"
          apdSelected
          isAdmin={false}
          place={{}}
          setApdToSelectOnLoad={selectApdOnLoadProp}
          year="the year"
          userRole="role"
        />
      )
    ).toMatchSnapshot();
    expect(selectApdOnLoadProp).not.toHaveBeenCalled();

    // non-admin, APD not already selected
    expect(
      shallow(
        <ApdApplication
          apdCreated="creation date"
          apdName="another apd"
          apdSelected={false}
          isAdmin={false}
          place={{}}
          setApdToSelectOnLoad={selectApdOnLoadProp}
          year="the year"
          userRole="role"
        />
      )
    ).toMatchSnapshot();
    expect(selectApdOnLoadProp).toHaveBeenCalledWith('/apd');

    // admin
    selectApdOnLoadProp.mockClear();
    expect(
      shallow(
        <ApdApplication
          apdCreated="creation date"
          apdName="third"
          apdSelected={false}
          isAdmin
          place={{}}
          setApdToSelectOnLoad={selectApdOnLoadProp}
          year="the future"
          userRole="role"
        />
      )
    ).toMatchSnapshot();
    expect(selectApdOnLoadProp).not.toHaveBeenCalled();
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        data: {
          created: 'creation date',
          id: '123456789',
          name: 'florp',
          years: ['dinkus', 'dorkus', 'durkus']
        }
      },
      user: {
        data: {
          state: 'place',
          role: 'test role',
          activities: ['edit-document']
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      apdId: '123456789',
      apdSelected: true,
      isAdmin: false,
      isEditor: true,
      place: 'place',
      userRole: 'test role'
    });

    state.apd.data.id = null;
    delete state.apd.data.years;

    expect(mapStateToProps(state)).toEqual({
      apdId: null,
      apdSelected: false,
      isAdmin: false,
      isEditor: true,
      place: 'place',
      userRole: 'test role'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ setApdToSelectOnLoad });
  });
});
