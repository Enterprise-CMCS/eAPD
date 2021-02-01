import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import Login from './Login';
import { login } from '../actions/auth';

describe('login component', () => {
  test('renders correctly if logged in previously but not logged in now (shows logout notice)', () => {
    const component = shallow(
      <Login
        hasEverLoggedOn
        errorMessage={null}
        fetching={false}
        login={() => {}}
      />
    );

    // should never be a consent banner, so no need to clicky through it
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if not logged in, and never logged in', () => {
    const component = shallow(
      <Login
        hasEverLoggedOn={false}
        errorMessage={null}
        fetching={false}
        login={() => {}}
      />
    );

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
        hasEverLoggedOn={false}
        errorMessage="something here"
        fetching={false}
        login={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders correctly if user is not in correct Okta group', () => {
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
        isNotInGroup
        otpStage
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders correctly if not logged in and fetching data', () => {
    const component = shallow(
      <Login
        hasEverLoggedOn={false}
        errorMessage={null}
        fetching
        login={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('calls login prop', () => {
    const event = { preventDefault: sinon.spy() };
    const loginProp = sinon.spy();

    const component = shallow(
      <Login
        hasEverLoggedOn={false}
        errorMessage={null}
        fetching={false}
        login={loginProp}
      />
    );

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
});
