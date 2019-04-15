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
    expect(
      shallow(
        <ApdApplication
          apdSelected
          dirty
          isAdmin={false}
          place={{}}
          selectApdOnLoad={() => {}}
        />
      )
    ).toMatchSnapshot();

    const selectApdOnLoadProp = sinon.spy();
    expect(
      shallow(
        <ApdApplication
          apdSelected={false}
          dirty={false}
          isAdmin={false}
          place={{}}
          selectApdOnLoad={selectApdOnLoadProp}
        />
      )
    ).toMatchSnapshot();
    expect(selectApdOnLoadProp.calledWith('/apd')).toBeTruthy();

    selectApdOnLoadProp.resetHistory();
    expect(
      shallow(
        <ApdApplication
          apdSelected={false}
          dirty={false}
          isAdmin
          place={{}}
          selectApdOnLoad={selectApdOnLoadProp}
        />
      )
    ).toMatchSnapshot();
    expect(selectApdOnLoadProp.notCalled).toBeTruthy();
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        data: {
          id: 'bloop'
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
      apdSelected: true,
      dirty: 'moop moop',
      isAdmin: false,
      place: 'place'
    });

    state.apd.data.id = false;

    expect(mapStateToProps(state)).toEqual({
      apdSelected: false,
      dirty: 'moop moop',
      isAdmin: false,
      place: 'place'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ selectApdOnLoad });
  });
});
