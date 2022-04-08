import { DateField as DSDateField } from '@cmsgov/design-system';
import { formatISO } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { isNumeric } from '../util/formats';

const dateParts = value => {
  if (!value || value === '') {
    return {
      day: '',
      month: '',
      year: ''
    };
  } else {
    const newDate = new Date(value);
    return {
      day: newDate.getUTCDate(),
      month: newDate.getUTCMonth() + 1,
      year: newDate.getUTCFullYear()
    };
  }
};

const DateField = ({
  value,
  onChange,
  onBlur,
  onComponentBlur,
  errorMessage,
  ...rest
}) => {
  const [errorInfo, setErrorInfo] = useState({
    errorMessage,
    dayInvalid: false,
    monthInvalid: false,
    yearInvalid: false
  });

  const [dateObj] = useState(dateParts(value));

  const dateStr = dateObject => {
    const year = dateObject.year;
    const month = dateObject.month - 1;
    const day = dateObject.day;

    const date = formatISO(new Date(year, month, day), {
      representation: 'date'
    });
    return date;
  };

  const getErrorMsg = dateObject => {
    const { day = '', month = '', year = '' } = dateObject || {};

    if (day === '' && month === '' && year === '') {
      setErrorInfo({
        dayInvalid: true,
        monthInvalid: true,
        yearInvalid: true,
        errorMessage: errorMessage || 'Date is required'
      });
      return;
    } else {
      const errors = {
        dayInvalid: false,
        monthInvalid: false,
        yearInvalid: false,
        errorMessage: ''
      };

      // Validation for parsing & the date
      if (!isNumeric(year) || year < 1900 || year > 2100) {
        errors.yearInvalid = true;
        errors.errorMessage = errorMessage || 'Must have a valid year';
      }

      if (!isNumeric(month) || month < 1 || month > 12) {
        errors.monthInvalid = true;
        errors.errorMessage = errorMessage || 'Must have a valid month';
      }

      var lastDayOfMonth = new Date(year, parseInt(month) - 1, 0);
      if (!isNumeric(day) || day < 1 || day > lastDayOfMonth.getDate() + 1) {
        errors.dayInvalid = true;
        errors.errorMessage = errorMessage || 'Must have a valid day';
      }

      setErrorInfo(errors);
    }
  };

  return (
    <DSDateField
      {...rest}
      {...errorInfo}
      dayDefaultValue={dateObj.day}
      monthDefaultValue={dateObj.month}
      yearDefaultValue={dateObj.year}
      onBlur={(_, dateObject) => {
        getErrorMsg(dateObject);
        if (onBlur) onBlur();
      }}
      onComponentBlur={(_, dateObject) => {
        getErrorMsg(dateObject);
        if (onComponentBlur) onComponentBlur();
      }}
      onChange={(_, dateObject) => {
        onChange(_, dateStr(dateObject));
      }}
      errorPlacement="bottom"
    />
  );
};

DateField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onComponentBlur: PropTypes.func,
  errorMessage: PropTypes.string
};

DateField.defaultProps = {
  onBlur: () => {},
  onComponentBlur: () => {},
  value: null,
  errorMessage: ''
};

export default DateField;
