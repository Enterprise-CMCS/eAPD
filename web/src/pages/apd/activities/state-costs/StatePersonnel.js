import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Instruction from '../../../../components/Instruction';
import { t } from '../../../../i18n';

import FormAndReviewList from '../../../../components/FormAndReviewList';
import { StatePersonForm, StatePersonReview } from './StatePerson';

import { selectActivityStatePersonnel } from '../../../../redux/selectors/activities.selectors';
import {
  selectApdYears,
  selectApdType
} from '../../../../redux/selectors/apd.selectors';
import { newStatePerson } from '../../../../redux/reducers/activities';
import { removePersonnel } from '../../../../redux/actions/editActivity';

const StatePersonnel = ({
  activityIndex,
  personnel,
  remove,
  years,
  apdType
}) => {
  const [localList, setLocalList] = useState(personnel);

  useEffect(() => {
    setLocalList(personnel);
  }, [personnel]);

  const handleAdd = () => {
    const newListItem = newStatePerson(years);
    setLocalList([...localList, newListItem]);
  };

  const handleDelete = index => {
    remove(activityIndex, index);
  };

  const onCancel = () => setLocalList(personnel);

  return (
    <Fragment>
      <Instruction source={`activities.statePersonnel.instruction${apdType}`} />
      <FormAndReviewList
        activityIndex={activityIndex}
        addButtonText={t('activities.statePersonnel.addButtonText')}
        list={localList}
        collapsed={StatePersonReview}
        expanded={StatePersonForm}
        noDataMessage={t('activities.statePersonnel.noDataNotice')}
        onAddClick={handleAdd}
        onCancelClick={onCancel}
        onDeleteClick={handleDelete}
        allowDeleteAll
      />
    </Fragment>
  );
};

StatePersonnel.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  personnel: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
  apdType: PropTypes.string.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  personnel: selectActivityStatePersonnel(state, { activityIndex }),
  years: selectApdYears(state),
  apdType: selectApdType(state)
});

const mapDispatchToProps = {
  remove: removePersonnel
};

export default connect(mapStateToProps, mapDispatchToProps)(StatePersonnel);

export { StatePersonnel as plain, mapStateToProps, mapDispatchToProps };
