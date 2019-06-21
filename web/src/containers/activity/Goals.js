import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GoalForm, GoalReview } from './Goal';
import FormAndReviewList from '../../components/FormAndReviewList';
import {
  addActivityGoal as addActivityGoalAction,
  removeActivityGoal as removeActivityGoalAction,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';

class Goals extends Component {
  handleDelete = key => {
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
        <FormAndReviewList
          addButtonText="Add a goal"
          list={goals}
          collapsed={GoalReview}
          expanded={GoalForm}
          noDataMessage={t('activities.expenses.noDataNotice')}
          onAddClick={this.handleAdd}
          handleChange={this.handleChange}
          onDeleteClick={this.handleDelete}
        />
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

export { Goals as plain, mapStateToProps, mapDispatchToProps };
