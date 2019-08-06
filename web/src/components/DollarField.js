import { unmaskValue } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import NumberField from './NumberField';

const maskValue = value => {
  const num = +value;
  if (!Number.isNaN(num)) {
    return num.toLocaleString();
  }
  return value;
};

const DollarField = ({ onChange, value, ...rest }) => {
  const [local, setLocal] = useState(maskValue(value, 'currency'));

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
      onChange={changeHandler}
    />
  );
};

DollarField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

DollarField.defaultProps = {
  onChange: null,
  value: ''
};

export default DollarField;
