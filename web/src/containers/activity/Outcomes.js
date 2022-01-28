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
  removeOutcome,
  removeOutcomeMetric
} from '../../actions/editActivity';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';
import { selectOMsByActivityIndex } from '../../reducers/activities.selectors';

const Outcomes = ({
  activityIndex,
  add,
  addMetric,
  outcomes,
  remove,
  removeMetric
}) => {
  const handleAdd = () => {
    add(activityIndex);
  };

  const handleAddMetric = omIndex => {
    addMetric(activityIndex, omIndex);
  };

  const handleDelete = index => {
    remove(activityIndex, index);
  };

  const handleDeleteMetric = (omIndex, metricIndex) => {
    removeMetric(activityIndex, omIndex, metricIndex);
  };

  return (
    <Subsection
      resource="activities.outcomes"
      id={`activity-outcomes-${activityIndex}`}
    >
      <hr className="subsection-rule" />
      <FormAndReviewList
        activityIndex={activityIndex}
        addButtonText="Add Outcome"
        list={outcomes}
        collapsed={OutcomeAndMetricReview}
        expanded={OutcomeAndMetricForm}
        extraItemButtons={[
          { onClick: handleAddMetric, text: 'Add Metric to Outcome' }
        ]}
        removeMetric={handleDeleteMetric}
        noDataMessage={t('activities.outcomes.noDataNotice')}
        onAddClick={handleAdd}
        onDeleteClick={handleDelete}
        handleChange={() => {}}
        allowDeleteAll
      />
    </Subsection>
  );
};

Outcomes.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  addMetric: PropTypes.func.isRequired,
  outcomes: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  removeMetric: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  outcomes: selectOMsByActivityIndex(state, { activityIndex })
});

const mapDispatchToProps = {
  add: addOutcome,
  addMetric: addOutcomeMetric,
  remove: removeOutcome,
  removeMetric: removeOutcomeMetric
};

export default connect(mapStateToProps, mapDispatchToProps)(Outcomes);

export { Outcomes as plain, mapStateToProps, mapDispatchToProps };
