import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as Milestones,
  mapDispatchToProps,
  mapStateToProps
} from './Milestones';
import { addMilestone, removeMilestone } from '../../actions/editActivity';

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
    add: jest.fn(),
    remove: jest.fn()
  };

  const component = shallow(<Milestones {...props} />);

  beforeEach(() => {
    props.add.mockClear();
    props.remove.mockClear();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');
    it('handles adding a new milestone', () => {
      list.prop('onAddClick')();

      expect(props.add).toHaveBeenCalledWith(7);
    });

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
        add: addMilestone,
        remove: removeMilestone
      });
    });
  });
});
