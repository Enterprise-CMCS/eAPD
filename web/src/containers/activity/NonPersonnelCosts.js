import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';

import FormAndReviewList from '../../components/FormAndReviewList';
import {
  NonPersonnelCostForm,
  NonPersonnelCostReview
} from './NonPersonnelCost';

// import NonPersonnelCost from './NonPersonnelCost';
import {
  addActivityExpense,
  removeActivityExpense,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import { selectActivityNonPersonnelCosts } from '../../reducers/activities.selectors';
import Instruction from '../../components/Instruction';
import { t } from '../../i18n';

const NonPersonnelCosts = ({
  activityKey,
  addExpense,
  expenses,
  removeExpense,
  updateActivity
}) => {
  const handleDelete = useCallback(key => {
    removeExpense(activityKey, key);
  });

  const handleAdd = useCallback(() => {
    addExpense(activityKey);
  });

  const handleEditCategory = useCallback((index, category) => {
    updateActivity(activityKey, { expenses: { [index]: { category } } });
  });

  const handleEditCost = useCallback((index, year, cost) => {
    updateActivity(
      activityKey,
      {
        expenses: { [index]: { years: { [year]: cost } } }
      },
      true
    );
  });

  const handleEditDesc = useCallback((index, desc) => {
    updateActivity(activityKey, { expenses: { [index]: { desc } } });
  });

  return (
    <Fragment>
      <Instruction source="activities.expenses.instruction" />
      <FormAndReviewList
        addButtonText="Add another non-personnel cost"
        list={expenses}
        collapsed={NonPersonnelCostReview}
        expanded={NonPersonnelCostForm}
        noDataMessage={t('activities.expenses.noDataNotice')}
        onAddClick={handleAdd}
        onDeleteClick={handleDelete}
        handleEditCategory={handleEditCategory}
        handleEditCost={handleEditCost}
        handleEditDesc={handleEditDesc}
      />
    </Fragment>
  );
};

NonPersonnelCosts.propTypes = {
  activityKey: PropTypes.string.isRequired,
  expenses: PropTypes.array.isRequired,
  addExpense: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = (state, { aKey }) => ({
  activityKey: aKey,
  expenses: selectActivityNonPersonnelCosts(state, aKey)
});

const mapDispatchToProps = {
  addExpense: addActivityExpense,
  removeExpense: removeActivityExpense,
  updateActivity: updateActivityAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonPersonnelCosts);

export { NonPersonnelCosts as plain, mapStateToProps, mapDispatchToProps };
