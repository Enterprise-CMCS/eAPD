import { DateField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';

const splitDate = date =>
  useMemo(() => {
    const [year, month, day] = date.split('-');
    return { day: +day || '', month: +month || '', year: +year || '' };
  }, [date]);

const joinDate = ({ day, month, year }) => `${year}-${month}-${day}`;

const SingleDateField = ({ date, onDateChanged, ...rest }) => {
  const dateParts = splitDate(date);

  return (
    <Fragment>
      <DateField
        {...rest}
        dayValue={dateParts.day}
        monthValue={dateParts.month}
        yearValue={dateParts.year}
        dateFormatter={joinDate}
        onChange={onDateChanged}
      />
    </Fragment>
  );
};

SingleDateField.propTypes = {
  date: PropTypes.string.isRequired,
  onDateChanged: PropTypes.func.isRequired
};

export default SingleDateField;
