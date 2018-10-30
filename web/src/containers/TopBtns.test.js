import { shallow } from 'enzyme';
import React from 'react';
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
      <TopBtns authenticated={false} logout={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if logged in', () => {
    const component = shallow(<TopBtns authenticated logout={() => {}} />);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly with dashboard hidden', () => {
    const component = shallow(
      <TopBtns authenticated hideDashboard logout={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });

  test('calls logout prop', () => {
    const event = { preventDefault: sinon.spy() };
    const logoutProp = sinon.spy();
    const component = shallow(
      <TopBtns authenticated hideDashboard logout={logoutProp} />
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
    expect(mapDispatchToProps).toEqual({ logout });
  });
});
