import PropTypes from 'prop-types';
import React from 'react';
import { Box, Input, Label, Textarea } from 'rebass';

// a HOC for Text / Textarea input that includes
// rebass components and accompanying label
const makeInput = InputInner => {
  const InputHolder = ({
    input: { name, ...rest },
    meta: { touched, error },
    label,
    hideLabel,
    type
  }) => (
    <Box mb={3}>
      <Label htmlFor={name} className={hideLabel ? 'sr-only' : ''}>{label}</Label>
      <InputInner id={name} type={type} {...rest} />
      {touched && error && <span>{error}</span>}
    </Box>
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
