import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { plain as Waypoint, mapDispatchToProps } from './ConnectedWaypoint';

import { scrollTo } from '../actions/navigation';

describe('connected waypoint higher-order component', () => {
  const props = {
    id: 'id',
    scrollTo: sinon.spy()
  };

  beforeEach(() => {
    props.scrollTo.resetHistory();
  });

  describe('renders correctly', () => {
    test('without children', () => {
      expect(shallow(<Waypoint {...props} />)).toMatchSnapshot();
    });

    test('with children', () => {
      expect(
        shallow(
          <Waypoint {...props}>
            <div>Hello, I am child</div>
          </Waypoint>
        )
      ).toMatchSnapshot();
    });
  });

  test('dispatches on entering waypoint', () => {
    shallow(<Waypoint {...props} />)
      .find('Waypoint')
      .at(0)
      .prop('onEnter')('this is some html');

    expect(props.scrollTo.calledWith('id'));
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ scrollTo });
  });
});
