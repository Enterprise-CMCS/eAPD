import { DateField as DSDateField } from '@cmsgov/design-system-core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

// Dates are stored internally as YYYY-MM-DD. The design system date field
// expects separate day, month, and year values. So split the incoming
// date up into its pieces.
const splitDate = date =>
  useMemo(() => {
    const [year, month, day] = date.split('-');
    return { day: +day || '', month: +month || '', year: +year || '' };
  }, [date]);

// The design system will call our formatter before calling our change event
// handlers. This formatter puts the date pieces back into our internal date
// string format.
const joinDate = ({ day, month, year }) => {
  // If the date is empty, revert to an empty string so it can save
  // successfully.
  if (!day && !month && !year) {
    return '';
  }

  return `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
};

const DateField = ({ value, onChange, ...rest }) => {
  const dateParts = splitDate(value);

  const errorInfo = useMemo(() => {
    const date = moment(value, 'YYYY-M-D', true);
    if (value === null || value === undefined || value.length === 0) {
      return null;
    }

    if (date.isValid()) {
      return null;
    }

    const message = [];
    let dayInvalid = false;
    let monthInvalid = false;
    let yearInvalid = false;

    if (!dateParts.month) {
      message.push('Month is required.');
      monthInvalid = true;
    }
    if (dateParts.month > 12) {
      message.push('Month must be between 1 and 12.');
      monthInvalid = true;
    }

    if (!dateParts.day) {
      message.push('Day is required.');
      dayInvalid = true;
    }
    if (dateParts.day > 31) {
      message.push('Day must be less than 31.');
      dayInvalid = true;
    }

    if (`${dateParts.year}`.length !== 4) {
      message.push('Year must be 4 digits.');
      yearInvalid = true;
    }

    if (message.length === 0) {
      message.push(
        'Invalid date - is the day number too high for the provided month and year?'
      );
    }

    return {
      errorMessage: message.join(' '),
      dayInvalid,
      monthInvalid,
      yearInvalid
    };
  }, [value]);

  return (
    <DSDateField
      {...rest}
      {...errorInfo}
      dayValue={dateParts.day}
      monthValue={dateParts.month}
      yearValue={dateParts.year}
      dateFormatter={joinDate}
      onChange={onChange}
    />
  );
};

DateField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DateField;
