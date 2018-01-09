/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React from 'react';

import { OverflowAuto, TableBordered } from '../styles';

const Table = ({ data, heading, ...props }) => (
  <OverflowAuto {...props}>
    <TableBordered>
      <thead>
        <tr>{heading.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>{row.map((datum, j) => <td key={j}>{datum}</td>)}</tr>
        ))}
      </tbody>
    </TableBordered>
  </OverflowAuto>
);

Table.defaultProps = {
  data: [],
  heading: []
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  heading: PropTypes.arrayOf(PropTypes.any)
};

export default Table;
