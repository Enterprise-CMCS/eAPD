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
  return { day: +day || '', month: +month || '', year: +year || '' };
};

const formatDate = ({ day = '', month = '', year = '' } = {}) => {
  if (day === '' && month === '' && year === '') {
    return '';
  }
  // Make sure it's an ISO-8601 date, which uses 2-digit month and day
  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

const DateField = ({ value, onChange, onComponentBlur, errorMessage }) => {
  const initialState = {
    invalidObject: {
      dayInvalid: false,
      monthInvalid: false,
      yearInvalid: false
    },
    dateObject: dateParts(value)
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'setAllInvalid':
        return {
          ...state,
          invalidObject: {
            dayInvalid: true,
            monthInvalid: true,
            yearInvalid: true
          }
        };
      case 'setAllValid':
        return {
          ...state,
          invalidObject: {
            dayInvalid: false,
            monthInvalid: false,
            yearInvalid: false
          }
        };
      case 'updateDatePart':
        return {
          ...state,
          dateObject: {
            ...state.dateObject,
            [action.field]: action.value
          }
        };
      case 'yearValidate': {
        const { value: year } = action;
        return {
          ...state,
          invalidObject: {
            ...state.invalidObject,
            yearInvalid: !isNumeric(year) || +year < 1900 || +year > 2100
          }
        };
      }
      case 'monthValidate': {
        const { value: month } = action;
        return {
          ...state,
          invalidObject: {
            ...state.invalidObject,
            monthInvalid: !isNumeric(month) || +month < 1 || +month > 12
          }
        };
      }
      case 'dayValidate': {
        const { value: day } = action;
        const { month, year } = state.dateObject;
        const lastDayOfMonth = new Date(year, parseInt(month) - 1, 0);
        return {
          ...state,
          invalidObject: {
            ...state.invalidObject,
            dayInvalid:
              !isNumeric(day) || +day < 1 || +day > lastDayOfMonth.getDate() + 1
          }
        };
      }
      // Add cases for setYear, setMonth, setDay
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // Ask Tif: why do I have to do this? I don't understand exactly why the reducer isn't updating the error
  useEffect(() => {
    if (errorMessage) {
      dispatch({ type: 'setAllInvalid' });
    }
    if (!errorMessage) {
      dispatch({ type: 'setAllValid' });
    }
  }, [errorMessage]);

  const localErrorMessage = useMemo(() => {
    const { invalidObject } = state;
    const partErrors = Object.keys(invalidObject)
      .filter(key => invalidObject[key] === true)
      .map(key => key.replace('Invalid', ''));
    if (partErrors.length > 0 && partErrors.length < 3) {
      return `Please enter a valid ${partErrors.join(' and ')}`;
    }
    if (partErrors.length === 3 && !errorMessage) {
      return '';
    }
    return errorMessage;
  }, [errorMessage, state.invalidObject]);

  return (
    <DSDateField
      dayValue={state.dateObject.day}
      monthValue={state.dateObject.month}
      yearValue={state.dateObject.year}
      onChange={(e, dateObject) => {
        const { name } = e.target;
        dispatch({
          type: 'updateDatePart',
          field: name,
          value: dateObject[name]
        });
        onChange(e, formatDate(dateObject)); // Pass value to parent component
      }}
      onBlur={(e, dateObject) => {
        const { name } = e.target;
        dispatch({ type: `${name}Validate`, value: dateObject[name] });
      }}
      onComponentBlur={onComponentBlur}
      errorMessage={localErrorMessage}
      dayInvalid={state.invalidObject.dayInvalid}
      monthInvalid={state.invalidObject.monthInvalid}
      yearInvalid={state.invalidObject.yearInvalid}
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
