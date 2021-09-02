import { TextField, unmaskValue, maskValue } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useCallback, useState, useEffect } from 'react';

const NumberField = ({
  fieldRef,
  onBlur,
  onChange,
  value,
  mask,
  min,
  round,
  ...props
}) => {
  const [local, setLocal] = useState(value.toString());
  useEffect(() => setLocal(maskValue(value.toString(), mask)), [value]);

  const stringToNumber = stringValue => {
    // use ParseFloat rather than "+" because it won't throw an error and
    // will return partial number if non-numeric characters are present
    const number = parseFloat(unmaskValue(stringValue, mask)) || 0;
    if (min !== null && number < min) {
      return min;
    }
    if (round) {
      return Math.round(number);
    }
    // if we're not rounding, limit the number to 4 decimal points
    return Number(number.toFixed(4));
  };

  const blurHandler = useCallback(
    e => {
      const number = stringToNumber(e.target.value);
      setLocal(`${number}`);

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
    },
    [onBlur, onChange]
  );

  const changeHandler = useCallback(
    e => {
      setLocal(e.target.value);
      if (onChange) {
        const number = stringToNumber(e.target.value);
        onChange({
          target: { value: number }
        });
      }
    },
    [onChange]
  );

  const focusHandler = e => {
    if (e.target.value === '0') {
      setLocal('');
    }
  };

  return (
    <TextField
      {...props}
      mask={mask}
      value={local}
      onBlur={blurHandler}
      onChange={changeHandler}
      onFocus={focusHandler}
    />
  );
};

NumberField.propTypes = {
  fieldRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  mask: PropTypes.oneOf(['currency', 'phone', 'ssn', 'zip']),
  min: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  round: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

NumberField.defaultProps = {
  fieldRef: null,
  mask: null,
  min: null,
  onBlur: null,
  onChange: null,
  round: false,
  value: ''
};

export default NumberField;
