import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as ApdApplication,
  mapStateToProps,
  mapDispatchToProps
} from './ApdApplication';
import { setApdToSelectOnLoad } from '../actions/app';

describe('apd (application) component', () => {
  test('renders correctly', () => {
    // non-admin, dirty
    expect(
      shallow(
        <ApdApplication
          apdCreated="creation date"
          apdName="test name"
          apdSelected
          needsSave
          isAdmin={false}
          place={{}}
          setApdToSelectOnLoad={() => {}}
          year="the year"
        />
      )
    ).toMatchSnapshot();

    // non-admin, clean
    const selectApdOnLoadProp = sinon.spy();
    expect(
      shallow(
        <ApdApplication
          apdCreated="creation date"
          apdName="another apd"
          apdSelected={false}
          needsSave={false}
          isAdmin={false}
          place={{}}
          setApdToSelectOnLoad={selectApdOnLoadProp}
          year="the past"
        />
      )
    ).toMatchSnapshot();
    expect(selectApdOnLoadProp.calledWith('/apd')).toBeTruthy();

    // admin
    selectApdOnLoadProp.resetHistory();
    expect(
      shallow(
        <ApdApplication
          apdCreated="creation date"
          apdName="third"
          apdSelected={false}
          needsSave={false}
          isAdmin
          place={{}}
          setApdToSelectOnLoad={selectApdOnLoadProp}
          year="the future"
        />
      )
    ).toMatchSnapshot();
    expect(selectApdOnLoadProp.notCalled).toBeTruthy();
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
      patch: [1, 2, 3],
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
      needsSave: true,
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
      needsSave: true,
      place: 'place',
      year: ''
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ setApdToSelectOnLoad });
  });
});
