import { TextField, unmaskValue } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useCallback, useState } from 'react';

const selectTextIfZero = ({ target }) => {
  const value = +target.value.replace(/[^0-9]/g);
  if (value === 0) {
    target.select();
  }
};

const maskValue = value => {
  const num = +value;
  if (!Number.isNaN(num)) {
    return num.toLocaleString();
  }
  return value;
};

const NumberField = ({
  fieldRef,
  onBlur,
  onChange,
  value,
  mask,
  round,
  ...props
}) => {
  const textField = fieldRef || useRef(null);
  const [local, setLocal] = useState(maskValue(value));

  useEffect(() => {
    textField.current.addEventListener('focus', selectTextIfZero);
    return () => {
      textField.current.removeEventListener('focus', selectTextIfZero);
    };
  }, []);

  const setRef = ref => {
    textField.current = ref;
  };

  const stringToNumber = stringValue => {
    // use ParseFloat rather than "+" because it won't throw an error and
    // will return partial number if non-numeric characters are present
    let number = parseFloat(unmaskValue(stringValue, mask)) || 0;
    if (round) {
      number = Math.round(number);
    }
    return number;
  };

  const blurHandler = useCallback(
    e => {
      const number = stringToNumber(e.target.value);
      setLocal(maskValue(number));

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
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mask: PropTypes.string,
  round: PropTypes.bool
};
NumberField.defaultProps = {
  fieldRef: null,
  onBlur: null,
  onChange: null,
  value: '',
  mask: null,
  round: false
};

export default NumberField;
