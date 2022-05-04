import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as Milestones,
  mapDispatchToProps,
  mapStateToProps
} from './Milestones';

import { removeMilestone } from '../../../../redux/actions/editActivity';

describe('the Milestones component', () => {
  const props = {
    activity: {
      schedule: [
        {
          key: 'milestone 1',
          milestone: 'Liberation Day',
          // The Netherlands is liberated from Nazi control.
          endDate: '1945-05-05'
        }
      ]
    },
    activityIndex: 7,
    remove: jest.fn()
  };

  const component = shallow(<Milestones {...props} />);

  beforeEach(() => {
    props.remove.mockClear();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles removing a milestone', () => {
      list.prop('onDeleteClick')(0);

      expect(props.remove).toHaveBeenCalledWith(7, 0);
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
        remove: removeMilestone
      });
    });
  });
});
