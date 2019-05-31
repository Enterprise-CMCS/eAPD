import { Button, Review, TextField } from '@cmsgov/design-system-core';

import PropTypes from 'prop-types';
import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux';

import {
  addActivityGoal as addActivityGoalAction,
  removeActivityGoal as removeActivityGoalAction,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import NoDataMsg from '../../components/NoDataMsg';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';

const GoalReview = ({ goal, idx, edit, handleDelete }) => (
  <Review
    heading={
      <h5 className="ds-h4">
        {idx + 1}. {goal.description}
      </h5>
    }
    editHref="#"
    onEditClick={edit}
    editContent={
      <div className="nowrap">
        <Button size="small" variation="transparent" onClick={edit}>
          Edit
        </Button>
        {handleDelete && (
          <Fragment>
            |
            <Button size="small" variation="transparent" onClick={handleDelete}>
              Remove
            </Button>
          </Fragment>
        )}
      </div>
    }
  >
    <p className="ds-u-margin-top--2">
      <strong>Benchmark:</strong> {goal.objective}
    </p>
  </Review>
);

GoalReview.propTypes = {
  edit: PropTypes.func.isRequired,
  goal: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
  idx: PropTypes.number.isRequired
};

GoalReview.defaultProps = {
  handleDelete: null
};

const GoalForm = ({ goal, idx, done, handleChange }) => (
  <div className="ds-u-padding-bottom--2 ds-u-border-bottom--2">
    <TextField
      name="name"
      className="data-entry-box"
      label={t('activities.goals.description.input.label', {
        defaultValue: ''
      })}
      hint={t('activities.goals.description.input.hint', {
        defaultValue: ''
      })}
      value={goal.description}
      onChange={handleChange(idx, 'description')}
    />

    <TextField
      name="milestones"
      className="data-entry-box"
      label={t('activities.goals.objective.input.label', {
        defaultValue: 'Benchmarks'
      })}
      multiline
      rows={6}
      hint={t('activities.goals.objective.input.hint', {
        defaultValue: ''
      })}
      value={goal.objective}
      onChange={handleChange(idx, 'objective')}
    />

    <Button variation="primary" className="ds-u-margin-top--4" onClick={done}>
      Done
    </Button>
  </div>
);

GoalForm.propTypes = {
  goal: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  done: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

const Goal = ({ goal, idx, initialExpanded, handleChange, handleDelete }) => {
  const [collapsed, setCollapsed] = useState(!initialExpanded);

  if (collapsed) {
    return (
      <GoalReview
        goal={goal}
        idx={idx}
        edit={() => setCollapsed(false)}
        handleDelete={handleDelete}
      />
    );
  }

  return (
    <GoalForm
      goal={goal}
      idx={idx}
      handleChange={handleChange}
      handleDelete={handleDelete}
      done={() => setCollapsed(true)}
    />
  );
};

Goal.propTypes = {
  goal: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  idx: PropTypes.number.isRequired,
  initialExpanded: PropTypes.bool
};

Goal.defaultProps = {
  handleDelete: null,
  initialExpanded: false
};

class Goals extends Component {
  getDeleter = key => () => {
    const { activityKey, removeActivityGoal } = this.props;
    removeActivityGoal(activityKey, key);
  };

  handleAdd = () => {
    const { activityKey, addActivityGoal } = this.props;
    addActivityGoal(activityKey);
  };

  handleChange = (index, field) => ({ target: { value } }) => {
    const { activityKey, updateActivity } = this.props;
    const updates = { goals: { [index]: { [field]: value } } };
    updateActivity(activityKey, updates);
  };

  render() {
    const { goals } = this.props;

    return (
      <Subsection resource="activities.goals" nested>
        {goals.length === 0 ? (
          <NoDataMsg>{t('activities.expenses.noDataNotice')}</NoDataMsg>
        ) : (
          <div className="ds-u-border-top--1">
            {goals.map((goal, i) => (
              <Goal
                key={goal.key}
                goal={goal}
                idx={i}
                initialExpanded={goal.expanded}
                handleChange={this.handleChange}
                handleDelete={
                  goals.length > 1 ? this.getDeleter(goal.key) : null
                }
              />
            ))}
          </div>
        )}

        <Button
          className="ds-u-margin-top--4 visibility--screen"
          onClick={this.handleAdd}
        >
          Add a goal
        </Button>
        <hr />
      </Subsection>
    );
  }
}

Goals.propTypes = {
  activityKey: PropTypes.string.isRequired,
  goals: PropTypes.array.isRequired,
  addActivityGoal: PropTypes.func.isRequired,
  removeActivityGoal: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byKey } }, { aKey }) => ({
  activityKey: aKey,
  goals: byKey[aKey].goals
});

const mapDispatchToProps = {
  addActivityGoal: addActivityGoalAction,
  removeActivityGoal: removeActivityGoalAction,
  updateActivity: updateActivityAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Goals);

export {
  Goals as plain,
  Goal,
  GoalForm,
  GoalReview,
  mapStateToProps,
  mapDispatchToProps
};
