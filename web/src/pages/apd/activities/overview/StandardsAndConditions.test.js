import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as StandardsAndConditions,
  mapStateToProps,
  mapDispatchToProps
} from './StandardsAndConditions';

import {
  setActivityStandardAndConditionDoesNotSupportExplanation,
  setActivityStandardAndConditionSupportExplanation
} from '../../../../actions/editActivity';

describe('the Schedule (milestones) component', () => {
  const props = {
    activity: {
      standardsAndConditions: {
        doesNotSupport: 'does not support',
        supports: 'support'
      }
    },
    activityIndex: 7,
    setDoesNotSupport: jest.fn(),
    setSupport: jest.fn()
  };

  const component = shallow(<StandardsAndConditions {...props} />);

  beforeEach(() => {
    props.setDoesNotSupport.mockClear();
    props.setSupport.mockClear();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    it('updates explanation for not supporting standards and conditions', () => {
      component.find('TextArea').prop('onChange')({
        target: { value: 'new not support' }
      });
      expect(props.setDoesNotSupport).toHaveBeenCalledWith(
        7,
        'new not support'
      );
    });

    it('updates description of supporting standards and conditions', () => {
      component.find('Connect(RichText)').prop('onSync')('new support');
      expect(props.setSupport).toHaveBeenCalledWith(7, 'new support');
    });
  });

  describe('redux', () => {
    it('map state to props', () => {
      const state = {
        apd: {
          data: {
            activities: ['activity 1', 'activity 2', 'activity 3']
          }
        }
      };

      expect(mapStateToProps(state, { activityIndex: 2 })).toEqual({
        activity: 'activity 3'
      });
    });

    it('map dispatch to props', () => {
      expect(mapDispatchToProps).toEqual({
        setDoesNotSupport:
          setActivityStandardAndConditionDoesNotSupportExplanation,
        setSupport: setActivityStandardAndConditionSupportExplanation
      });
    });
  });
});
