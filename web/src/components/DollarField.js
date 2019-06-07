import { TextField, unmaskValue } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

const DollarField = ({ onChange, value, ...rest }) => {
  const [local, setLocal] = useState(value);

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
    <TextField
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
