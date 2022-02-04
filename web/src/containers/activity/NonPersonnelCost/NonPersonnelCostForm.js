import { Dropdown } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useCallback, useReducer, forwardRef } from 'react';
import { connect } from 'react-redux';

import DollarField from '../../../components/DollarField';
import TextArea from '../../../components/TextArea';

import {
  saveNonPersonnelCost as actualSaveNonPersonnelCost
} from '../../../actions/editActivity';

const NonPersonnelCostForm = forwardRef(
  (
    {
      activityIndex,
      index,
      item,
      saveNonPersonnelCost
    },
    ref
) => {
  
  function reducer(state, action) {
    switch (action.type) {
      case 'updateField':
        return {
          ...state,
          [action.field]: action.value
        }
      case 'updateCosts':
        return {
          ...state,
          years: {
            ...state.years,
            [action.year]: action.value
          }
        }
      default:
        throw new Error(
          'Unrecognized action type provided to OutcomesAndMetricForm reducer'
        );
    }
  }
  
  const [state, dispatch] = useReducer(reducer, item);
  
  const handleSubmit = e => {
    e.preventDefault();
    saveNonPersonnelCost(activityIndex, index, state);
  };
  
  const editCategory = useCallback(
    ({ target: { value } }) => dispatch({ type: 'updateField', field: 'category', value }),
    [index]
  );

  const editDesc = useCallback(
    ({ target: { value } }) => dispatch({ type: 'updateField', field: 'description', value }),
    [index]
  );

  const getEditCostForYear = useCallback(
    year => ({ target: { value } }) =>
      dispatch({ type: 'updateCosts', year, value }),
    [index]
  );

  const categories = [
    'Hardware, software, and licensing',
    'Equipment and supplies',
    'Training and outreach',
    'Travel',
    'Administrative operations',
    'Miscellaneous expenses for the project'
  ].map(category => ({ label: category, value: category }));
  categories.unshift({label:'Select an option', value:''})
  return (
    <form index={index} ref={ref} onSubmit={handleSubmit}>
      <h6 className="ds-h4">Non-Personnel Cost {index + 1}:</h6>
      {/* eslint-disable jsx-a11y/no-autofocus */}
      <Dropdown
        autoFocus
        label="Category"
        name="category"
        options={categories}
        value={state.category}
        onChange={editCategory}
      />

      <TextArea
        label="Description"
        rows={5}
        name="desc"
        value={state.description}
        onChange={editDesc}
      />

      {Object.entries(state.years).map(([year, cost]) => (
        <DollarField
          key={year}
          label={`FFY ${year} Cost`}
          name="cost"
          size="medium"
          value={cost}
          onChange={getEditCostForYear(year)}
        />
      ))}
    </form>
  );
}
);

NonPersonnelCostForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    years: PropTypes.object.isRequired
  }).isRequired,
  saveNonPersonnelCost: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  saveNonPersonnelCost: actualSaveNonPersonnelCost
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  NonPersonnelCostForm
);

export { NonPersonnelCostForm as plain, mapDispatchToProps };
