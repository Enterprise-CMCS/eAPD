import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useReducer, forwardRef } from 'react';
import { connect } from 'react-redux';

import TextArea from '../../../../../components/TextArea';
import PersonCostForm from '../../../../../components/PersonCostForm';

import { savePersonnel as actualSavePersonnel } from '../../../../../redux/actions/editActivity';

const StatePersonForm = forwardRef(
  ({ activityIndex, item, index, savePersonnel }, ref) => {
    StatePersonForm.displayName = 'StatePersonForm';

    function reducer(state, action) {
      switch (action.type) {
        case 'updateField':
          return {
            ...state,
            [action.field]: action.value
          };
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
          };
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
          };
        default:
          throw new Error(
            'Unrecognized action type provided to OutcomesAndMetricForm reducer'
          );
      }
    }

    const [state, dispatch] = useReducer(reducer, item);

    const editTitle = ({ target: { value } }) =>
      dispatch({ type: 'updateField', field: 'title', value });

    const editDesc = ({ target: { value } }) =>
      dispatch({ type: 'updateField', field: 'description', value });

    const getEditCostForYear = (year, value) =>
      dispatch({ type: 'updateCosts', year, value });

    const getEditFTEForYear = (year, value) =>
      dispatch({ type: 'updateFte', year, value });

    const handleSubmit = e => {
      e.preventDefault();
      savePersonnel(activityIndex, index, state);
    };

    return (
      <form index={index} onSubmit={handleSubmit}>
        <h6 className="ds-h4">Personnel {index + 1}:</h6>
        <TextField
          label="Personnel title"
          name="title"
          value={state.title}
          onChange={editTitle}
          className="remove-clearfix"
        />
        <TextArea
          label="Description"
          rows={5}
          name="desc"
          value={state.description}
          onChange={editDesc}
          className="remove-clearfix"
        />
        <PersonCostForm
          items={state.years}
          setCost={getEditCostForYear}
          setFTE={getEditFTEForYear}
        />
        <input
          className="ds-u-visibility--hidden"
          type="submit"
          ref={ref}
          hidden
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
