import { shallow } from 'enzyme';
import React from 'react';

import { plain as Goals, mapStateToProps, mapDispatchToProps } from './Goals';
import {
  addActivityGoal,
  removeActivityGoal,
  updateActivity
} from '../../actions/activities';

describe('activity Goals component', () => {
  const props = {
    activityKey: 'activity key',
    goals: ['some', 'goals', 'here'],
    addActivityGoal: jest.fn(),
    removeActivityGoal: jest.fn(),
    updateActivity: jest.fn()
  };
  const component = shallow(<Goals {...props} />);

  beforeEach(() => {
    props.addActivityGoal.mockClear();
    props.removeActivityGoal.mockClear();
    props.updateActivity.mockClear();
  });

  it('renders properly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles adding a new goal', () => {
      list.prop('onAddClick')();
      expect(props.addActivityGoal).toHaveBeenCalledWith('activity key');
    });

    it('handles deleting a goal', () => {
      list.prop('onDeleteClick')('goal key');
      expect(props.removeActivityGoal).toHaveBeenCalledWith(
        'activity key',
        'goal key'
      );
    });

    it('handles editing a goal', () => {
      const update = jest.fn();
      props.updateActivity.mockReturnValue(update);

      const changeHandler = list.prop('handleChange')(3, 'field name');
      changeHandler({ target: { value: 'new value' } });

      expect(props.updateActivity).toHaveBeenCalledWith('activity key', {
        goals: { 3: { 'field name': 'new value' } }
      });
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      addActivityGoal,
      removeActivityGoal,
      updateActivity
    });
  });

  it('maps appropriate state to props', () => {
    const state = {
      activities: {
        byKey: { 'activity-key': { goals: 'these are goals from state' } }
      }
    };

    const ownProps = { aKey: 'activity-key' };

    expect(mapStateToProps(state, ownProps)).toEqual({
      activityKey: 'activity-key',
      goals: 'these are goals from state'
    });
  });
});
