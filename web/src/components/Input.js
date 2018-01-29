import PropTypes from 'prop-types';
import React from 'react';
import { Box, Input, Label } from 'rebass';

const InputHolder = ({ input, label, type, meta: { touched, error } }) => (
  <Box mb={3}>
    <Label>{label}</Label>
    <Input {...input} type={type} />
    {touched && error && <span>{error}</span>}
  </Box>
);

// eslint-disable-next-line react/forbid-prop-types
InputHolder.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  meta: PropTypes.object.isRequired
};

InputHolder.defaultProps = {
  type: 'text'
};

export default InputHolder;
