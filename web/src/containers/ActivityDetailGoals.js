import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import {
  addActivityGoal as addActivityGoalAction,
  removeActivityGoal as removeActivityGoalAction,
  updateActivity as updateActivityAction
} from '../actions/activities';
import { Subsection } from '../components/Section';
import { Textarea } from '../components/Inputs';
import HelpText from '../components/HelpText';

class ActivityDetailGoals extends Component {
  handleChange = (idx, key) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const updates = { goals: { [idx]: { [key]: value } } };
    updateActivity(activity.id, updates);
  };

  render() {
    const { activity, addActivityGoal, removeActivityGoal } = this.props;

    return (
      <Subsection resource="activities.goals">
        {activity.goals.map((d, i) => (
          <div key={i} className="mb3">
            {activity.goals.length > 1 && (
              <button
                type="button"
                className="mb-tiny px1 py-tiny right btn btn-outline border-silver h6 line-height-1"
                onClick={() => removeActivityGoal(activity.id, i)}
              >
                Remove
              </button>
            )}
            <HelpText
              text="activities.goals.goal.helpText"
              reminder="activities.goals.goal.reminder"
            />
            <Textarea
              name={`goal-${i}`}
              label={t('activities.goals.goal.title', { number: i + 1 })}
              rows="5"
              value={d.desc}
              onChange={this.handleChange(i, 'desc')}
            />
            <HelpText
              text="activities.goals.objective.helpText"
              reminder="activities.goals.objective.reminder"
            />
            <Textarea
              name={`obj-${i}`}
              label={t('activities.goals.objective.title')}
              rows="4"
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
          {t('activities.goals.addGoalButtonText')}
        </button>
      </Subsection>
    );
  }
}

ActivityDetailGoals.propTypes = {
  activity: PropTypes.object.isRequired,
  addActivityGoal: PropTypes.func.isRequired,
  removeActivityGoal: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId }) => ({
  activity: byId[aId]
});

const mapDispatchToProps = {
  addActivityGoal: addActivityGoalAction,
  removeActivityGoal: removeActivityGoalAction,
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailGoals
);
