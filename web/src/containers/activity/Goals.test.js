import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import { act } from 'react-dom/test-utils';

import {
  plain as Goals,
  Goal,
  GoalForm,
  GoalReview,
  mapStateToProps,
  mapDispatchToProps
} from './Goals';
import {
  addActivityGoal,
  removeActivityGoal,
  updateActivity
} from '../../actions/activities';

describe('activity goals subsection', () => {
  const sandbox = sinon.createSandbox();
  const dispatchProps = {
    addActivityGoal: sandbox.spy(),
    removeActivityGoal: sandbox.spy(),
    updateActivity: sandbox.spy()
  };

  beforeEach(() => {
    sandbox.resetHistory();
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

  describe('the Goals commponent, wrapping all the others', () => {
    describe('with no goals', () => {
      const component = shallow(
        <Goals activityKey="activity-key" goals={[]} {...dispatchProps} />
      );

      it('renders properly', () => {
        expect(component).toMatchSnapshot();
      });

      it('can add a new activity', () => {
        component.find('Button').simulate('click');
        expect(
          dispatchProps.addActivityGoal.calledWith('activity-key')
        ).toEqual(true);
      });
    });

    describe('with one goal', () => {
      const component = shallow(
        <Goals
          activityKey="activity-key"
          goals={[{ key: 'goal-1', expanded: false }]}
          {...dispatchProps}
        />
      );

      it('renders properly', () => {
        expect(component).toMatchSnapshot();
      });

      it('can add a new activity', () => {
        component.find('Button').simulate('click');
        expect(
          dispatchProps.addActivityGoal.calledWith('activity-key')
        ).toEqual(true);
      });

      it('cannot delete a goal', () => {
        expect(
          component
            .find('Goal')
            .first()
            .prop('handleDelete')
        ).toEqual(null);
      });
    });

    describe('with some goals', () => {
      const component = shallow(
        <Goals
          activityKey="activity-key"
          goals={[
            { key: 'goal-1', expanded: false },
            { key: 'goal-2', expanded: false },
            { key: 'goal-3', expanded: true }
          ]}
          {...dispatchProps}
        />
      );

      it('renders properly', () => {
        expect(component).toMatchSnapshot();
      });

      it('can add a new activity', () => {
        component.find('Button').simulate('click');
        expect(
          dispatchProps.addActivityGoal.calledWith('activity-key')
        ).toEqual(true);
      });

      it('can edit a goal', () => {
        const firstGoalChanger = component
          .find('Goal')
          .first()
          .prop('handleChange');

        firstGoalChanger(0, 'field name')({ target: { value: 'new value' } });

        expect(
          dispatchProps.updateActivity.calledWith('activity-key', {
            goals: { 0: { 'field name': 'new value' } }
          })
        ).toEqual(true);
      });

      it('can delete a goal', () => {
        const firstGoalDeleter = component
          .find('Goal')
          .first()
          .prop('handleDelete');

        firstGoalDeleter();

        expect(
          dispatchProps.removeActivityGoal.calledWith('activity-key', 'goal-1')
        ).toEqual(true);
      });
    });
  });

  describe('the Goal component, wrapper around the form and review', () => {
    const props = {
      idx: 0,
      handleChange: sandbox.spy(),
      handleDelete: sandbox.spy()
    };

    describe('with an initially-expanded goal', () => {
      // need a full DOM mount to support React hooks
      const component = mount(<Goal goal={{}} initialExpanded {...props} />);

      it('renders correctly', () => {
        expect(component).toMatchSnapshot();
      });

      it('collapses when done is called', () => {
        // act() is a React wrapper around state-changing functions for
        // testing. https://reactjs.org/docs/test-utils.html#act
        act(() => {
          component.find('GoalForm').prop('done')();
        });
        component.update();
        expect(component).toMatchSnapshot();
      });
    });

    describe('with an initially-collapsed goal', () => {
      const component = mount(<Goal goal={{}} {...props} />);

      it('renders correctly', () => {
        expect(component).toMatchSnapshot();
      });

      it('expands when edit is called', () => {
        act(() => {
          component.find('GoalReview').prop('edit')();
        });
        component.update();
        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('the GoalForm component', () => {
    const done = sinon.spy();
    const handleChange = sinon.stub();

    // Put these two in the sandbox so they get reset on each test
    const handleDescriptionChange = sandbox.spy();
    const handleObjectiveChange = sandbox.spy();

    handleChange.withArgs(0, 'description').returns(handleDescriptionChange);
    handleChange.withArgs(0, 'objective').returns(handleObjectiveChange);

    const component = shallow(
      <GoalForm
        goal={{ description: 'goal name', objective: 'goal benchmarks' }}
        idx={0}
        done={done}
        handleChange={handleChange}
      />
    );

    it('renders properly', () => {
      expect(component).toMatchSnapshot();
    });

    it('handles editing the name', () => {
      component
        .findWhere(c => c.name() === 'TextField' && c.prop('name') === 'name')
        .simulate('change');

      expect(handleDescriptionChange.calledOnce).toEqual(true);
    });

    it('handles editing the benchmarks', () => {
      component
        .findWhere(
          c => c.name() === 'TextField' && c.prop('name') === 'milestones'
        )
        .simulate('change');

      expect(handleObjectiveChange.calledOnce).toEqual(true);
    });
  });

  describe('the GoalReview component', () => {
    const edit = sandbox.spy();
    const handleDelete = sandbox.spy();

    it('renders properly without a delete handler', () => {
      expect(
        shallow(
          <GoalReview
            goal={{ description: 'goal name', objective: 'goal benchmarks' }}
            idx={0}
            edit={edit}
            handleDelete={null}
          />
        )
      ).toMatchSnapshot();
    });

    it('renders properly with a delete handler', () => {
      expect(
        shallow(
          <GoalReview
            goal={{ description: 'goal name', objective: 'goal benchmarks' }}
            idx={0}
            edit={edit}
            handleDelete={handleDelete}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
