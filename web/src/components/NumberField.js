import { TextField } from '@cmsgov/design-system-core';
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

export default NumberField;
