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

  // A bug in the CMS design system says the fieldRef prop must be a function,
  // but React also accepts objects. Objects are the newer approach, so we'll
  // stick with that and just accept the prop types warning for now.
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
