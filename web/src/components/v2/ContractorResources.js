import PropTypes from 'prop-types';
import React from 'react';

const ContractorResources = ({ activity }) => (
  <div>
    <div className="overflow-auto">
      <table
        className="mb2 h5 table table-condensed table-fixed"
        style={{ minWidth: 700 }}
      >
        <thead>
          <tr>
            <th className="col-1">#</th>
            <th className="col-4">Name</th>
            <th className="col-5">Description of Services</th>
            <th className="col-4">Term Period</th>
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
                <input type="text" className="m0 input" />
              </td>
              <td>
                <textarea className="mb2 textarea" rows="5" />
              </td>
              <td>
                <div className="mb1 flex items-baseline h6">
                  <span className="mr-tiny w-3 right-align">Start:</span>
                  <input type="date" className="m0 input" />
                </div>
                <div className="mb1 flex items-baseline h6">
                  <span className="mr-tiny w-3 right-align">End:</span>
                  <input type="date" className="m0 input" />
                </div>
              </td>
              {activity.years.map(year => (
                <td key={year}>
                  <input type="text" className="m0 input" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button type="button" className="btn btn-primary bg-black">
      Add entry
    </button>
  </div>
);

ContractorResources.propTypes = {
  activity: PropTypes.object.isRequired
};

export default ContractorResources;
