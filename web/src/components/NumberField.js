import { TextField, unmaskValue } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useCallback, useState } from 'react';

const setBlankIfZero = ({ target }) => {
  const value = +target.value.replace(/[^0-9]/g);
  if (value === 0) {
    target.value = '';
  }
};

const setZeroIfBlank = ({ target }) => {
  if (target.value === '') {
    target.value = '0';
  }
};

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
  const textField = fieldRef || useRef(null);
  const [local, setLocal] = useState(`${value}`);

  useEffect(() => {
    textField.current.addEventListener('focus', setBlankIfZero);
    textField.current.addEventListener('blur', setZeroIfBlank);
    return () => {
      textField.current.removeEventListener('focus', setBlankIfZero);
      textField.current.removeEventListener('blur', setZeroIfBlank);
    };
  }, []);

  const setRef = ref => {
    textField.current = ref;
  };

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

  return (
    <TextField
      {...props}
      mask={mask}
      value={local}
      inputRef={setRef}
      onBlur={blurHandler}
      onChange={changeHandler}
    />
  );
};

NumberField.propTypes = {
  fieldRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  mask: PropTypes.string,
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
