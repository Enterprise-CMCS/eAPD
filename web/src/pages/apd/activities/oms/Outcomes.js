import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  OutcomeAndMetricForm,
  OutcomeAndMetricReview
} from './OutcomesAndMetrics';
import FormAndReviewList from '../../../../components/FormAndReviewList';
import { removeOutcome } from '../../../../redux/actions/editActivity';
import { Subsection } from '../../../../components/Section';
import { t } from '../../../../i18n';
import { selectOMsByActivityIndex } from '../../../../redux/selectors/activities.selectors';

import { newOutcome } from '../../../../redux/reducers/activities';
import { selectApdType } from '../../../../redux/selectors/apd.selectors';

const Outcomes = ({ activityIndex, outcomes, remove, apdType }) => {
  const [localList, setLocalList] = useState(outcomes);

  useEffect(() => {
    setLocalList(outcomes);
  }, [outcomes]);

  const handleAdd = () => {
    const newListItem = newOutcome();
    setLocalList([...localList, newListItem]);
  };

  const handleDelete = index => {
    remove(activityIndex, index);
  };

  const onCancel = () => {
    setLocalList(outcomes);
  };

  return (
    <Subsection
      resource={`activities.outcomes.outcomes${apdType}`}
      id={`activity-outcomes-${activityIndex}`}
    >
      <hr className="subsection-rule" />
      <FormAndReviewList
        activityIndex={activityIndex}
        addButtonText="Add Outcome"
        list={localList}
        collapsed={OutcomeAndMetricReview}
        expanded={OutcomeAndMetricForm}
        noDataMessage={t('activities.outcomes.noDataNotice')}
        onAddClick={handleAdd}
        onCancelClick={onCancel}
        onDeleteClick={handleDelete}
        allowDeleteAll
      />
    </Subsection>
  );
};

Outcomes.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  outcomes: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  apdType: PropTypes.string
};

const mapStateToProps = (state, { activityIndex }) => ({
  outcomes: selectOMsByActivityIndex(state, { activityIndex }),
  apdType: selectApdType(state)
});

const mapDispatchToProps = {
  remove: removeOutcome
};

export default connect(mapStateToProps, mapDispatchToProps)(Outcomes);
export { Outcomes as plain, mapStateToProps, mapDispatchToProps };
