import { TextField, unmaskValue, maskValue } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useCallback, useState, useEffect } from 'react';

const NumberField = ({
  onBlur,
  onChange,
  value,
  mask,
  min,
  round,
  ...props
}) => {
  const [local, setLocal] = useState(value !== null ? value.toString() : '');
  useEffect(
    () => setLocal(maskValue(value !== null ? value.toString() : '', mask)),
    [value, mask]
  );

  const stringToNumber = stringValue => {
    // use ParseFloat rather than "+" because it won't throw an error and
    // will return partial number if non-numeric characters are present
    if (stringValue === '') {
      return null;
    }
    const number = parseFloat(unmaskValue(stringValue, mask));
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
      setLocal(`${number !== null ? number : ''}`);

      onChange({ target: { value: number } });

      onBlur({ target: { value: number } });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onBlur, onChange]
  );

  const changeHandler = useCallback(
    e => {
      const number = stringToNumber(e.target.value);
      setLocal(`${number !== null ? number : ''}`);

      onChange({ target: { value: number } });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChange]
  );

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
  onBlur: () => {},
  onChange: () => {},
  round: false,
  value: ''
};

export default NumberField;
