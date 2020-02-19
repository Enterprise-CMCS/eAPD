import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

import { addPersonnel, removePersonnel } from '../../actions/editActivity';
import { selectActivityStatePersonnel } from '../../reducers/activities.selectors';

import Instruction from '../../components/Instruction';
import { t } from '../../i18n';

import FormAndReviewList from '../../components/FormAndReviewList';
import { StatePersonForm, StatePersonReview } from './StatePerson';

const StatePersonnel = ({ activityIndex, add, personnel, remove }) => {
  const handleDelete = useCallback(key => {
    personnel.forEach(({ key: personnelKey }, i) => {
      if (personnelKey === key) {
        remove(activityIndex, i);
      }
    });
  });

  const handleAdd = useCallback(() => add(activityIndex));

  return (
    <Fragment>
      <Instruction source="activities.statePersonnel.instruction" />
      <FormAndReviewList
        activityIndex={activityIndex}
        addButtonText={t('activities.statePersonnel.addButtonText')}
        list={personnel}
        collapsed={StatePersonReview}
        expanded={StatePersonForm}
        noDataMessage={t('activities.statePersonnel.noDataNotice')}
        onAddClick={handleAdd}
        onDeleteClick={handleDelete}
      />
    </Fragment>
  );
};

StatePersonnel.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  personnel: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  personnel: selectActivityStatePersonnel(state, { activityIndex })
});

const mapDispatchToProps = {
  add: addPersonnel,
  remove: removePersonnel
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatePersonnel);

export { StatePersonnel as plain, mapStateToProps, mapDispatchToProps };
