import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  ObjectiveAndKeyResultForm,
  ObjectiveAndKeyResultReview
} from './ObjectivesAndKeyResults';
import FormAndReviewList from '../../components/FormAndReviewList';
import { addObjectiveKeyResult } from '../../actions/editActivity';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';
import { selectOKRsByActivityIndex } from '../../reducers/activities.selectors';

const Goals = ({ activityIndex, add, addKeyResult, okrs, remove }) => {
  const handleAdd = () => {
    add(activityIndex);
  };

  const handleAddKeyResult = okrIndex => {
    addKeyResult(activityIndex, okrIndex);
  };

  const handleDelete = key => {
    okrs.forEach(({ key: okrKey }, i) => {
      if (okrKey === key) {
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
        list={okrs}
        collapsed={ObjectiveAndKeyResultReview}
        expanded={ObjectiveAndKeyResultForm}
        extraItemButtons={[
          { onClick: handleAddKeyResult, text: 'Add another key result' }
        ]}
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
  okrs: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  addKeyResult: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  okrs: selectOKRsByActivityIndex(state, { activityIndex })
});

const mapDispatchToProps = {
  addKeyResult: addObjectiveKeyResult
};

export default connect(mapStateToProps, mapDispatchToProps)(Goals);

export { Goals as plain, mapStateToProps, mapDispatchToProps };
