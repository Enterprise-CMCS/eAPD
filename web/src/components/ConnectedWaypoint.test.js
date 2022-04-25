import { shallow } from 'enzyme';
import React from 'react';
import { replace } from 'connected-react-router';

import {
  plain as Waypoint,
  mapStateToProps,
  mapDispatchToProps
} from './ConnectedWaypoint';

const defaultProps = {
  children: null,
  id: '#element-id',
  location: {},
  replace: jest.fn()
};

const setup = (props = {}) => {
  return shallow(<Waypoint {...defaultProps} {...props} />);
};

describe('<ConnectedWaypoint /> component', () => {
  afterEach(() => {
    defaultProps.replace.mockReset();
  });

  it('renders without children', () => {
    setup();
  });

  it('renders with children', () => {
    const children = <div>Hello, I am child</div>;
    setup({ children });
  });

  it('dispatches on entering waypoint', () => {
    const component = setup();
    component.find('Waypoint').at(0).prop('onEnter')('this is some html');

    expect(defaultProps.replace).toHaveBeenCalledWith({ hash: '#element-id' });
  });

  it('maps redux state to component props', () => {
    const state = {
      router: {
        location: {
          pathname: '/you/are/here',
          hash: '#at-this-element'
        }
      }
    };
    const { location } = mapStateToProps(state);
    expect(location).toEqual({
      pathname: '/you/are/here',
      hash: '#at-this-element'
    });
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ replace });
  });
});
