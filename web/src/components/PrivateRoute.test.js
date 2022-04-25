import { shallow } from 'enzyme';
import React from 'react';

import { plain as PrivateRoute, mapStateToProps } from './PrivateRoute';

describe('private route component', () => {
  const props = {
    authenticated: false,
    location: { from: 'over there' },
    component: () => {}
  };

  test('renders correctly if logged out', () => {
    const component = shallow(<PrivateRoute {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.prop('render')(props)).toMatchSnapshot();
  });

  test('renders correctly if logged in', () => {
    const component = shallow(<PrivateRoute {...props} authenticated />);
    expect(component).toMatchSnapshot();
    expect(
      component.prop('render')({ ...props, authenticated: true })
    ).toMatchSnapshot();
  });

  test('maps state to props', () => {
    const state = {
      auth: {
        authenticated: 'some value'
      }
    };

    expect(mapStateToProps(state)).toEqual({ authenticated: 'some value' });
  });
});
