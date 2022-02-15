import { DateField as DSDateField } from '@cmsgov/design-system';
import moment from 'moment';
import formatISO from 'date-fns/formatISO';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const DateField = ({ value, onChange, ...rest }) => {
  const [errorInfo, setErrorInfo] = useState({
    errorMessage: [],
    dayInvalid: false,
    monthInvalid: false,
    yearInvalid: false
  });

  const dateParts = () => {
    if (!value) {
      return {
        day: '',
        month: '',
        year: ''
      };
    }
    const [year, month, day] = value.slice(0, 10).split('-');
    return { day: day || '', month: month || '', year: +year || '' };
  }

  const dateStr = (dateObject) => {
    const year = dateObject.year;
    const month = dateObject.month - 1;
    const day = dateObject.day;

    const date = formatISO(new Date(year, month, day), { representation: 'date' })
    return date;
  }

  const getErrorMsg = (dateObject) => {
    const dayVal = dateObject.day;
    const monthVal = dateObject.month;
    const yearVal = dateObject.year;

    const message = [];
    let dayInvalid = false;
    let monthInvalid = false;
    let yearInvalid = false;

    if (!dayVal || !monthVal || yearVal.length !== 4) {
      message.push('Please provide a target completion date.')

      if (!dayVal) {
        dayInvalid = true;
      }

      if (!monthVal) {
        monthInvalid = true;
      }

      if (!yearVal) {
        yearInvalid = true;
      }
    }

    if (monthVal > 12) {
      message.push('Month must be between 1 and 12.');
      monthInvalid = true;
    }

    if (dayVal > 31) {
      message.push('Day must be less than 31.');
      dayInvalid = true;
    }

    setErrorInfo({
      errorMessage: message.join(' '),
      dayInvalid,
      monthInvalid,
      yearInvalid
    });
  };

  return (
    <DSDateField
      {...rest}
      {...errorInfo}
      dayValue={dateParts.day}
      monthValue={dateParts.month}
      yearValue={dateParts.year}
      onChange={(_, dateObject) => {
        onChange(_, dateStr(dateObject))
      }}
      onComponentBlur={(_, dateObject) => {
        getErrorMsg(dateObject)
      }}
      errorPlacement='bottom'
    />
  );
};

DateField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DateField;
