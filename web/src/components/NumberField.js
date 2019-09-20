import { TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

const selectTextIfZero = ({ target }) => {
  const value = +target.value.replace(/[^0-9]/g);
  if (value === 0) {
    target.select();
  }
};

const NumberField = ({ fieldRef, ...props }) => {
  const textField = fieldRef || useRef(null);

  useEffect(() => {
    textField.current.addEventListener('focus', selectTextIfZero);
    return () => {
      textField.current.removeEventListener('focus', selectTextIfZero);
    };
  }, []);

  return <TextField {...props} fieldRef={textField} />;
};

NumberField.propTypes = {
  fieldRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};
NumberField.defaultProps = { fieldRef: null };

export default NumberField;
