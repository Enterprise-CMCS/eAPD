import { DateField as DSDateField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';

const splitDate = date =>
  useMemo(() => {
    const [year, month, day] = date.split('-');
    return { day: +day || '', month: +month || '', year: +year || '' };
  }, [date]);

const joinDate = ({ day, month, year }) => `${year}-${month}-${day}`;

const DateField = ({ value, onChange, ...rest }) => {
  const dateParts = splitDate(value);

  return (
    <Fragment>
      <DSDateField
        {...rest}
        dayValue={dateParts.day}
        monthValue={dateParts.month}
        yearValue={dateParts.year}
        dateFormatter={joinDate}
        onChange={onChange}
      />
    </Fragment>
  );
};

DateField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DateField;
