import { DateField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';

const splitDate = date =>
  useMemo(() => {
    const [year, month, day] = date.split('-');
    return { day: +day || '', month: +month || '', year: +year || '' };
  }, [date]);

const joinDate = ({ day, month, year }) => `${year}-${month}-${day}`;

const StartAndEndDate = ({
  endDate,
  onEndDateChanged,
  startDate,
  onStartDateChanged
}) => {
  const end = splitDate(endDate);
  const start = splitDate(startDate);

  return (
    <Fragment>
      <DateField
        label="Start"
        dayValue={start.day}
        monthValue={start.month}
        yearValue={start.year}
        dateFormatter={joinDate}
        onChange={onStartDateChanged}
      />
      <DateField
        label="End"
        hint=""
        dayValue={end.day}
        monthValue={end.month}
        yearValue={end.year}
        dateFormatter={joinDate}
        onChange={onEndDateChanged}
      />
    </Fragment>
  );
};

StartAndEndDate.propTypes = {
  endDate: PropTypes.string.isRequired,
  onEndDateChanged: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  onStartDateChanged: PropTypes.func.isRequired
};

export default StartAndEndDate;
