import { shallow } from 'enzyme';
import React from 'react';
import { push } from 'react-router-redux';
import sinon from 'sinon';

import {
  plain as TopBtns,
  mapStateToProps,
  mapDispatchToProps
} from './TopBtns';
import { logout } from '../actions/auth';

describe('Top buttons component', () => {
  test('renders correctly if logged out', () => {
    const component = shallow(
      <TopBtns authenticated={false} logout={() => {}} pushRoute={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if logged in', () => {
    const component = shallow(
      <TopBtns authenticated logout={() => {}} pushRoute={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly with dashboard hidden', () => {
    const component = shallow(
      <TopBtns
        authenticated
        hideDashboard
        logout={() => {}}
        pushRoute={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('goes to the dashboard', () => {
    const event = { preventDefault: sinon.spy() };
    const logoutProp = sinon.spy();
    const pushRouteProp = sinon.spy();

    const component = shallow(
      <TopBtns authenticated logout={logoutProp} pushRoute={pushRouteProp} />
    );

    component
      .find('Btn')
      .at(0)
      .simulate('click', event);

    expect(pushRouteProp.calledWith('/')).toBeTruthy();
    expect(event.preventDefault.called).toBeTruthy();
  });

  test('calls logout prop', () => {
    const event = { preventDefault: sinon.spy() };
    const logoutProp = sinon.spy();
    const pushRouteProp = sinon.spy();

    const component = shallow(
      <TopBtns
        authenticated
        hideDashboard
        logout={logoutProp}
        pushRoute={pushRouteProp}
      />
    );

    component.find('Btn').simulate('click', event);

    expect(logoutProp.calledWith()).toBeTruthy();
    expect(event.preventDefault.called).toBeTruthy();
  });

  test('maps state to props', () => {
    const state = {
      auth: {
        authenticated: 'some value'
      }
    };

    expect(mapStateToProps(state)).toEqual({ authenticated: 'some value' });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ logout, pushRoute: push });
  });
});
