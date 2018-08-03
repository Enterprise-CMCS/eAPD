import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import { AllRaw as Activities, mapStateToProps } from './All';

describe('the Activities component', () => {
  const props = {
    activityKeys: ['1', '2', '3'],
    addActivity: sinon.stub()
  };

  test('renders correctly', () => {
    const component = shallow(<Activities {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('adds a new activity', () => {
    const component = shallow(<Activities {...props} />);
    component.find('Btn').simulate('click');
    expect(props.addActivity.callCount).toBe(1);
  });

  test('maps redux state to component props', () => {
    expect(
      mapStateToProps({ activities: { allKeys: ['1', 'two', '3'] } })
    ).toEqual({ activityKeys: ['1', 'two', '3'] });
  });
});
