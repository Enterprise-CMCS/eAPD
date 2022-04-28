import { DateField as DSDateField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useReducer, useEffect, useMemo } from 'react';
import { isNumeric } from '../util/formats';

const dateParts = value => {
  if (!value) {
    return {
      day: '',
      month: '',
      year: ''
    };
  }
  const [year, month, day] = value.trim().slice(0, 10).split('-');
  console.log({year, month, day})
  return { day: +day || '', month: +month || '', year: +year || '' };
};

const formatDate = ({ day = '', month = '', year = '' } = {}) => {
  if (day === '' && month === '' && year === '') {
    return '';
  }
  // Make sure it's an ISO-8601 date, which uses 2-digit month and day
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

const DateField = ({
  value,
  onChange,
  onComponentBlur,
  error,
  isTouched
}) => {
  const initialState = {
    dayInvalid: false,
    monthInvalid: false,
    yearInvalid: false,
    errorMessage: error === undefined ? '' : error,
    dateObject: dateParts(value)
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case 'setErrorMessage':
        return {
         ...state,
         errorMessage: action.value
        };
      case 'setAllInvalid':
        return {
          ...state,
          dayInvalid: true,
          monthInvalid: true,
          yearInvalid: true
        };
      case 'setAllValid':
        return {
          ...state,
          dayInvalid: false,
          monthInvalid: false,
          yearInvalid: false,
          errorMessage: ''
        };
      case 'setDatePartValid':
        return {
          ...state,
          [action.field]: action.value
        }
      case 'updateDateObject':
        return {
          ...state,
          dateObject: dateParts(action.value)
        }
    }
  }
        
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Ask Tif: why do I have to do this? I don't understand exactly why the reducer isn't updating the error
  useEffect(() => {
    console.log("isTouched", isTouched)
    if(error) {
      dispatch({type: 'setErrorMessage', value: error});
      dispatch({type: 'setAllInvalid'});
    }
    if(!error) {
      dispatch({type: 'setAllValid'});      
    }
  },[error]);
  
  useEffect(() => {
    dispatch({type: 'updateDateObject', value: value})
  },[value])
  
  const validateDateParts = dateObject => {
    const { day = '', month = '', year = '' } = dateObject || {};
    
    const datePartErrors = [];
    
    if (!isNumeric(year) || +year < 1900 || +year > 2100) {
      dispatch({type: 'setDatePartValid', field: 'yearInvalid', value: true});
      datePartErrors.push('Bad year');
    }
    
    if (!isNumeric(month) || +month < 1 || +month > 12) {
      dispatch({type: 'setDatePartValid', field: 'monthInvalid', value: true});
      datePartErrors.push('Bad month');
    }
    
    var lastDayOfMonth = new Date(year, parseInt(month) - 1, 0);
    if (!isNumeric(day) || +day < 1 || +day > lastDayOfMonth.getDate() + 1) {
      dispatch({type: 'setDatePartValid', field: 'yearInvalid', value: true});
      datePartErrors.push('Bad day');
    }
    console.log("datePartErrors", datePartErrors.join(', '));
    
    dispatch({type: 'setErrorMessage', value: datePartErrors.join(', ')});
  };
  
  return (
    <DSDateField
      dayValue={state.dateObject.day}
      monthValue={state.dateObject.month}
      yearValue={state.dateObject.year}
      onChange={(e, dateObject) => {
        // Check if this formatDate is used in current main branch. might be better to do the formatting when it comes down vs. passing it up
        onChange(e, formatDate(dateObject)); // Pass value to parent component
      }}
      onComponentBlur={() => {
        onComponentBlur()
        validateDateParts(state.dateObject)
      }} // Trigger parent component for component-level (ie. the whole date, not individual fields)
      errorMessage={state.errorMessage}
      dayInvalid={state.dayInvalid}
      monthInvalid={state.monthInvalid}
      yearInvalid={state.yearInvalid}
      errorPlacement="bottom"
    />
  );
};

DateField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onComponentBlur: PropTypes.func,
  errorMessage: PropTypes.string
};

DateField.defaultProps = {
  onComponentBlur: () => {},
  value: null,
  errorMessage: ''
};

export default DateField;