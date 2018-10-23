import PropTypes from 'prop-types';
import React from 'react';

// a HOC for Text / Textarea input that includes
// div wrapper and accompanying label
const InputWrapper = InputInner => {
  const InputHolder = ({
    name,
    label,
    type,
    hideLabel,
    wrapperClass,
    ...rest
  }) => (
    <div className={wrapperClass || 'mb2'}>
      <label
        htmlFor={name}
        className={hideLabel ? 'sr-only' : 'block mb-tiny truncate'}
      >
        {label}
      </label>
      <InputInner id={name} type={type} {...rest} />
    </div>
  );

  InputHolder.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    hideLabel: PropTypes.bool,
    wrapperClass: PropTypes.string
  };

  InputHolder.defaultProps = {
    type: 'text',
    hideLabel: false,
    wrapperClass: ''
  };

  return InputHolder;
};

InputWrapper.propTypes = {
  Component: PropTypes.element
};

export default InputWrapper;
