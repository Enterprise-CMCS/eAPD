import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { raw as Login, mapStateToProps, mapDispatchToProps } from './Login';
import { login } from '../actions/auth';

describe('Routes component', () => {
  test('renders correctly if logged in', () => {
    const component = shallow(
      <Login
        authenticated
        error=""
        fetching
        location={{ state: { from: 'origin' } }}
        login={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if logged in, but no previous location', () => {
    const component = shallow(
      <Login authenticated error="" fetching location={{}} login={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if not logged in', () => {
    const component = shallow(
      <Login
        authenticated={false}
        error=""
        fetching={false}
        location={{ state: { from: 'origin' } }}
        login={() => {}}
      />
    );
    expect(component).toMatchSnapshot();

    component
      .find('input#username')
      .simulate('change', { target: { name: 'username', value: 'bob' } });
    expect(component).toMatchSnapshot();
    component
      .find('input#password')
      .simulate('change', { target: { name: 'password', value: 'secret' } });
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if not logged in and there is an error', () => {
    const component = shallow(
      <Login
        authenticated={false}
        error="something here"
        fetching={false}
        location={{ state: { from: 'origin' } }}
        login={() => {}}
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
        location={{ state: { from: 'origin' } }}
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
        authenticated={false}
        error=""
        fetching={false}
        location={{ state: { from: 'origin' } }}
        login={loginProp}
      />
    );

    component
      .find('input#username')
      .simulate('change', { target: { name: 'username', value: 'bob' } });
    component
      .find('input#password')
      .simulate('change', { target: { name: 'password', value: 'secret' } });
    component.find('form').simulate('submit', event);

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
