import PropTypes from 'prop-types';
import React from 'react';

const Input = props => <input className="m0 input" {...props} />;
const Textarea = props => (
  <textarea className="m0 textarea" spellCheck="true" {...props} />
);

// a HOC for Text / Textarea input that includes
// div wrapper and accompanying label
const makeInput = InputInner => {
  const InputHolder = ({
    name,
    label,
    type,
    hideLabel,
    className,
    ...rest
  }) => (
    <div className={className || 'mb2'}>
      <label
        htmlFor={name}
        className={hideLabel ? 'sr-only' : 'block mb-tiny bold'}
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
    className: PropTypes.string
  };

  InputHolder.defaultProps = {
    type: 'text',
    hideLabel: false,
    className: ''
  };

  return InputHolder;
};

makeInput.propTypes = {
  Component: PropTypes.element
};

const InputHolder = makeInput(Input);
const TextareaHolder = makeInput(Textarea);

export { InputHolder as Input, TextareaHolder as Textarea };
