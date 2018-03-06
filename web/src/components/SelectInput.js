import PropTypes from 'prop-types';
import React from 'react';

const SelectInput = ({
  input: { name, ...rest },
  meta: { touched, error },
  label,
  options
}) => (
  <div className="mb2">
    <label htmlFor={name}>{label}</label>
    <select id={name} className="select" {...rest}>
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
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
