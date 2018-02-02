import PropTypes from 'prop-types';
import React from 'react';
import { Box, Checkbox, Label } from 'rebass';

const CheckboxGroup = ({ input, meta, options }) => {
  const { name, onChange, value: inputVal } = input;
  const { touched, error } = meta;

  const checkboxes = options.map(({ label, value }, idx) => {
    const handleChange = e => {
      const { checked } = e.target;
      const vals = [...inputVal];

      if (checked) vals.push(value);
      else vals.splice(vals.indexOf(value), 1);

      return onChange(vals);
    };

    return (
      <Label key={`checkbox-${value}`}>
        <Checkbox
          name={`${name}[${idx}]`}
          value={value}
          checked={inputVal.includes(value)}
          onChange={handleChange}
        />
        <span>{label}</span>
      </Label>
    );
  });

  return (
    <Box mb={3}>
      {checkboxes}
      {touched && error && <div>{error}</div>}
    </Box>
  );
};

CheckboxGroup.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CheckboxGroup;
