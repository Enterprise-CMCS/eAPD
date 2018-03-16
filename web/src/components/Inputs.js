import PropTypes from 'prop-types';
import React from 'react';

const Input = props => <input className="m0 input" {...props} />;
const Textarea = props => <textarea className="m0 textarea" {...props} />;

// a HOC for Text / Textarea input that includes
// div wrapper and accompanying label
const makeInput = InputInner => {
  const InputHolder = ({
    input: { name, ...rest },
    meta: { touched, error },
    label,
    hideLabel,
    type
  }) => {
    const hasError = touched && error;

    return (
      <div className={`mb2 ${hasError ? 'has-error' : ''}`}>
        <label htmlFor={name} className={hideLabel ? 'sr-only' : ''}>
          {label}
        </label>
        <InputInner id={name} type={type} {...rest} />
        {hasError && <div className="mt-tiny h6 red">{error}</div>}
      </div>
    );
  };

  InputHolder.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    hideLabel: PropTypes.bool,
    type: PropTypes.string
  };

  InputHolder.defaultProps = {
    type: 'text',
    hideLabel: false
  };

  return InputHolder;
};

makeInput.propTypes = {
  Component: PropTypes.element
};

const InputHolder = makeInput(Input);
const TextareaHolder = makeInput(Textarea);

export { InputHolder as Input, TextareaHolder as Textarea };
