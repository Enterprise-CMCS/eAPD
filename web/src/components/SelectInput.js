import PropTypes from 'prop-types';
import React from 'react';
import { Box, Label, Select } from 'rebass';

const SelectInput = ({
  input: { name, ...rest },
  meta: { touched, error },
  label,
  options
}) => (
  <Box mb={3}>
    <Label htmlFor={name}>{label}</Label>
    <Select id={name} {...rest}>
      {options.map(o => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </Select>
    {touched && error && <span>{error}</span>}
  </Box>
);

SelectInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default SelectInput;
