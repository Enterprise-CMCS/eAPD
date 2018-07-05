import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import {
  addActivityGoal as addActivityGoalAction,
  removeActivityGoal as removeActivityGoalAction,
  updateActivity as updateActivityAction
} from '../actions/activities';
import { Chunk, Subsection } from '../components/Section';
import { RichText } from '../components/Inputs';
import { isProgamAdmin } from '../util';

class ActivityDetailGoals extends Component {
  handleSync = (idx, key) => html => {
    const { activity, updateActivity } = this.props;
    const updates = { goals: { [idx]: { [key]: html } } };
    updateActivity(activity.id, updates);
  };

  handleDelete = idx => () => {
    const { activity, removeActivityGoal } = this.props;
    removeActivityGoal(activity.id, idx);
  };

  handleAdd = () => {
    const { activity, addActivityGoal } = this.props;
    addActivityGoal(activity.id);
  };

  render() {
    const { activity } = this.props;

    return (
      <Subsection resource="activities.goals" isKey={isProgamAdmin(activity)}>
        {activity.goals.map((d, i) => (
          <div key={i} className="mb3">
            <Chunk resource="activities.goals.goal">
              <div className="mb3">
                <div className="mb-tiny">
                  {activity.goals.length > 1 && (
                    <button
                      type="button"
                      className="px1 py-tiny right btn btn-outline border-silver h6 line-height-1"
                      onClick={this.handleDelete(i)}
                    >
                      Remove
                    </button>
                  )}
                  {t('activities.goals.goal.title', { number: i + 1 })}
                </div>
                <RichText
                  content={d.desc}
                  onSync={this.handleSync(i, 'desc')}
                />
              </div>
            </Chunk>
            <Chunk resource="activities.goals.objective">
              <div className="mb3">
                <div className="mb-tiny">
                  {t('activities.goals.objective.title')}
                </div>
                <RichText content={d.obj} onSync={this.handleSync(i, 'obj')} />
              </div>
            </Chunk>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-primary bg-black"
          onClick={this.handleAdd}
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
