import React from 'react';
import PropTypes from 'prop-types';
import Dollars from './Dollars';

const DollarCell = ({ headers, value }) => (
  <td className="budget-table--number" headers={headers}>
    <Dollars>{value}</Dollars>
  </td>
);

DollarCell.propTypes = {
  headers: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

DollarCell.defaultProps = { headers: '' };

export default DollarCell;
