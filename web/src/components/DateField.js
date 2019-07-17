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
const joinDate = ({ day, month, year }) => `${year}-${month}-${day}`;

const DateField = ({ value, onChange, ...rest }) => {
  const dateParts = splitDate(value);

  const errorInfo = useMemo(() => {
    const date = moment(value, 'YYYY-M-D', true);
    if (date.isValid()) {
      return null;
    }

    const message = [];
    let invalidDay = false;
    let invalidMonth = false;
    let invalidYear = false;

    if (!dateParts.month) {
      message.push('Month is required.');
      invalidMonth = true;
    }
    if (dateParts.month > 12) {
      message.push('Month must be between 1 and 12.');
      invalidMonth = true;
    }

    if (!dateParts.day) {
      message.push('Day is required.');
      invalidDay = true;
    }

    if (`${dateParts.year}`.length !== 4) {
      message.push('Year must be 4 digits.');
      invalidYear = true;
    }

    if (message.length === 0) {
      message.push(
        'Invalid date - is the day number too high for the provided month and year?'
      );
    }

    return {
      errorMessage: message.join(' '),
      invalidDay,
      invalidMonth,
      invalidYear
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
