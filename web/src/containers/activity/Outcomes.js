import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  OutcomeAndMetricForm,
  OutcomeAndMetricReview
} from './OutcomesAndMetrics';
import FormAndReviewList from '../../components/FormAndReviewList';
import {
  removeOutcome,
} from '../../actions/editActivity';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';
import { selectOMsByActivityIndex } from '../../reducers/activities.selectors';

import { newOutcome } from '../../reducers/activities.js';

const Outcomes = ({
  activityIndex,
  list,
  remove
}) => {
  const [localList, setLocalList] = useState(list);
        
  useEffect(() => {
    console.log("useEffect called with list", list);
    setLocalList(list)
  }, [list])
  
  const handleAdd = () => {
    const newListItem = newOutcome();
    setLocalList([...localList, newListItem]);
  };
  
  const handleDelete = index => {
    remove(activityIndex, index);
  };
  
  const onCancel = e => {
    setLocalList(list);
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
        list={localList}
        collapsed={OutcomeAndMetricReview}
        expanded={OutcomeAndMetricForm}
        noDataMessage={t('activities.outcomes.noDataNotice')}
        onAddClick={handleAdd}
        onCancelClick={onCancel}
        onDeleteClick={handleDelete}
        handleChange={() => {}}
        allowDeleteAll
      />
    </Subsection>
  );
};

Outcomes.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  list: selectOMsByActivityIndex(state, { activityIndex })
});

const mapDispatchToProps = {
  remove: removeOutcome
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Outcomes);
export { Outcomes as plain, mapStateToProps, mapDispatchToProps };
