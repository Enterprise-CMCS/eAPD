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
          id: 'bloop',
          name: 'florp',
          years: ['dinkus', 'dorkus', 'durkus']
        }
      },
      user: {
        data: {
          state: 'place'
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      apdCreated: 'creation date',
      apdName: 'florp',
      apdSelected: true,
      isAdmin: false,
      place: 'place',
      year: 'dinkus-durkus'
    });

    state.apd.data.id = false;
    delete state.apd.data.years;

    expect(mapStateToProps(state)).toEqual({
      apdCreated: 'creation date',
      apdName: 'florp',
      apdSelected: false,
      isAdmin: false,
      place: 'place',
      year: ''
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ setApdToSelectOnLoad });
  });
});
