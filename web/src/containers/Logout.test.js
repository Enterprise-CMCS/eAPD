import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { plain as Logout, mapDispatchToProps } from './Logout';
import { logout } from '../actions/auth';

describe('logout component', () => {
  test('calls the logout property and renders nothing', () => {
    const props = { logout: sinon.spy() };
    const component = shallow(<Logout {...props} />);

    expect(component).toMatchSnapshot();
    expect(props.logout.calledOnce).toEqual(true);
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ logout });
  });
});
