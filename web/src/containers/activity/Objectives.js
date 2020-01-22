import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import {
  ObjectiveAndKeyResultForm,
  ObjectiveAndKeyResultReview
} from './ObjectivesAndKeyResults';
import FormAndReviewList from '../../components/FormAndReviewList';
import {
  addObjective,
  addObjectiveKeyResult,
  removeObjective
} from '../../actions/editActivity';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';
import { selectOKRsByActivityIndex } from '../../reducers/activities.selectors';

const Objectives = ({
  activityIndex,
  add,
  addKeyResult,
  objectives,
  remove
}) => {
  const handleAdd = () => {
    add(activityIndex);
  };

  const handleAddKeyResult = okrIndex => {
    addKeyResult(activityIndex, okrIndex);
  };

  const handleDelete = key => {
    objectives.forEach(({ key: okrKey }, i) => {
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
        addButtonText="Add another objective"
        list={objectives}
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

Objectives.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  addKeyResult: PropTypes.func.isRequired,
  objectives: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  objectives: selectOKRsByActivityIndex(state, { activityIndex })
});

const mapDispatchToProps = {
  add: addObjective,
  addKeyResult: addObjectiveKeyResult,
  remove: removeObjective
};

export default connect(mapStateToProps, mapDispatchToProps)(Objectives);

export { Objectives as plain, mapStateToProps, mapDispatchToProps };
