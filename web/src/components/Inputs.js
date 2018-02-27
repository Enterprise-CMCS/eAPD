import PropTypes from 'prop-types';
import React from 'react';

const Input = props => <input className="input" {...props} />;
const Textarea = props => <textarea className="textarea" {...props} />;

// a HOC for Text / Textarea input that includes
// div wrapper and accompanying label
const makeInput = InputInner => {
  const InputHolder = ({
    input: { name, ...rest },
    meta: { touched, error },
    label,
    hideLabel,
    type
  }) => (
    <div className="mb2">
      <label htmlFor={name} className={hideLabel ? 'sr-only' : ''}>
        {label}
      </label>
      <InputInner id={name} type={type} {...rest} />
      {touched && error && <span>{error}</span>}
    </div>
  );

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
