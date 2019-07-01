import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { plain as Login, mapStateToProps, mapDispatchToProps } from './Login';
import { login } from '../actions/auth';

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
      />
    );
    // clicky the consent banner to get through to the login screen
    component.find('ConsentBanner').prop('onAgree')();

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
    component.find('withRouter(CardForm)').prop('onSave')(event);

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
    expect(mapDispatchToProps).toEqual({ login });
  });
});
