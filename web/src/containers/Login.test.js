import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import Login from './Login';
import {
  login,
  loginOtp,
  mfaActivate,
  mfaAddPhone,
  mfaConfig,
  completeAccessToState,
  createAccessRequest
} from '../actions/auth';

describe('login component', () => {
  test('renders correctly if logged in', () => {
    const component = shallow(
      <Login
        authenticated
        error=""
        fetching
        hasEverLoggedOn={false}
        location={{ state: { from: 'origin' } }}
        login={() => {}}
        loginOtp={() => {}}
        otpStage={false}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if logged in and previous location is logout', () => {
    const component = shallow(
      <Login
        authenticated
        error=""
        fetching
        hasEverLoggedOn={false}
        location={{ state: { from: '/logout' } }}
        login={() => {}}
        loginOtp={() => {}}
        otpStage={false}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if logged in, but no previous location', () => {
    const component = shallow(
      <Login
        authenticated
        error=""
        fetching
        hasEverLoggedOn={false}
        location={{}}
        login={() => {}}
        loginOtp={() => {}}
        otpStage={false}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if logged in, but previous was on logout', () => {
    const component = shallow(
      <Login
        authenticated
        error=""
        fetching
        hasEverLoggedOn
        location={{ state: { from: { pathname: '/logout' } } }}
        login={() => {}}
        loginOtp={() => {}}
        otpStage={false}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders consent banner initially', () => {
    const component = shallow(
      <Login
        authenticated={false}
        error=""
        fetching={false}
        hasEverLoggedOn={false}
        location={{ state: { from: 'origin' } }}
        login={() => {}}
        loginOtp={() => {}}
        otpStage={false}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if logged in previously but not logged in now (shows logout notice)', () => {
    const component = shallow(
      <Login
        authenticated={false}
        error=""
        fetching={false}
        hasEverLoggedOn
        location={{ state: { from: 'origin' } }}
        login={() => {}}
        loginOtp={() => {}}
        otpStage={false}
      />
    );

    // should never be a consent banner, so no need to clicky through it
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if not logged in, and never logged in', () => {
    const component = shallow(
      <Login
        authenticated={false}
        error=""
        fetching={false}
        hasEverLoggedOn={false}
        location={{ state: { from: 'origin' } }}
        login={() => {}}
        loginOtp={() => {}}
        otpStage={false}
      />
    );
    // clicky the consent banner to get through to the login screen
    component.find('ConsentBanner').prop('onAgree')();

    expect(component).toMatchSnapshot();

    component
      .find('TextField')
      .simulate('change', { target: { name: 'username', value: 'bob' } });
    expect(component).toMatchSnapshot();
    component
      .find('Password')
      .simulate('change', { target: { name: 'password', value: 'secret' } });
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if not logged in and there is an error', () => {
    const component = shallow(
      <Login
        authenticated={false}
        error="something here"
        fetching={false}
        hasEverLoggedOn={false}
        location={{ state: { from: 'origin' } }}
        login={() => {}}
        loginOtp={() => {}}
        otpStage={false}
      />
    );
    // clicky the consent banner to get through to the login screen
    component.find('ConsentBanner').prop('onAgree')();

    expect(component).toMatchSnapshot();
  });

  test('renders correctly if there is an authentication error', () => {
    const component = shallow(
      <Login
        authenticated={false}
        error="Authentication failed"
        fetching={false}
        hasEverLoggedOn={false}
        location={{ state: { from: 'origin' } }}
        login={() => {}}
        loginOtp={() => {}}
        otpStage={false}
      />
    );
    // clicky the consent banner to get through to the login screen
    component.find('ConsentBanner').prop('onAgree')();

    expect(component).toMatchSnapshot();
  });

  test('renders correctly if there is an otp authentication error', () => {
    const component = shallow(
      <Login
        authenticated={false}
        error="Authentication failed"
        customErrorMessage="Invalid Entry"
        fetching={false}
        hasEverLoggedOn={false}
        location={{ state: { from: 'origin' } }}
        login={() => {}}
        loginOtp={() => {}}
        otpStage
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders correctly if not logged in and fetching data', () => {
    const component = shallow(
      <Login
        authenticated={false}
        error=""
        fetching
        hasEverLoggedOn={false}
        location={{ state: { from: 'origin' } }}
        login={() => {}}
        loginOtp={() => {}}
        otpStage={false}
      />
    );
    // clicky the consent banner to get through to the login screen
    component.find('ConsentBanner').prop('onAgree')();

    expect(component).toMatchSnapshot();
  });

  test('calls login prop', () => {
    const event = { preventDefault: sinon.spy() };
    const loginProp = sinon.spy();

    const component = shallow(
      <Login
        authenticated={false}
        error=""
        fetching={false}
        hasEverLoggedOn={false}
        location={{ state: { from: 'origin' } }}
        login={loginProp}
        loginOtp={() => {}}
        otpStage={false}
      />
    );
    // clicky the consent banner to get through to the login screen
    component.find('ConsentBanner').prop('onAgree')();

    component
      .find('TextField')
      .simulate('change', { target: { name: 'username', value: 'bob' } });
    component
      .find('Password')
      .simulate('change', { target: { name: 'password', value: 'secret' } });
    component.find('withRouter(LoginForm)').prop('onSave')(event);

    expect(loginProp.calledWith('bob', 'secret')).toBeTruthy();
    expect(event.preventDefault.called).toBeTruthy();
  });

  test('maps state to props', () => {
    const state = {
      auth: {
        authenticated: 'some value',
        error: 'another value',
        fetching: 'a different value'
      }
    };

    expect(mapStateToProps(state)).toEqual({
      authenticated: 'some value',
      error: 'another value',
      fetching: 'a different value'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      login,
      loginOtp,
      mfaActivate,
      mfaAddPhone,
      mfaConfig,
      completeAccessToState,
      createAccessRequest
    });
  });
});
