import { shallow } from 'enzyme';
import React from 'react';
import { push } from 'connected-react-router';
import sinon from 'sinon';

import {
  plain as TopBtns,
  mapStateToProps,
  mapDispatchToProps
} from './TopBtns';

describe('Top buttons component', () => {
  test('renders correctly if logged out', () => {
    const component = shallow(
      <TopBtns authenticated={false} pushRoute={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if logged in', () => {
    const component = shallow(<TopBtns authenticated pushRoute={() => {}} />);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly with dashboard hidden', () => {
    const component = shallow(
      <TopBtns authenticated hideDashboard pushRoute={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });

  test('goes to the dashboard', () => {
    const event = { preventDefault: sinon.spy() };
    const pushRouteProp = sinon.spy();

    const component = shallow(
      <TopBtns authenticated pushRoute={pushRouteProp} />
    );

    component
      .find('Btn')
      .at(0)
      .simulate('click', event);

    expect(pushRouteProp.calledWith('/')).toBeTruthy();
    expect(event.preventDefault.called).toBeTruthy();
  });

  test('goes to the logout route', () => {
    const event = { preventDefault: sinon.spy() };
    const pushRouteProp = sinon.spy();

    const component = shallow(
      <TopBtns authenticated hideDashboard pushRoute={pushRouteProp} />
    );

    component.find('Btn').simulate('click', event);

    expect(pushRouteProp.calledWith('/logout')).toBeTruthy();
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
    expect(mapDispatchToProps).toEqual({ pushRoute: push });
  });
});
