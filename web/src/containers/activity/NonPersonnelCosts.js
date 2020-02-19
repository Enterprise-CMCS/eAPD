import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

import FormAndReviewList from '../../components/FormAndReviewList';
import {
  NonPersonnelCostForm,
  NonPersonnelCostReview
} from './NonPersonnelCost';

import {
  addNonPersonnelCost,
  removeNonPersonnelCost
} from '../../actions/editActivity';
import { selectActivityNonPersonnelCosts } from '../../reducers/activities.selectors';
import Instruction from '../../components/Instruction';
import { t } from '../../i18n';

const NonPersonnelCosts = ({
  activityIndex,
  addExpense,
  expenses,
  removeExpense
}) => {
  const handleDelete = useCallback(key => {
    expenses.forEach(({ key: expenseKey }, i) => {
      if (expenseKey === key) {
        removeExpense(activityIndex, i);
      }
    });
  });

  const handleAdd = useCallback(() => {
    addExpense(activityIndex);
  });

  return (
    <Fragment>
      <Instruction source="activities.expenses.instruction" />
      <FormAndReviewList
        activityIndex={activityIndex}
        addButtonText="Add another non-personnel cost"
        list={expenses}
        collapsed={NonPersonnelCostReview}
        expanded={NonPersonnelCostForm}
        noDataMessage={t('activities.expenses.noDataNotice')}
        onAddClick={handleAdd}
        onDeleteClick={handleDelete}
      />
    </Fragment>
  );
};

NonPersonnelCosts.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  expenses: PropTypes.array.isRequired,
  addExpense: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired
};

const mapStateToProps = (state, { activityIndex }) => ({
  expenses: selectActivityNonPersonnelCosts(state, activityIndex)
});

const mapDispatchToProps = {
  addExpense: addNonPersonnelCost,
  removeExpense: removeNonPersonnelCost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonPersonnelCosts);

export { NonPersonnelCosts as plain, mapStateToProps, mapDispatchToProps };
