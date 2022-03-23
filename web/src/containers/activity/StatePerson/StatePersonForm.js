import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer, forwardRef } from 'react';
import { connect } from 'react-redux';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import TextArea from '../../../components/TextArea';
import PersonCostForm from '../../../components/PersonCostForm';

import statePersonnelSchema from '../../../static/schemas/statePersonnel';

import {
  savePersonnel as actualSavePersonnel
} from '../../../actions/editActivity';

const StatePersonForm = forwardRef(
  (
    {
      activityIndex,
      item,
      index,
      savePersonnel,
      setFormValid
    },
  ref
) => {
  StatePersonForm.displayName = 'StatePersonForm';
  
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isValidating },
    getValues
  } = useForm({
    defaultValues: {
      ...item
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: joiResolver(statePersonnelSchema)
  });

  function reducer(state, action) {
    switch (action.type) {
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

  const getEditCostForYear = (year, value) => dispatch({ type: 'updateCosts', year, value });

  const getEditFTEForYear = (year, value) => dispatch({ type: 'updateFte', year, value });
  
  const onSubmit = e => {
    e.preventDefault();
    savePersonnel(activityIndex, index, getValues());
  };
  useEffect(() => {
    console.log("item", item);
    console.log("errors", errors);
    console.log("values", getValues());    
  }, [isValidating])
  return (
    <form index={index} onSubmit={onSubmit}>
      <h6 className="ds-h4">Personnel {index + 1}:</h6>
      <Controller
        control={control}
        name="title"
        render={({
          field: { onChange, value, ...props }
        }) => (
          <TextField
            {...props}
            label="Personnel title"
            name="title"
            value={value}
            onChange={onChange}
            className="remove-clearfix"
            errorMessage={
              errors?.title?.message
            }
          />
        )}
      />
      
      <Controller
        control={control}
        name="description"
        render={({
          field: { onChange, value, ...props }
        }) => (
          <TextArea
            {...props}
            label="Description"
            rows={5}
            value={value}
            onChange={onChange}
            className="remove-clearfix"
            errorMessage={
              errors?.description?.message
            }
          />
        )}
      />
      
      <div className="ds-u-margin-top--3">
        <Controller
          control={control}
          name="years"
          render={({
            field: { onChange, value, ...props }
          }) => (
            <PersonCostForm
              items={value}
              onChange={onChange}
              // setCost={getEditCostForYear}
              // setFTE={getEditFTEForYear}
            />
          )}
        />
      </div>
      <input className="ds-u-visibility--hidden" type="submit" ref={ref} hidden />
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
