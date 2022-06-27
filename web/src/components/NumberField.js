import { TextField, unmaskValue, maskValue } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const maskStringValue = (value, mask) =>
  maskValue(value !== null ? value.toString() : '', mask);

const NumberField = ({
  onBlur,
  onChange,
  value,
  mask,
  min,
  round,
  ...props
}) => {
  const [local, setLocal] = useState(maskStringValue(value, mask));
  useEffect(() => {
    setLocal(maskStringValue(value, mask));
  }, [value, mask]);

  const stringToNumber = stringValue => {
    // use ParseFloat rather than "+" because it won't throw an error and
    // will return partial number if non-numeric characters are present
    if (stringValue === '' || stringValue === null) {
      return null;
    }

    const number = parseFloat(unmaskValue(stringValue, mask));

    return isNaN(number) ? null : number;
  };

  const stringToFormattedNumber = stringValue => {
    const number = stringToNumber(stringValue);
    if (number === null) {
      return null;
    }
    if (min !== null && number < min) {
      return min;
    }
    if (round) {
      return Math.round(number);
    }
    // if we're not rounding, limit the number to 4 decimal points
    return Number(number.toFixed(4));
  };

  const blurHandler = e => {
    const number = stringToFormattedNumber(e.target.value);
    setLocal(`${maskStringValue(number, mask)}`);

    if (onChange) {
      onChange({
        target: { value: number }
      });
    }

    if (onBlur) {
      onBlur({
        target: { value: number }
      });
    }
  };

  const changeHandler = e => {
    const { value: valueStr } = e.target;
    if (/^-$|-?(\d|,)*\.(0|00|000)?$/.test(valueStr)) {
      // this number appears to be in process of being entered
      // skip calling onChange
      setLocal(valueStr);
    } else {
      const number = stringToNumber(valueStr);
      setLocal(number !== null ? number.toString() : '');
      if (onChange) {
        onChange({
          target: { value: number }
        });
      }
    }
  };

  return (
    <TextField
      {...props}
      mask={mask}
      value={local}
      onBlur={blurHandler}
      onChange={changeHandler}
    />
  );
};

NumberField.propTypes = {
  mask: PropTypes.oneOf(['currency', 'phone', 'ssn', 'zip']),
  min: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  round: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

NumberField.defaultProps = {
  mask: null,
  min: null,
  onBlur: null,
  onChange: null,
  round: false,
  value: ''
};

export default NumberField;
