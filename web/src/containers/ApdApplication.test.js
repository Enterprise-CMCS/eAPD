import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as ApdApplication,
  mapStateToProps,
  mapDispatchToProps
} from './ApdApplication';
import { selectApdOnLoad } from '../actions/apd';

describe('Routes component', () => {
  test('renders correctly', () => {
    expect(
      shallow(
        <ApdApplication apdSelected place={{}} selectApdOnLoad={() => {}} />
      )
    ).toMatchSnapshot();

    const selectApdOnLoadProp = sinon.spy();
    expect(
      shallow(
        <ApdApplication
          apdSelected={false}
          place={{}}
          selectApdOnLoad={selectApdOnLoadProp}
        />
      )
    ).toMatchSnapshot();
    expect(selectApdOnLoadProp.calledWith('/apd')).toBeTruthy();
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        data: {
          id: 'bloop'
        }
      },
      user: {
        data: {
          state: 'place'
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      apdSelected: true,
      place: 'place'
    });

    state.apd.data.id = false;

    expect(mapStateToProps(state)).toEqual({
      apdSelected: false,
      place: 'place'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ selectApdOnLoad });
  });
});
