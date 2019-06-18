import { DateField as DSDateField } from '@cmsgov/design-system-core';
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

  return (
    <DSDateField
      {...rest}
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
