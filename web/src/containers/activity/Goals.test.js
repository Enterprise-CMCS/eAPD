import { shallow } from 'enzyme';
import React from 'react';

import { plain as Goals, mapStateToProps, mapDispatchToProps } from './Goals';
import {
  addActivityGoal,
  removeActivityGoal,
  updateActivity
} from '../../actions/activities';

describe('activity Goals component', () => {
  it('renders properly', () => {
    expect(
      shallow(
        <Goals
          activityKey="activity key"
          goals={['some', 'goals', 'here']}
          addActivityGoal={jest.fn()}
          removeActivityGoal={jest.fn()}
          updateActivity={jest.fn()}
        />
      )
    ).toMatchSnapshot();
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
