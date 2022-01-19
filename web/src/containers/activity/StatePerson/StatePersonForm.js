import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useCallback, useReducer, forwardRef } from 'react';
import { connect } from 'react-redux';

import TextArea from '../../../components/TextArea';
import PersonCostForm from '../../../components/PersonCostForm';

import {
  savePersonnel as actualSavePersonnel
} from '../../../actions/editActivity';

const StatePersonForm = forwardRef(
  (
    {
      activityIndex,
      item,
      index,
      savePersonnel
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
            [action.year]: {
              ...state.years[action.year],
              amt: action.value
            }
          }
        }
      case 'updateFte':
        return {
          ...state,
          years: {
            ...state.years,
            [action.year]: {
              ...state.years[action.year],
              perc: action.value
            }
          }
        }
      default:
        throw new Error(
          'Unrecognized action type provided to OutcomesAndMetricForm reducer'
        );
    }
  }
  
  const [state, dispatch] = useReducer(reducer, item);
  
  const editTitle = useCallback(
    ({ target: { value } }) => dispatch({ type: 'updateField', field: 'title', value }),
    [index]
  );

  const editDesc = useCallback(
    ({ target: { value } }) => dispatch({ type: 'updateField', field: 'description', value }),
    [index]
  );

  const getEditCostForYear = useCallback(
    (year, value) => {
      dispatch({ type: 'updateCosts', year, value });
    },
    [index]
  );

  const getEditFTEForYear = useCallback(
    (year, value) => {
      dispatch({ type: 'updateFte', year, value });
    },
    [index]
  );
  
  const handleSubmit = e => {
    e.preventDefault();
    savePersonnel(activityIndex, index, state);
  };

  return (
    <form index={index} ref={ref} onSubmit={handleSubmit}>
      <h6 className="ds-h4">Personnel {index + 1}:</h6>
      <TextField
        autoFocus
        label="Personnel title"
        name="title"
        value={state.title}
        onChange={editTitle}
      />
      <TextArea
        label="Description"
        rows={5}
        name="desc"
        value={state.description}
        onChange={editDesc}
      />
      <PersonCostForm
        items={state.years}
        setCost={getEditCostForYear}
        setFTE={getEditFTEForYear}
      />
    </form>
  );
}
);

StatePersonForm.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    years: PropTypes.object.isRequired
  }).isRequired,
  savePersonnel: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  savePersonnel: actualSavePersonnel
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  StatePersonForm
);

export { StatePersonForm as plain, mapDispatchToProps };
