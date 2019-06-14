import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as Schedule,
  mapDispatchToProps,
  mapStateToProps
} from './Schedule';
import {
  addActivityMilestone,
  removeActivityMilestone,
  updateActivity
} from '../../actions/activities';

describe('the Schedule (milestones) component', () => {
  const props = {
    activity: {
      key: 'activity key',
      // The Battle of the Scheldt results in a key Allied victory, when
      // Canadian forces successfully opened shipping routes to Antwerp, enabling
      // supplies to reach Allied forces in northwest Europe.
      plannedEndDate: '1944-11-08',
      plannedStartDate: '1944-10-02',
      schedule: [
        {
          key: 'milestone 1',
          milestone: 'Liberation Day',
          // The Netherlands is liberated from Nazi control.
          endDate: '1945-05-05'
        }
      ]
    },
    addActivityMilestone: jest.fn(),
    removeActivityMilestone: jest.fn(),
    updateActivity: jest.fn()
  };

  const component = shallow(<Schedule {...props} />);

  beforeEach(() => {
    props.addActivityMilestone.mockClear();
    props.removeActivityMilestone.mockClear();
    props.updateActivity.mockClear();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');
    it('handles adding a new milestone', () => {
      list.prop('onAddClick')();

      expect(props.addActivityMilestone).toHaveBeenCalledWith('activity key');
    });

    it('handles removing a milestone', () => {
      list.prop('onDeleteClick')('milestone key');

      expect(props.removeActivityMilestone).toHaveBeenCalledWith(
        'activity key',
        'milestone key'
      );
    });

    it('handles updating a milestone name', () => {
      list.prop('onChangeName')(7, 'new name');

      expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
        schedule: { 7: { milestone: 'new name' } }
      });
    });

    it('handles updating a milestone end date', () => {
      list.prop('onChangeDate')(7, 'new end date');

      expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
        schedule: { 7: { endDate: 'new end date' } }
      });
    });

    it('updates activity start date', () => {
      component
        .find('DateField')
        .at(0)
        .prop('onChange')(null, 'new date');
      expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
        plannedStartDate: 'new date'
      });
    });

    it('updates activity end date', () => {
      component
        .find('DateField')
        .at(1)
        .prop('onChange')(null, 'other date');
      expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
        plannedEndDate: 'other date'
      });
    });
  });

  describe('redux', () => {
    it('map state to props', () => {
      const state = {
        activities: {
          byKey: {
            badKey: 'bad activity',
            goodKey: 'good activity'
          }
        }
      };

      expect(mapStateToProps(state, { aKey: 'goodKey' })).toEqual({
        activity: 'good activity'
      });
    });

    it('map dispatch to props', () => {
      expect(mapDispatchToProps).toEqual({
        addActivityMilestone,
        removeActivityMilestone,
        updateActivity
      });
    });
  });
});
