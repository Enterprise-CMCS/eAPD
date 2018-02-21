import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

const formats = {
  cents: '$0,0.00',
  noCents: '$0,0'
};

const Dollars = ({ value, hideCents, className }) => (
  <span className={`dollar ${className}`}>
    {numeral(value).format(hideCents ? formats.noCents : formats.cents)}
  </span>
);

Dollars.propTypes = {
  value: PropTypes.number.isRequired,
  hideCents: PropTypes.bool,
  className: PropTypes.string
};

Dollars.defaultProps = {
  hideCents: false,
  className: ''
};

export default Dollars;
