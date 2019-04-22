import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as ApdApplication,
  mapStateToProps,
  mapDispatchToProps
} from './ApdApplication';
import { selectApdOnLoad } from '../actions/apd';

describe('apd (application) component', () => {
  test('renders correctly', () => {
    // non-admin, dirty
    expect(
      shallow(
        <ApdApplication
          apdName="test name"
          apdSelected
          dirty
          isAdmin={false}
          place={{}}
          selectApdOnLoad={() => {}}
          year="the year"
        />
      )
    ).toMatchSnapshot();

    // non-admin, clean
    const selectApdOnLoadProp = sinon.spy();
    expect(
      shallow(
        <ApdApplication
          apdName="another apd"
          apdSelected={false}
          dirty={false}
          isAdmin={false}
          place={{}}
          selectApdOnLoad={selectApdOnLoadProp}
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
          apdName="third"
          apdSelected={false}
          dirty={false}
          isAdmin
          place={{}}
          selectApdOnLoad={selectApdOnLoadProp}
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
          id: 'bloop',
          name: 'florp',
          years: ['dinkus', 'dorkus']
        }
      },
      dirty: {
        dirty: 'moop moop'
      },
      user: {
        data: {
          state: 'place'
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      apdName: 'florp',
      apdSelected: true,
      dirty: 'moop moop',
      isAdmin: false,
      place: 'place',
      year: 'dinkus'
    });

    state.apd.data.id = false;
    delete state.apd.data.years;

    expect(mapStateToProps(state)).toEqual({
      apdName: 'florp',
      apdSelected: false,
      dirty: 'moop moop',
      isAdmin: false,
      place: 'place',
      year: ''
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ selectApdOnLoad });
  });
});
