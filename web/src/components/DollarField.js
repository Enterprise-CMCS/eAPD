import { unmaskValue } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import NumberField from './NumberField';

const maskValue = value => {
  const num = +value;
  if (!Number.isNaN(num)) {
    return num.toLocaleString();
  }
  return value;
};

const DollarField = ({ onBlur, onChange, value, ...rest }) => {
  const [local, setLocal] = useState(maskValue(value, 'currency'));

  const blurHandler = useCallback(
    e => {
      const fieldValue = +unmaskValue(e.target.value, 'currency');
      const rounded = Math.round(fieldValue);

      if (fieldValue !== rounded) {
        setLocal(maskValue(rounded));

        if (onChange) {
          onChange({
            target: {
              value: rounded
            }
          });
        }
      }

      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur, onChange]
  );

  const changeHandler = useCallback(
    e => {
      setLocal(e.target.value);
      if (onChange) {
        onChange({
          target: { value: +unmaskValue(e.target.value, 'currency') }
        });
      }
    },
    [onChange]
  );

  return (
    <NumberField
      {...rest}
      mask="currency"
      value={local}
      onBlur={blurHandler}
      onChange={changeHandler}
    />
  );
};

DollarField.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

DollarField.defaultProps = {
  onBlur: null,
  onChange: null,
  value: ''
};

export default DollarField;
