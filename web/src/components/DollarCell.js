import React from 'react';
import PropTypes from 'prop-types';
import Dollars from './Dollars';

const DollarCell = ({ headers, value, className }) => (
  <td className={`budget-table--number ${className}`} headers={headers}>
    <Dollars>{value}</Dollars>
  </td>
);

DollarCell.propTypes = {
  headers: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string
};

DollarCell.defaultProps = { headers: '', className: '' };

export default DollarCell;
