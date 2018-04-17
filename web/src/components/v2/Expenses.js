import PropTypes from 'prop-types';
import React from 'react';

const Expenses = ({ activity }) => (
  <div className="overflow-auto">
    <table
      className="mb2 h5 table table-condensed table-fixed"
      style={{ minWidth: 700 }}
    >
      <thead>
        <tr>
          <th className="col-1">#</th>
          <th className="col-3">Category</th>
          <th className="col-4">Description</th>
          {activity.years.map(year => (
            <th key={year} className="col-2">
              {year} Cost
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={i}>
            <td className="mono">{i + 1}.</td>
            <td>
              <select className="m0 select">
                <option>Expense A</option>
                <option>Expense B</option>
                <option>Expense C</option>
                <option>Other</option>
              </select>
            </td>
            <td>
              <textarea className="mb2 textarea" rows="5" />
            </td>
            {activity.years.map(year => (
              <td key={year}>
                <input type="number" className="m0 input" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Expenses.propTypes = {
  activity: PropTypes.object.isRequired
};

export default Expenses;
