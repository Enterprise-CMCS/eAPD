import { DateField as DSDateField } from '@cmsgov/design-system';
import formatISO from 'date-fns';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';

const dateParts = (value) => {
  console.log({value})
  if (!value) {
    return {
      day: '',
      month: '',
      year: ''
    };
  } else {
    const newDate = new Date(value);
    console.log(newDate.getDate())
    
    return {
      day: newDate.getUTCDate(),
      month: newDate.getUTCMonth() + 1,
      year: newDate.getUTCFullYear()
    }

  }
};

const DateField = ({ value, onChange, ...rest }) => {
  const [errorInfo, setErrorInfo] = useState({
    errorMessage: [],
    dayInvalid: false,
    monthInvalid: false,
    yearInvalid: false
  });

  const [dateObj, setDateObj] = useState(dateParts(value));

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

    if (!dayVal || dayVal > 31 || !monthVal || monthVal > 12 || yearVal.length !== 4) {
      message.push('Please provide a target completion date.')

      if (!dayVal || dayVal > 31) {
        dayInvalid = true;
      }

      if (!monthVal || monthVal > 12) {
        monthInvalid = true;
      }

      if (!yearVal) {
        yearInvalid = true;
      }
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
      dayDefaultValue={dateObj.day}
      monthDefaultValue={dateObj.month}
      yearDefaultValue={dateObj.year}
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
