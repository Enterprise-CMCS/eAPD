import { DateField as DSDateField } from '@cmsgov/design-system';
import { formatISO } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import { isNumeric } from '../util/formats';

const DateField = ({
  value,
  onChange,
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

  useEffect(() => {
    setErrorInfo({
      ...errorInfo,
      errorMessage
    });
  }, [errorMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  const dateParts = useMemo(() => {
    if (!value) {
      return {
        day: '',
        month: '',
        year: ''
      };
    }
    const [year, month, day] = value.trim().slice(0, 10).split('-');
    return { day: +day || '', month: +month || '', year: +year || '' };
  }, [value]);

  const dateStr = dateObject => {
    const year = dateObject.year;
    const month = dateObject.month - 1;
    const day = dateObject.day;

    const date = formatISO(new Date(year, month, day), {
      representation: 'date'
    });
    return date;
  };

  const getErrorMsg = (dateObject, cb) => {
    const { day = '', month = '', year = '' } = dateObject || {};

    if (day === '' && month === '' && year === '') {
      setErrorInfo({
        ...errorInfo,
        dayInvalid: true,
        monthInvalid: true,
        yearInvalid: true
      });
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
        errors.errorMessage = errors.errorMessage || 'Must have a valid year';
      }

      if (!isNumeric(month) || month < 1 || month > 12) {
        errors.monthInvalid = true;
        errors.errorMessage = errors.errorMessage || 'Must have a valid month';
      }

      var lastDayOfMonth = new Date(year, parseInt(month) - 1, 0);
      if (!isNumeric(day) || day < 1 || day > lastDayOfMonth.getDate() + 1) {
        errors.dayInvalid = true;
        errors.errorMessage = errors.errorMessage || 'Must have a valid day';
      }

      setErrorInfo(...errorInfo, ...errors);
    }
  };

  return (
    <DSDateField
      {...rest}
      {...errorInfo}
      dayDefaultValue={dateParts.day}
      monthDefaultValue={dateParts.month}
      yearDefaultValue={dateParts.year}
      onComponentBlur={(_, dateObject) => {
        onComponentBlur();
        getErrorMsg(dateObject);
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
  onComponentBlur: PropTypes.func,
  errorMessage: PropTypes.string
};

DateField.defaultProps = {
  onComponentBlur: () => {},
  value: null,
  errorMessage: ''
};

export default DateField;
