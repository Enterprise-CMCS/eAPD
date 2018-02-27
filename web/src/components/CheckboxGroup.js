import PropTypes from 'prop-types';
import React from 'react';

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
      <label key={`checkbox-${value}`} className="block">
        <input
          type="checkbox"
          name={`${name}[${idx}]`}
          value={value}
          checked={inputVal.includes(value)}
          onChange={handleChange}
        />
        <span>{label}</span>
      </label>
    );
  });

  return (
    <div className="mb3">
      {checkboxes}
      {touched && error && <div>{error}</div>}
    </div>
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
