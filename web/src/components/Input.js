import PropTypes from 'prop-types';
import React from 'react';
import { Box, Input, Label } from 'rebass';

const InputHolder = ({
  input: { name, ...rest },
  meta: { touched, error },
  label,
  type
}) => (
  <Box mb={3}>
    <Label htmlFor={name}>{label}</Label>
    <Input id={name} type={type} {...rest} />
    {touched && error && <span>{error}</span>}
  </Box>
);

InputHolder.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string
};

InputHolder.defaultProps = {
  type: 'text'
};

export default InputHolder;
