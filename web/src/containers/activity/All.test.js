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

  test('maps redux state to component props', () => {
    expect(
      mapStateToProps({
        activities: {
          allKeys: ['1', 'two', '3'],
          byKey: {
            key1: 'activity 1',
            key2: 'activity 2'
          }
        }
      })
    ).toEqual({
      activityKeys: ['1', 'two', '3'],
      activities: ['activity 1', 'activity 2']
    });
  });
});
