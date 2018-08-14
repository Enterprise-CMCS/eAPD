import PropTypes from 'prop-types';
import React from 'react';

const Select = ({ name, options, label, hideLabel, wrapperClass, ...rest }) => (
  <div className={wrapperClass || 'mb2'}>
    <label
      htmlFor={name}
      className={hideLabel ? 'sr-only' : 'block mb-tiny truncate'}
    >
      {label}
    </label>
    <select id={name} className="m0 select" {...rest}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  wrapperClass: PropTypes.string
};

Select.defaultProps = {
  hideLabel: false,
  wrapperClass: ''
};

export default Select;
