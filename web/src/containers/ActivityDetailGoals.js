import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addActivityGoal as addActivityGoalAction,
  updateActivity as updateActivityAction
} from '../actions/activities';
import Collapsible from '../components/Collapsible';
import { Textarea } from '../components/Inputs2';

class ActivityDetailGoals extends Component {
  handleChange = (idx, key) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { goals: { [idx]: { [key]: value } } };
    updateActivity(activity.id, updates);
  };

  render() {
    const { activity, addActivityGoal } = this.props;

    return (
      <Collapsible title="Needs and Objectives" open>
        <div className="mb2">
          List the goals you’re hoping to accomplish as part of this activity:
        </div>
        {activity.goals.map((d, i) => (
          <div key={i} className="mb3">
            <Textarea
              name={`goal-${i}`}
              label={`Goal #${i + 1}`}
              rows="5"
              value={d.desc}
              onChange={this.handleChange(i, 'desc')}
            />
            <Textarea
              name={`obj-${i}`}
              label="Tell us how you’ll know when you’ve achieved this goal"
              value={d.obj}
              onChange={this.handleChange(i, 'obj')}
            />
          </div>
        ))}

        <button
          type="button"
          className="btn btn-primary bg-black"
          onClick={() => addActivityGoal(activity.id)}
        >
          Add goal
        </button>
      </Collapsible>
    );
  }
}

ActivityDetailGoals.propTypes = {
  activity: PropTypes.object.isRequired,
  addActivityGoal: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId }) => ({
  activity: byId[aId]
});

const mapDispatchToProps = {
  addActivityGoal: addActivityGoalAction,
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailGoals
);
