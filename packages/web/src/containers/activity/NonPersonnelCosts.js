import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import FormAndReviewList from '../../components/FormAndReviewList';
import {
  NonPersonnelCostForm,
  NonPersonnelCostReview
} from './NonPersonnelCost';

import {
  removeNonPersonnelCost
} from '../../actions/editActivity';

import { newExpense } from '../../reducers/activities';

import { selectApdYears } from '../../reducers/apd.selectors';

import { selectActivityNonPersonnelCosts } from '../../reducers/activities.selectors';
import Instruction from '../../components/Instruction';
import { t } from '../../i18n';

const NonPersonnelCosts = ({
  activityIndex,
  expenses,
  removeExpense,
  years
}) => {
  const [localList, setLocalList] = useState(expenses);

  useEffect(() => {
    setLocalList(expenses)
  }, [expenses])
  
  const handleAdd = () => {
    const newListItem = newExpense(years);
    setLocalList([...localList, newListItem]);
  };
  
  const handleDelete = index => {
    removeExpense(activityIndex, index);
  };
  
  const onCancel = () => {
    setLocalList(expenses);
  };

  return (
    <Fragment>
      <Instruction source="activities.expenses.instruction" />
      <FormAndReviewList
        activityIndex={activityIndex}
        addButtonText={t('activities.expenses.addButtonText')}
        list={localList}
        collapsed={NonPersonnelCostReview}
        expanded={NonPersonnelCostForm}
        noDataMessage={t('activities.expenses.noDataNotice')}
        onAddClick={handleAdd}
        onCancelClick={onCancel}
        onDeleteClick={handleDelete}
        allowDeleteAll
      />
    </Fragment>
  );
};

NonPersonnelCosts.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  expenses: PropTypes.array.isRequired,
  removeExpense: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  expenses: selectActivityNonPersonnelCosts(state, activityIndex),
  years: selectApdYears(state)
});

const mapDispatchToProps = {
  removeExpense: removeNonPersonnelCost
};

export default connect(mapStateToProps, mapDispatchToProps)(NonPersonnelCosts);

export { NonPersonnelCosts as plain, mapStateToProps, mapDispatchToProps };
