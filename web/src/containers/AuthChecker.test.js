import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as AuthChecker,
  mapStateToProps,
  mapDispatchToProps
} from './AuthChecker';
import { checkAuth } from '../actions/auth';

describe('auth checker component', () => {
  test('renders correctly', () => {
    const checkAuthProp = sinon.spy();

    expect(
      shallow(
        <AuthChecker authInit={false} checkAuth={checkAuthProp}>
          <div />
        </AuthChecker>
      )
    ).toMatchSnapshot();

    expect(
      shallow(
        <AuthChecker authInit checkAuth={checkAuthProp}>
          <div />
        </AuthChecker>
      )
    ).toMatchSnapshot();

    expect(checkAuthProp.calledTwice).toBeTruthy();
  });

  test('maps state to props', () => {
    const state = {
      auth: {
        initialCheck: 'this value'
      }
    };

    expect(mapStateToProps(state)).toEqual({
      authInit: 'this value'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ checkAuth });
  });
});
