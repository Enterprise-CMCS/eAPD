import { shallow } from 'enzyme';
import React from 'react';

import { plain as AdminRoute, mapStateToProps } from './AdminRoute';

describe('admin route component', () => {
  const props = {
    authenticated: false,
    isAdmin: false,
    location: { from: 'over there' },
    component: () => {}
  };

  test('renders correctly if logged out', () => {
    const component = shallow(<AdminRoute {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.prop('render')(props)).toMatchSnapshot();
  });

  test('renders correctly if logged in but not admin', () => {
    const component = shallow(<AdminRoute {...props} authenticated />);
    expect(component).toMatchSnapshot();
    expect(
      component.prop('render')({ ...props, authenticated: true })
    ).toMatchSnapshot();
  });

  test('renders correctly if logged in and admin', () => {
    const component = shallow(<AdminRoute {...props} authenticated isAdmin />);
    expect(component).toMatchSnapshot();
    expect(
      component.prop('render')({ ...props, authenticated: true, isAdmin: true })
    ).toMatchSnapshot();
  });

  test('maps state to props', () => {
    expect(
      mapStateToProps({
        auth: {
          authenticated: 'some value'
        },
        user: { data: { role: 'not admin' } }
      })
    ).toEqual({ authenticated: 'some value', isAdmin: false });

    expect(
      mapStateToProps({
        auth: {
          authenticated: 'some value'
        },
        user: { data: { role: 'eAPD Federal Admin' } }
      })
    ).toEqual({ authenticated: 'some value', isAdmin: true });
  });
});
