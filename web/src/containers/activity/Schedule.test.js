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
  const activity = {
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
  };

  const fns = {
    addActivityMilestone: jest.fn(),
    removeActivityMilestone: jest.fn(),
    updateActivity: jest.fn()
  };

  beforeEach(() => {
    fns.addActivityMilestone.mockClear();
    fns.removeActivityMilestone.mockClear();
    fns.updateActivity.mockClear();
  });

  test('renders correctly with just one milestone', () => {
    expect(
      shallow(<Schedule activity={activity} {...fns} />)
    ).toMatchSnapshot();
  });

  test('renders correctly with multiple milestones', () => {
    expect(
      shallow(
        <Schedule
          activity={{
            ...activity,
            schedule: [
              ...activity.schedule,
              {
                key: 'milestone 2',
                milestone: 'V-E Day',
                // Allied forces formally accepted the unconditional surrender
                // of Nazi Germany. The war in Europe is over.
                endDate: '1945-05-08',
                initialCollapsed: false
              }
            ]
          }}
          {...fns}
        />
      )
    ).toMatchSnapshot();
  });

  describe('events', () => {
    const component = shallow(<Schedule activity={activity} {...fns} />);

    test('adds an activity milestone', () => {
      component.find('Button').simulate('click');
      expect(fns.addActivityMilestone).toHaveBeenCalledWith('activity key');
    });

    test('updates activity start date', () => {
      component
        .find('DateField')
        .at(0)
        .prop('onChange')(null, 'new date');
      expect(fns.updateActivity).toHaveBeenCalledWith('activity key', {
        plannedStartDate: 'new date'
      });
    });

    test('updates activity end date', () => {
      component
        .find('DateField')
        .at(1)
        .prop('onChange')(null, 'other date');
      expect(fns.updateActivity).toHaveBeenCalledWith('activity key', {
        plannedEndDate: 'other date'
      });
    });

    test('updates milestone name', () => {
      component
        .find('Milestone')
        .first()
        .prop('onChangeName')('index', 'new name');
      expect(fns.updateActivity).toHaveBeenCalledWith('activity key', {
        schedule: { index: { milestone: 'new name' } }
      });
    });

    test('updates milestone end date', () => {
      component
        .find('Milestone')
        .first()
        .prop('onChangeDate')('opposite of index', 'new date');
      expect(fns.updateActivity).toHaveBeenCalledWith('activity key', {
        schedule: { 'opposite of index': { endDate: 'new date' } }
      });
    });
  });

  describe('redux', () => {
    test('map state to props', () => {
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

    test('map dispatch to props', () => {
      expect(mapDispatchToProps).toEqual({
        addActivityMilestone,
        removeActivityMilestone,
        updateActivity
      });
    });
  });
});
