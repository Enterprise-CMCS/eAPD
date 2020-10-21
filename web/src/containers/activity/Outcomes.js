import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  OutcomeAndMetricForm,
  OutcomeAndMetricReview
} from './OutcomesAndMetrics';
import FormAndReviewList from '../../components/FormAndReviewList';
import {
  addOutcome,
  addOutcomeMetric,
  removeOutcome
} from '../../actions/editActivity';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';
import { selectOMsByActivityIndex } from '../../reducers/activities.selectors';

const Outcomes = ({ activityIndex, add, addMetric, outcomes, remove }) => {
  const handleAdd = () => {
    add(activityIndex);
  };

  const handleAddMetric = omIndex => {
    addMetric(activityIndex, omIndex);
  };

  const handleDelete = index => {
    remove(activityIndex, index);
  };

  return (
    <Subsection
      resource="activities.outcomes"
      id={`activity-outcomes-${activityIndex}`}
    >
      <FormAndReviewList
        activityIndex={activityIndex}
        addButtonText="Add another outcome"
        list={outcomes}
        collapsed={OutcomeAndMetricReview}
        expanded={OutcomeAndMetricForm}
        extraItemButtons={[
          { onClick: handleAddMetric, text: 'Add another metric' }
        ]}
        noDataMessage={t('activities.expenses.noDataNotice')}
        onAddClick={handleAdd}
        onDeleteClick={handleDelete}
        handleChange={() => {}}
      />
    </Subsection>
  );
};

Outcomes.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  addMetric: PropTypes.func.isRequired,
  outcomes: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  outcomes: selectOMsByActivityIndex(state, { activityIndex })
});

const mapDispatchToProps = {
  add: addOutcome,
  addMetric: addOutcomeMetric,
  remove: removeOutcome
};

export default connect(mapStateToProps, mapDispatchToProps)(Outcomes);

export { Outcomes as plain, mapStateToProps, mapDispatchToProps };
