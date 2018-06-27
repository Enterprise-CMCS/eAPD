import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import { raw as Activities, mapStateToProps } from './Activities';

describe('the Activities list component', () => {
  const props = {
    activityIds: ['1', '2', '3'],
    addActivity: sinon.stub()
  };

  test('renders correctly', () => {
    const component = shallow(<Activities {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('adds a new activity', () => {
    const component = shallow(<Activities {...props} />);
    component.find('button').simulate('click');
    expect(props.addActivity.callCount).toBe(1);
  });

  test('maps redux state to component props', () => {
    expect(
      mapStateToProps({ activities: { allIds: ['1', 'two', '3'] } })
    ).toEqual({ activityIds: ['1', 'two', '3'] });
  });
});
