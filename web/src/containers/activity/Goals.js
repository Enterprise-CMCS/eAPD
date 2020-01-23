import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { GoalForm, GoalReview } from './Goal';
import FormAndReviewList from '../../components/FormAndReviewList';
import { addGoal, removeGoal } from '../../actions/editActivity';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';
import { selectGoalsByActivityIndex } from '../../reducers/activities.selectors';

const Goals = ({ activityIndex, add, goals, remove }) => {
  const handleAdd = () => {
    add(activityIndex);
  };

  const handleDelete = key => {
    goals.forEach(({ key: goalKey }, i) => {
      if (goalKey === key) {
        remove(activityIndex, i);
      }
    });
  };

  return (
    <Subsection
      resource="activities.goals"
      id={`activity-goals-${activityIndex}`}
    >
      <FormAndReviewList
        activityIndex={activityIndex}
        addButtonText="Add a goal"
        list={goals}
        collapsed={GoalReview}
        expanded={GoalForm}
        noDataMessage={t('activities.expenses.noDataNotice')}
        onAddClick={handleAdd}
        onDeleteClick={handleDelete}
        handleChange={() => {}}
      />
    </Subsection>
  );
};

Goals.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  goals: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  goals: selectGoalsByActivityIndex(state, { activityIndex })
});

const mapDispatchToProps = {
  add: addGoal,
  remove: removeGoal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Goals);

export { Goals as plain, mapStateToProps, mapDispatchToProps };
