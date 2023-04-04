import { DateField as DSDateField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { format, isExists, parse } from 'date-fns';
import { isNumeric } from '../util/formats';

const dateParts = value => {
  if (!value) {
    return {
      day: '',
      month: '',
      year: ''
    };
  }
  const [year, month, day] = value.trim().slice(0, 10).split('-');
  return { day: +day || '', month: +month || '', year: +year || '' };
};

const formatDate = ({ day = '', month = '', year = '' } = {}) => {
  const dateString = year + '-' + month + '-' + day;
  const dateFormat = 'yyyy-mm-dd';

  if (isExists(+year, +month - 1, +day)) {
    return format(parse(dateString, dateFormat, new Date()), dateFormat);
  }

  return '';
};

const DateField = ({
  value,
  onChange,
  onComponentBlur,
  errorMessage,
  ...rest
}) => {
  const [invalidObject, setInvalidObject] = useState({
    dayInvalid: false,
    monthInvalid: false,
    yearInvalid: false
  });

  const [dateObject, setDateObject] = useState(dateParts(value));

  useEffect(() => {
    if (errorMessage) {
      const { day = '', month = '', year = '' } = dateObject;
      const lastDayOfMonth = new Date(parseInt(year), parseInt(month) - 1, 0);
      setInvalidObject({
        dayInvalid:
          !isNumeric(day) || +day < 1 || +day > lastDayOfMonth.getDate() + 1,
        monthInvalid: !isNumeric(month) || +month < 1 || +month > 12,
        yearInvalid: !isNumeric(year) || +year < 1900 || +year > 2100
      });
    }
    if (!errorMessage) {
      setInvalidObject({
        dayInvalid: false,
        monthInvalid: false,
        yearInvalid: false
      });
    }
  }, [errorMessage, dateObject]);

  return (
    <DSDateField
      {...rest}
      dayValue={dateObject.day}
      monthValue={dateObject.month}
      yearValue={dateObject.year}
      onChange={(e, dateObject) => {
        setDateObject(dateObject);
        onChange(e, formatDate(dateObject)); // Pass value to parent component
      }}
      onComponentBlur={onComponentBlur}
      errorMessage={errorMessage}
      dayInvalid={invalidObject.dayInvalid}
      monthInvalid={invalidObject.monthInvalid}
      yearInvalid={invalidObject.yearInvalid}
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
